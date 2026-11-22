const express = require("express");
const pool = require("../config/mysql");
const fallbackTests = require("../data/toeicTests");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 1. LẤY DANH SÁCH ĐỀ THI (HỖ TRỢ FILTER THEO LEVEL, PART)
router.get("/tests", async (req, res) => {
  const { level, part } = req.query;

  try {
    let sql = `
      SELECT t.id, t.title, t.level, t.duration, t.total_questions AS totalQuestions, t.description,
             tp.part_number, tp.name AS part_name, COUNT(q.id) AS question_count
      FROM tests t
      LEFT JOIN test_parts tp ON t.id = tp.test_id
      LEFT JOIN questions q ON tp.id = q.test_part_id
      GROUP BY t.id, tp.id
      ORDER BY t.id ASC, tp.part_number ASC
    `;

    const [rows] = await pool.query(sql);

    // Gom nhóm theo Test
    const testsMap = {};
    for (const row of rows) {
      if (!testsMap[row.id]) {
        testsMap[row.id] = {
          id: row.id,
          title: row.title,
          level: row.level,
          duration: row.duration,
          totalQuestions: row.totalQuestions || 0,
          description: row.description,
          parts: [],
        };
      }
      if (row.part_number) {
        testsMap[row.id].parts.push({
          part: row.part_number,
          name: row.part_name,
          questionCount: Number(row.question_count) || 0,
        });
      }
    }

    let tests = Object.values(testsMap).map((test) => ({
      ...test,
      partCount: test.parts.length,
      // Tính lại tổng số câu hỏi thực tế nếu có
      totalQuestions: test.parts.reduce((sum, p) => sum + p.questionCount, 0) || test.totalQuestions,
    }));

    if (level) {
      tests = tests.filter((t) => t.level.toLowerCase() === String(level).toLowerCase());
    }

    if (part) {
      tests = tests.filter((t) => t.parts.some((p) => p.part === Number(part)));
    }

    return res.json({
      message: "Lấy danh sách đề TOEIC từ MySQL thành công",
      data: tests,
    });
  } catch (error) {
    console.warn("MySQL chưa sẵn sàng, dùng dữ liệu mẫu dự phòng:", error.message);
    let data = fallbackTests;

    if (level) {
      data = data.filter((test) => test.level.toLowerCase() === String(level).toLowerCase());
    }

    if (part) {
      data = data.filter((test) => test.parts.some((item) => item.part === Number(part)));
    }

    return res.json({
      message: "Lấy danh sách đề TOEIC thành công (chế độ dự phòng)",
      data: data.map((t) => ({
        id: t.id,
        title: t.title,
        level: t.level,
        duration: t.duration,
        totalQuestions: t.totalQuestions,
        description: t.description,
        partCount: t.parts.length,
        parts: t.parts.map((p) => ({ part: p.part, name: p.name, questionCount: p.questions.length })),
      })),
    });
  }
});

// 2. LẤY CHI TIẾT 1 ĐỀ THI KÈM PARTS VÀ CÂU HỎI
router.get("/tests/:id", async (req, res) => {
  const testId = Number(req.params.id);

  try {
    const [testRows] = await pool.query(
      "SELECT id, title, level, duration, total_questions AS totalQuestions, description FROM tests WHERE id = ?",
      [testId]
    );

    if (testRows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đề TOEIC" });
    }

    const test = testRows[0];

    const [partRows] = await pool.query(
      "SELECT id, part_number, name, passage FROM test_parts WHERE test_id = ? ORDER BY part_number ASC",
      [testId]
    );

    const parts = [];
    for (const part of partRows) {
      const [qRows] = await pool.query(
        "SELECT id, question_text AS question, image_url AS image, option_a, option_b, option_c, option_d, correct_answer AS answer, explanation FROM questions WHERE test_part_id = ?",
        [part.id]
      );

      parts.push({
        part: part.part_number,
        name: part.name,
        passage: part.passage,
        questions: qRows.map((q) => ({
          id: q.id,
          question: q.question,
          image: q.image,
          audio: null,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          answer: q.answer,
          explanation: q.explanation,
        })),
      });
    }

    test.parts = parts;

    return res.json({
      message: "Lấy chi tiết đề TOEIC thành công",
      data: test,
    });
  } catch (error) {
    console.warn("MySQL chưa sẵn sàng, dùng dữ liệu dự phòng:", error.message);
    const test = fallbackTests.find((item) => item.id === testId);
    if (!test) {
      return res.status(404).json({ message: "Không tìm thấy đề TOEIC" });
    }
    return res.json({
      message: "Lấy chi tiết đề TOEIC thành công (chế độ dự phòng)",
      data: test,
    });
  }
});

// 3. LƯU KẾT QUẢ THI CỦA NGƯỜI DÙNG
router.post("/submit", async (req, res) => {
  try {
    const { userId, testId, score, totalQuestions } = req.body;

    if (!userId || !testId || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Thiếu dữ liệu nộp bài" });
    }

    const [result] = await pool.query(
      "INSERT INTO user_results (user_id, test_id, score, total_questions) VALUES (?, ?, ?, ?)",
      [userId, testId, score, totalQuestions]
    );

    res.json({
      message: "Lưu kết quả bài thi thành công",
      resultId: result.insertId,
    });
  } catch (error) {
    console.error("Submit result error:", error);
    res.status(500).json({ message: "Lỗi lưu kết quả vào database", error: error.message });
  }
});

// 4. LẤY LỊCH SỬ THI CỦA MỘT NGƯỜI DÙNG
router.get("/history/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const [rows] = await pool.query(`
      SELECT ur.id, ur.score, ur.total_questions, ur.completed_at,
             t.title AS test_title, t.level AS test_level
      FROM user_results ur
      JOIN tests t ON ur.test_id = t.id
      WHERE ur.user_id = ?
      ORDER BY ur.completed_at DESC
    `, [userId]);

    res.json({
      message: "Lấy lịch sử làm bài thành công",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy lịch sử bài thi", error: error.message });
  }
});

// 5. LẤY THỐNG KÊ TỔNG QUAN (ADMIN & DASHBOARD)
router.get("/stats", async (req, res) => {
  try {
    const [[testStat]] = await pool.query("SELECT COUNT(*) AS totalTests FROM tests");
    const [[partStat]] = await pool.query("SELECT COUNT(*) AS totalParts FROM test_parts");
    const [[questionStat]] = await pool.query("SELECT COUNT(*) AS totalQuestions FROM questions");
    const [[userStat]] = await pool.query("SELECT COUNT(*) AS totalUsers FROM users");
    const [[resultStat]] = await pool.query("SELECT COUNT(*) AS totalSubmissions FROM user_results");
    let totalVocab = 0;
    try {
      const [[vocabStat]] = await pool.query("SELECT COUNT(*) AS totalVocab FROM vocabularies");
      totalVocab = vocabStat.totalVocab || 0;
    } catch {}

    res.json({
      message: "Lấy thống kê TOEIC thành công từ MySQL",
      data: {
        totalTests: testStat.totalTests || 0,
        totalParts: partStat.totalParts || 0,
        totalQuestions: questionStat.totalQuestions || 0,
        totalUsers: userStat.totalUsers || 0,
        totalSubmissions: resultStat.totalSubmissions || 0,
        totalVocab: totalVocab || 33,
      },
    });
  } catch (error) {
    const totalParts = fallbackTests.reduce((sum, test) => sum + test.parts.length, 0);
    const totalQuestions = fallbackTests.reduce(
      (sum, test) => sum + test.parts.reduce((partSum, part) => partSum + part.questions.length, 0),
      0
    );

    res.json({
      message: "Lấy thống kê TOEIC thành công (chế độ dự phòng)",
      data: {
        totalTests: fallbackTests.length,
        totalParts,
        totalQuestions,
        totalUsers: 2,
        totalSubmissions: 1,
      },
    });
  }
});

// 6. TẠO ĐỀ THI MỚI (CHỈ DÀNH CHO ADMIN)
router.post("/tests", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, level, duration, description, totalQuestions } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Tiêu đề đề thi không được để trống" });
    }

    const [result] = await pool.query(
      "INSERT INTO tests (title, level, duration, total_questions, description) VALUES (?, ?, ?, ?, ?)",
      [
        title.trim(),
        level || "Dễ",
        Number(duration) || 30,
        Number(totalQuestions) || 10,
        description || "Đề thi thử TOEIC chuẩn format.",
      ]
    );

    // Mặc định tạo sẵn 1 Part 5 cho đề mới
    await pool.query(
      "INSERT INTO test_parts (test_id, part_number, name) VALUES (?, 5, 'Incomplete Sentences')",
      [result.insertId]
    );

    res.status(201).json({
      message: "Tạo đề thi mới thành công",
      testId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo đề thi", error: error.message });
  }
});

// 7. XÓA ĐỀ THI (CHỈ DÀNH CHO ADMIN)
router.delete("/tests/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const testId = Number(req.params.id);
    await pool.query("DELETE FROM tests WHERE id = ?", [testId]);
    res.json({ message: "Xóa đề thi thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa đề thi", error: error.message });
  }
});

// 8. LẤY TẤT CẢ KẾT QUẢ BÀI THI CỦA MỌI HỌC VIÊN (CHỈ DÀNH CHO ADMIN)
router.get("/admin/results", verifyToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ur.id, ur.score, ur.total_questions, ur.completed_at,
             u.full_name AS student_name, u.email AS student_email,
             t.title AS test_title, t.level AS test_level
      FROM user_results ur
      JOIN users u ON ur.user_id = u.id
      JOIN tests t ON ur.test_id = t.id
      ORDER BY ur.completed_at DESC
      LIMIT 100
    `);
    res.json({ data: rows });
  } catch (error) {
    res.json({
      data: [
        {
          id: 1,
          student_name: "Nguyễn Văn Học Viên",
          student_email: "hocvien@gmail.com",
          test_title: "TOEIC Mini Test 01",
          test_level: "Dễ",
          score: 4,
          total_questions: 5,
          completed_at: new Date(),
        },
      ],
    });
  }
});

module.exports = router;
