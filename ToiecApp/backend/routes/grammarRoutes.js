const express = require("express");
const pool = require("../config/mysql");
const fallbackGrammar = require("../data/grammarData");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 1. LẤY DANH SÁCH 10 CHỦ ĐIỂM NGỮ PHÁP TOEIC
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.id, t.title, t.slug, t.level, t.summary, 
              COUNT(q.id) AS question_count
       FROM grammar_topics t
       LEFT JOIN grammar_questions q ON t.id = q.topic_id
       GROUP BY t.id, t.title, t.slug, t.level, t.summary
       ORDER BY t.id ASC`
    );

    if (rows && rows.length > 0) {
      return res.json({
        message: "Lấy danh sách ngữ pháp từ MySQL thành công",
        data: rows,
      });
    }

    throw new Error("Không có dữ liệu trong MySQL");
  } catch (error) {
    // Dự phòng với fallbackGrammar
    const topics = fallbackGrammar.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      level: t.level,
      summary: t.summary,
      tips: t.tips,
      question_count: t.questions?.length || 0,
    }));

    res.json({
      message: "Lấy danh sách ngữ pháp thành công (chế độ dự phòng)",
      data: topics,
    });
  }
});

// 2. LẤY CHI TIẾT 1 CHỦ ĐIỂM NGỮ PHÁP (LÝ THUYẾT + CÂU HỎI LUYỆN TẬP)
router.get("/:id", async (req, res) => {
  const topicId = parseInt(req.params.id, 10);

  try {
    const [topics] = await pool.query(
      "SELECT * FROM grammar_topics WHERE id = ?",
      [topicId]
    );

    if (topics && topics.length > 0) {
      const topic = topics[0];
      const [questions] = await pool.query(
        "SELECT id, topic_id, question_text AS question, option_a, option_b, option_c, option_d, correct_answer, explanation FROM grammar_questions WHERE topic_id = ? ORDER BY id ASC",
        [topicId]
      );

      return res.json({
        message: "Lấy chi tiết ngữ pháp từ MySQL thành công",
        data: {
          ...topic,
          tips: topic.tips ? JSON.parse(topic.tips) : [],
          questions: questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: {
              A: q.option_a,
              B: q.option_b,
              C: q.option_c,
              D: q.option_d,
            },
            correct_answer: q.correct_answer,
            explanation: q.explanation,
          })),
        },
      });
    }

    throw new Error("Không tìm thấy trong MySQL");
  } catch (error) {
    const topic = fallbackGrammar.find((t) => t.id === topicId);
    if (!topic) {
      return res.status(404).json({ message: "Không tìm thấy chủ điểm ngữ pháp" });
    }

    res.json({
      message: "Lấy chi tiết ngữ pháp thành công (chế độ dự phòng)",
      data: topic,
    });
  }
});

// 3. NỘP BÀI TẬP NGỮ PHÁP & CHẤM ĐIỂM TỰ ĐỘNG
router.post("/:id/submit", (req, res) => {
  const topicId = parseInt(req.params.id, 10);
  const { answers = {} } = req.body;

  const topic = fallbackGrammar.find((t) => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ message: "Không tìm thấy chủ điểm ngữ pháp" });
  }

  let correctCount = 0;
  const questions = topic.questions || [];
  const results = questions.map((q) => {
    const userAnswer = (answers[q.id] || "").trim().toUpperCase();
    const isCorrect = userAnswer === q.correct_answer.toUpperCase();
    if (isCorrect) correctCount++;

    return {
      id: q.id,
      question: q.question,
      options: q.options,
      user_answer: userAnswer || "Chưa chọn",
      correct_answer: q.correct_answer,
      is_correct: isCorrect,
      explanation: q.explanation,
    };
  });

  const total = questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  res.json({
    message: "Chấm điểm bài tập ngữ pháp hoàn tất!",
    data: {
      topic_id: topicId,
      topic_title: topic.title,
      score: correctCount,
      total_questions: total,
      percentage,
      passed: percentage >= 70,
      details: results,
    },
  });
});

// 4. ADMIN: THÊM CHỦ ĐIỂM NGỮ PHÁP MỚI
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { title, slug, level, summary, tips, theory } = req.body;

  if (!title || !theory) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ tiêu đề và nội dung lý thuyết" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO grammar_topics (title, slug, level, summary, tips, theory) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        level || "Trọng tâm Part 5",
        summary || "",
        JSON.stringify(tips || []),
        theory,
      ]
    );

    res.status(201).json({
      message: "Thêm chủ điểm ngữ pháp vào MySQL thành công",
      topicId: result.insertId,
    });
  } catch (error) {
    const newTopic = {
      id: fallbackGrammar.length + 1,
      title,
      slug: slug || "chu-diem-moi",
      level: level || "Trọng tâm Part 5",
      summary: summary || "",
      tips: tips || [],
      theory,
      questions: [],
    };
    fallbackGrammar.push(newTopic);

    res.status(201).json({
      message: "Thêm chủ điểm ngữ pháp thành công (lưu tạm bộ nhớ)",
      data: newTopic,
    });
  }
});

module.exports = router;