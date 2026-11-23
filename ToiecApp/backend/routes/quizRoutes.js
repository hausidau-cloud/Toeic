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

// 1. LẤY BỘ CÂU HỎI QUIZ (Kết hợp Ngữ pháp + Từ vựng)
router.get("/questions", async (req, res) => {
  try {
    const count = Math.min(20, Math.max(5, parseInt(req.query.count) || 10));
    const mode = req.query.mode || "all"; // "all" | "vocab" | "grammar"

    let grammarTarget = mode === "grammar" ? count : mode === "vocab" ? 0 : Math.floor(count / 2);
    let vocabTarget = count - grammarTarget;

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
      // Lấy từ vựng chính và từ vựng gây nhiễu
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
          // Dạng 1: Điền từ vào câu ví dụ (Fill in the blank)
          const regex = new RegExp(item.word_or_phrase, "gi");
          const blankedSentence = item.example_sentence.replace(regex, "________");

          // Chọn 3 từ gây nhiễu
          const distractors = shuffleArray(
            distractorPool
              .filter((d) => d.id !== item.id && d.word_or_phrase !== item.word_or_phrase)
              .map((d) => d.word_or_phrase)
          ).slice(0, 3);

          while (distractors.length < 3) {
            distractors.push("alternative");
          }

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
          // Dạng 2: Hỏi nghĩa của từ / cụm từ
          const distractors = shuffleArray(
            distractorPool
              .filter((d) => d.id !== item.id && d.meaning !== item.meaning)
              .map((d) => d.meaning)
          ).slice(0, 3);

          while (distractors.length < 3) {
            distractors.push("ý nghĩa khác không phù hợp");
          }

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

    // Trộn ngẫu nhiên câu hỏi ngữ pháp và từ vựng với nhau
    const finalQuestions = shuffleArray(questions);

    res.json({
      status: "success",
      total: finalQuestions.length,
      data: finalQuestions,
    });
  } catch (error) {
    console.error("Quiz questions error:", error);
    res.status(500).json({
      status: "error",
      message: "Không thể tạo bộ câu hỏi Quiz.",
      error: error.message,
    });
  }
});

// 2. NỘP KẾT QUẢ & LƯU BẢNG XẾP HẠNG
router.post("/submit", async (req, res) => {
  try {
    const { userId, playerName, score, correctCount, totalQuestions, timeSpent, streakMax } = req.body;

    if (!playerName || typeof score !== "number") {
      return res.status(400).json({
        message: "Thiếu dữ liệu kết quả thi đấu",
      });
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

    // Tính thứ hạng hiện tại của người chơi
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
    res.status(500).json({
      status: "error",
      message: "Lỗi lưu bảng xếp hạng Quiz.",
      error: error.message,
    });
  }
});

// 3. LẤY BẢNG XẾP HẠNG (LEADERBOARD)
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

    // Thêm số thứ hạng (rank)
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
    res.status(500).json({
      status: "error",
      message: "Không thể tải bảng xếp hạng Quiz.",
      error: error.message,
    });
  }
});

module.exports = router;
