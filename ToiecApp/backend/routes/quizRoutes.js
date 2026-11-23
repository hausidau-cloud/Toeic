const express = require("express");
const pool = require("../config/mysql");

const router = express.Router();

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// HÀM SINH BỘ CÂU HỎI QUIZ DÙNG CHUNG (Ngữ pháp + Từ vựng)
async function generateQuestions(count = 10, mode = "all") {
  const totalCount = Math.min(20, Math.max(5, count));
  let grammarTarget = mode === "grammar" ? totalCount : mode === "vocab" ? 0 : Math.floor(totalCount / 2);
  let vocabTarget = totalCount - grammarTarget;

  const questions = [];

  // A. LẤY CÂU HỎI NGỮ PHÁP (PART 5)
  if (grammarTarget > 0) {
    const [gRows] = await pool.query(
      `SELECT g.id, g.question_text, g.option_a, g.option_b, g.option_c, g.option_d, g.correct_answer, g.explanation, t.title as topic_title
       FROM grammar_questions g
       LEFT JOIN grammar_topics t ON g.topic_id = t.id
       ORDER BY RAND()
       LIMIT ?`,
      [grammarTarget]
    );

    for (const item of gRows) {
      questions.push({
        id: `grammar_${item.id}`,
        categoryType: "grammar",
        badge: "📖 Ngữ Pháp",
        topic: item.topic_title || "Ngữ Pháp TOEIC Part 5",
        prompt: item.question_text,
        subPrompt: "Chọn đáp án đúng nhất để hoàn thành câu:",
        options: [
          { key: "A", text: item.option_a },
          { key: "B", text: item.option_b },
          { key: "C", text: item.option_c },
          { key: "D", text: item.option_d },
        ],
        correctKey: item.correct_answer.toUpperCase().trim(),
        explanation: item.explanation || "Xem lại chủ điểm ngữ pháp liên quan.",
      });
    }
  }

  // B. LẤY CÂU HỎI TỪ VỰNG (BARRON'S + CỤM TỪ ĂN ĐIỂM)
  if (vocabTarget > 0) {
    const [vRows] = await pool.query(
      `SELECT id, word_or_phrase, phonetic, word_type, meaning, example_sentence, example_meaning, category
       FROM vocabularies
       ORDER BY RAND()
       LIMIT ?`,
      [vocabTarget + 20]
    );

    const targetWords = vRows.slice(0, vocabTarget);
    const distractorPool = vRows.slice(vocabTarget);

    for (let i = 0; i < targetWords.length; i++) {
      const item = targetWords[i];
      const isCloze = Boolean(item.example_sentence && Math.random() > 0.5);

      if (isCloze && item.example_sentence.toLowerCase().includes(item.word_or_phrase.toLowerCase())) {
        const regex = new RegExp(item.word_or_phrase, "gi");
        const blankedSentence = item.example_sentence.replace(regex, "________");

        const distractors = shuffleArray(
          distractorPool
            .filter((d) => d.id !== item.id && d.word_or_phrase !== item.word_or_phrase)
            .map((d) => d.word_or_phrase)
        ).slice(0, 3);

        while (distractors.length < 3) distractors.push("alternative");

        const rawOptions = [item.word_or_phrase, ...distractors];
        const shuffledOptions = shuffleArray(rawOptions);
        const letters = ["A", "B", "C", "D"];
        const correctIndex = shuffledOptions.indexOf(item.word_or_phrase);
        const correctKey = letters[correctIndex];

        questions.push({
          id: `vocab_cloze_${item.id}`,
          categoryType: "vocab",
          badge: "✍️ Điền Từ",
          topic: item.category || "Từ vựng TOEIC Barron's",
          prompt: blankedSentence,
          subPrompt: `Dịch câu: "${item.example_meaning || ""}". Điền từ thích hợp vào chỗ trống:`,
          options: shuffledOptions.map((text, idx) => ({ key: letters[idx], text })),
          correctKey,
          explanation: `Từ cần điền là: "${item.word_or_phrase}" (${item.phonetic || ""}) mang nghĩa "${item.meaning}".`,
        });
      } else {
        const distractors = shuffleArray(
          distractorPool
            .filter((d) => d.id !== item.id && d.meaning !== item.meaning)
            .map((d) => d.meaning)
        ).slice(0, 3);

        while (distractors.length < 3) distractors.push("ý nghĩa khác không phù hợp");

        const rawOptions = [item.meaning, ...distractors];
        const shuffledOptions = shuffleArray(rawOptions);
        const letters = ["A", "B", "C", "D"];
        const correctIndex = shuffledOptions.indexOf(item.meaning);
        const correctKey = letters[correctIndex];

        questions.push({
          id: `vocab_meaning_${item.id}`,
          categoryType: "vocab",
          badge: "🧠 Đoán Nghĩa",
          topic: item.category || "600 Từ Vựng Barron's",
          prompt: `Từ/Cụm từ: "${item.word_or_phrase}" ${item.phonetic ? `(${item.phonetic})` : ""}`,
          subPrompt: "Ý nghĩa chính xác nhất của từ này là gì?",
          options: shuffledOptions.map((text, idx) => ({ key: letters[idx], text })),
          correctKey,
          explanation: `"${item.word_or_phrase}" (${item.word_type || "từ vựng"}): ${item.meaning}. ${item.example_sentence ? `Ví dụ: ${item.example_sentence}` : ""}`,
        });
      }
    }
  }

  return shuffleArray(questions);
}

// 1. LẤY BỘ CÂU HỎI QUIZ CHO ĐẤU ĐƠN
router.get("/questions", async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const mode = req.query.mode || "all";
    const data = await generateQuestions(count, mode);

    res.json({
      status: "success",
      total: data.length,
      data,
    });
  } catch (error) {
    console.error("Quiz questions error:", error);
    res.status(500).json({ status: "error", message: "Không thể tạo bộ câu hỏi Quiz.", error: error.message });
  }
});

// 2. LẤY KỶ LỤC ĐIỂM CAO NHẤT HIỆN TẠI (ALL-TIME RECORD)
router.get("/record", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT player_name, score, correct_count, total_questions, time_spent, streak_max, created_at
       FROM quiz_leaderboard
       ORDER BY score DESC, time_spent ASC
       LIMIT 1`
    );

    const record = rows[0] || {
      player_name: "Chưa có kỷ lục",
      score: 0,
      correct_count: 0,
      total_questions: 10,
      time_spent: 0,
      streak_max: 0,
    };

    res.json({ status: "success", data: record });
  } catch (error) {
    console.error("Quiz record error:", error);
    res.status(500).json({ status: "error", message: "Lỗi lấy kỷ lục.", error: error.message });
  }
});

// 3. NỘP KẾT QUẢ ĐẤU ĐƠN & LƯU BẢNG XẾP HẠNG
router.post("/submit", async (req, res) => {
  try {
    const { userId, playerName, score, correctCount, totalQuestions, timeSpent, streakMax } = req.body;

    if (!playerName || typeof score !== "number") {
      return res.status(400).json({ message: "Thiếu dữ liệu kết quả thi đấu" });
    }

    const safeUserId = parseInt(userId) || 0;
    const safeScore = Math.max(0, parseInt(score) || 0);
    const safeCorrect = parseInt(correctCount) || 0;
    const safeTotal = parseInt(totalQuestions) || 10;
    const safeTime = parseInt(timeSpent) || 0;
    const safeStreak = parseInt(streakMax) || 0;

    const [result] = await pool.query(
      `INSERT INTO quiz_leaderboard (user_id, player_name, score, correct_count, total_questions, time_spent, streak_max)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [safeUserId, playerName.slice(0, 100), safeScore, safeCorrect, safeTotal, safeTime, safeStreak]
    );

    const [rankRows] = await pool.query(
      `SELECT COUNT(*) + 1 as user_rank FROM quiz_leaderboard WHERE score > ?`,
      [safeScore]
    );

    res.status(201).json({
      status: "success",
      message: "Lưu thành tích Quiz thành công!",
      recordId: result.insertId,
      rank: rankRows[0]?.user_rank || 1,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    res.status(500).json({ status: "error", message: "Lỗi lưu bảng xếp hạng Quiz.", error: error.message });
  }
});

// 4. LẤY BẢNG XẾP HẠNG (LEADERBOARD)
router.get("/leaderboard", async (req, res) => {
  try {
    const limit = Math.min(50, Math.max(5, parseInt(req.query.limit) || 20));

    const [rows] = await pool.query(
      `SELECT id, user_id, player_name, score, correct_count, total_questions, time_spent, streak_max, created_at
       FROM quiz_leaderboard
       ORDER BY score DESC, time_spent ASC, created_at ASC
       LIMIT ?`,
      [limit]
    );

    const leaderboard = rows.map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

    res.json({
      status: "success",
      total: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    console.error("Quiz leaderboard error:", error);
    res.status(500).json({ status: "error", message: "Không thể tải bảng xếp hạng Quiz.", error: error.message });
  }
});

// ========================================================
// 5. CÁC API PHÒNG THÁCH ĐẤU NHIỀU NGƯỜI (MULTIPLAYER ROOM)
// ========================================================

// Tạo phòng mới (Host)
router.post("/room/create", async (req, res) => {
  try {
    const { hostUserId, hostName, mode = "all" } = req.body;
    if (!hostName) return res.status(400).json({ message: "Vui lòng nhập tên người tạo phòng" });

    let roomCode = "";
    let isUnique = false;
    while (!isUnique) {
      roomCode = String(Math.floor(100000 + Math.random() * 900000));
      const [ex] = await pool.query(`SELECT id FROM quiz_rooms WHERE room_code = ?`, [roomCode]);
      if (ex.length === 0) isUnique = true;
    }

    const questions = await generateQuestions(10, mode);

    const [roomResult] = await pool.query(
      `INSERT INTO quiz_rooms (room_code, host_user_id, host_name, status, mode, questions_json)
       VALUES (?, ?, ?, 'waiting', ?, ?)`,
      [roomCode, hostUserId || 0, hostName, mode, JSON.stringify(questions)]
    );

    const roomId = roomResult.insertId;

    await pool.query(
      `INSERT INTO quiz_room_players (room_id, user_id, player_name)
       VALUES (?, ?, ?)`,
      [roomId, hostUserId || 0, hostName]
    );

    res.status(201).json({
      status: "success",
      roomCode,
      roomId,
      hostName,
    });
  } catch (error) {
    console.error("Room create error:", error);
    res.status(500).json({ message: "Lỗi tạo phòng thách đấu", error: error.message });
  }
});

// Tham gia phòng bằng mã PIN
router.post("/room/join", async (req, res) => {
  try {
    const { roomCode, playerName, userId } = req.body;
    if (!roomCode || !playerName) {
      return res.status(400).json({ message: "Vui lòng nhập mã phòng và tên của bạn" });
    }

    const [rooms] = await pool.query(
      `SELECT id, room_code, status, host_name FROM quiz_rooms WHERE room_code = ?`,
      [String(roomCode).trim()]
    );

    if (rooms.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy phòng thách đấu với mã PIN này!" });
    }

    const room = rooms[0];
    if (room.status === "finished") {
      return res.status(400).json({ message: "Phòng thi đấu này đã kết thúc!" });
    }

    const [existing] = await pool.query(
      `SELECT id FROM quiz_room_players WHERE room_id = ? AND player_name = ?`,
      [room.id, playerName]
    );

    if (existing.length === 0) {
      await pool.query(
        `INSERT INTO quiz_room_players (room_id, user_id, player_name)
         VALUES (?, ?, ?)`,
        [room.id, userId || 0, playerName]
      );
    }

    res.json({
      status: "success",
      message: "Tham gia phòng thành công!",
      roomCode: room.room_code,
      roomId: room.id,
    });
  } catch (error) {
    console.error("Room join error:", error);
    res.status(500).json({ message: "Lỗi tham gia phòng", error: error.message });
  }
});

// Lấy thông tin phòng, danh sách người chơi và trạng thái
router.get("/room/:code", async (req, res) => {
  try {
    const roomCode = String(req.params.code).trim();
    const [rooms] = await pool.query(
      `SELECT id, room_code, host_user_id, host_name, status, mode, questions_json, created_at
       FROM quiz_rooms WHERE room_code = ?`,
      [roomCode]
    );

    if (rooms.length === 0) {
      return res.status(404).json({ message: "Phòng không tồn tại" });
    }

    const room = rooms[0];
    const [players] = await pool.query(
      `SELECT id, user_id, player_name, score, correct_count, time_spent, streak_max, is_finished
       FROM quiz_room_players WHERE room_id = ?
       ORDER BY score DESC, time_spent ASC`,
      [room.id]
    );

    let questions = [];
    if (room.status === "in_progress" || room.status === "finished") {
      try {
        questions = JSON.parse(room.questions_json || "[]");
      } catch {}
    }

    res.json({
      status: "success",
      room: {
        id: room.id,
        roomCode: room.room_code,
        hostUserId: room.host_user_id,
        hostName: room.host_name,
        status: room.status,
        mode: room.mode,
        playerCount: players.length,
        players,
        questions,
      },
    });
  } catch (error) {
    console.error("Get room error:", error);
    res.status(500).json({ message: "Lỗi tải thông tin phòng", error: error.message });
  }
});

// Bắt đầu phòng thi đấu (Yêu cầu TỐI THIỂU 2 ĐẾN 3 NGƯỜI CHƠI TRỞ LÊN)
router.post("/room/:code/start", async (req, res) => {
  try {
    const roomCode = String(req.params.code).trim();
    const [rooms] = await pool.query(
      `SELECT id, status FROM quiz_rooms WHERE room_code = ?`,
      [roomCode]
    );

    if (rooms.length === 0) return res.status(404).json({ message: "Phòng không tồn tại" });

    const room = rooms[0];
    const [players] = await pool.query(
      `SELECT id FROM quiz_room_players WHERE room_id = ?`,
      [room.id]
    );

    // KIỂM TRA ĐIỀU KIỆN: PHẢI CÓ TỪ 2 NGƯỜI TRỞ LÊN MỚI ĐƯỢC CHƠI THÁCH ĐẤU
    if (players.length < 2) {
      return res.status(400).json({
        message: "Phòng thách đấu cần tối thiểu từ 2 - 3 người chơi trở lên mới có thể bắt đầu! Hãy chia sẻ mã PIN cho bạn bè hoặc thêm người chơi thử nghiệm.",
      });
    }

    await pool.query(
      `UPDATE quiz_rooms SET status = 'in_progress' WHERE id = ?`,
      [room.id]
    );

    res.json({ status: "success", message: "Đã bắt đầu trận thách đấu!" });
  } catch (error) {
    console.error("Room start error:", error);
    res.status(500).json({ message: "Lỗi bắt đầu phòng", error: error.message });
  }
});

// Thêm bạn cùng chơi / Bot giả lập vào phòng để đủ 2 - 3 người chơi ngay
router.post("/room/:code/add-bot", async (req, res) => {
  try {
    const roomCode = String(req.params.code).trim();
    const [rooms] = await pool.query(`SELECT id FROM quiz_rooms WHERE room_code = ?`, [roomCode]);
    if (rooms.length === 0) return res.status(404).json({ message: "Phòng không tồn tại" });

    const roomId = rooms[0].id;
    const botNames = [
      "Minh Tuấn (Target 850)",
      "Thu Hà (Cử Nhân Anh)",
      "Khánh Linh (TOEIC 750)",
      "Đức Anh (Chuyên Gia Part 5)",
    ];

    const [curPlayers] = await pool.query(`SELECT player_name FROM quiz_room_players WHERE room_id = ?`, [roomId]);
    const existingNames = new Set(curPlayers.map((p) => p.player_name));
    const available = botNames.filter((name) => !existingNames.has(name));

    if (available.length === 0) {
      return res.status(400).json({ message: "Phòng đã có đủ người chơi thử nghiệm!" });
    }

    const randomName = available[0];
    await pool.query(
      `INSERT INTO quiz_room_players (room_id, user_id, player_name)
       VALUES (?, 0, ?)`,
      [roomId, randomName]
    );

    res.json({ status: "success", message: `Đã thêm bạn chơi "${randomName}" vào phòng!`, botName: randomName });
  } catch (error) {
    console.error("Add bot error:", error);
    res.status(500).json({ message: "Lỗi thêm người chơi", error: error.message });
  }
});

// Nộp kết quả thi đấu của một người chơi trong phòng
router.post("/room/:code/submit", async (req, res) => {
  try {
    const roomCode = String(req.params.code).trim();
    const { playerName, score, correctCount, timeSpent, streakMax, userId } = req.body;

    const [rooms] = await pool.query(`SELECT id FROM quiz_rooms WHERE room_code = ?`, [roomCode]);
    if (rooms.length === 0) return res.status(404).json({ message: "Phòng không tồn tại" });

    const roomId = rooms[0].id;

    // Cập nhật điểm của người chơi
    await pool.query(
      `UPDATE quiz_room_players 
       SET score = ?, correct_count = ?, time_spent = ?, streak_max = ?, is_finished = 1
       WHERE room_id = ? AND player_name = ?`,
      [score, correctCount, timeSpent, streakMax, roomId, playerName]
    );

    // Cũng lưu vào bảng xếp hạng chung nếu điểm cao
    if (score > 0) {
      await pool.query(
        `INSERT INTO quiz_leaderboard (user_id, player_name, score, correct_count, total_questions, time_spent, streak_max)
         VALUES (?, ?, ?, ?, 10, ?, ?)`,
        [userId || 0, playerName, score, correctCount, timeSpent, streakMax]
      );
    }

    // Tự động sinh điểm ngẫu nhiên cho các Bot (nếu có bot trong phòng chưa nộp)
    const [bots] = await pool.query(
      `SELECT id, player_name FROM quiz_room_players WHERE room_id = ? AND is_finished = 0 AND user_id = 0`,
      [roomId]
    );

    for (const b of bots) {
      const botCorrect = Math.floor(Math.random() * 4) + 6;
      const botTime = Math.floor(Math.random() * 25) + 35;
      const botScore = botCorrect * 800 + Math.floor(Math.random() * 1000);
      await pool.query(
        `UPDATE quiz_room_players SET score = ?, correct_count = ?, time_spent = ?, streak_max = ?, is_finished = 1 WHERE id = ?`,
        [botScore, botCorrect, botTime, Math.floor(botCorrect / 2), b.id]
      );
    }

    await pool.query(`UPDATE quiz_rooms SET status = 'finished' WHERE id = ?`, [roomId]);

    const [rankings] = await pool.query(
      `SELECT player_name, score, correct_count, time_spent, streak_max
       FROM quiz_room_players WHERE room_id = ?
       ORDER BY score DESC, time_spent ASC`,
      [roomId]
    );

    res.json({
      status: "success",
      message: "Đã nộp bài thách đấu thành công!",
      rankings,
    });
  } catch (error) {
    console.error("Room submit error:", error);
    res.status(500).json({ message: "Lỗi nộp bài thách đấu", error: error.message });
  }
});

module.exports = router;
