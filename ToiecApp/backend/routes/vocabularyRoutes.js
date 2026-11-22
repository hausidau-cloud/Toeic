const express = require("express");
const pool = require("../config/mysql");
const fallbackVocab = require("../data/vocabularyData");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 1. LẤY DANH SÁCH TỪ VỰNG & CỤM TỪ (HỖ TRỢ TÌM KIẾM VÀ LỌC)
router.get("/", async (req, res) => {
  const { category, search, type } = req.query;

  try {
    let sql = "SELECT * FROM vocabularies WHERE 1=1";
    const params = [];

    if (category && category !== "Tất cả") {
      sql += " AND category = ?";
      params.push(category);
    }

    if (type && type !== "Tất cả") {
      sql += " AND word_type = ?";
      params.push(type);
    }

    if (search) {
      sql += " AND (word_or_phrase LIKE ? OR meaning LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += " ORDER BY id ASC";

    const [rows] = await pool.query(sql, params);

    res.json({
      message: "Lấy danh sách từ vựng từ MySQL thành công",
      data: rows,
    });
  } catch (error) {
    console.warn("MySQL chưa sẵn sàng, dùng dữ liệu từ vựng dự phòng:", error.message);
    let list = fallbackVocab;

    if (category && category !== "Tất cả") {
      list = list.filter((item) => item.category === category);
    }

    if (type && type !== "Tất cả") {
      list = list.filter((item) => item.word_type === type);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.word_or_phrase.toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q)
      );
    }

    res.json({
      message: "Lấy danh sách từ vựng thành công (chế độ dự phòng)",
      data: list,
    });
  }
});

// 2. LẤY DANH SÁCH CÁC CHỦ ĐỀ VÀ SỐ LƯỢNG TỪ
router.get("/categories", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT category, COUNT(*) as count FROM vocabularies GROUP BY category"
    );

    res.json({
      message: "Lấy danh mục chủ đề thành công",
      data: rows,
    });
  } catch (error) {
    const map = {};
    for (const item of fallbackVocab) {
      map[item.category] = (map[item.category] || 0) + 1;
    }
    const categories = Object.keys(map).map((cat) => ({
      category: cat,
      count: map[cat],
    }));

    res.json({
      message: "Lấy danh mục chủ đề thành công (dự phòng)",
      data: categories,
    });
  }
});

// 3. TẠO BÀI TẬP TRẮC NGHIỆM ÔN LUYỆN TỪ VỰNG & CỤM TỪ TỰ ĐỘNG
router.get("/quiz", async (req, res) => {
  const { category, limit, mode = "auto" } = req.query;

  try {
    let list = [];
    try {
      let sql = "SELECT * FROM vocabularies";
      const params = [];
      if (category && category !== "Tất cả") {
        sql += " WHERE category = ?";
        params.push(category);
      }
      const [rows] = await pool.query(sql, params);
      list = rows;
    } catch {
      list = fallbackVocab;
      if (category && category !== "Tất cả") {
        list = list.filter((item) => item.category === category);
      }
    }

    if (list.length < 4) {
      return res.status(400).json({
        message: "Không đủ từ vựng để tạo bài kiểm tra (cần tối thiểu 4 từ)",
      });
    }

    const isAllCategory = !category || category === "Tất cả";

    // 1. Nếu là chủ đề cụ thể: giữ ĐỦ TOÀN BỘ từ vựng của chủ đề đó (12 từ = 12 câu)
    //    Nếu là tổng hợp "Tất cả": lấy 10 câu ngẫu nhiên (hoặc theo limit)
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    const selected = isAllCategory
      ? shuffled.slice(0, Number(limit || 10))
      : shuffled;

    // Kho từ vựng & nghĩa dự phòng
    const globalMeanings = Array.from(new Set(fallbackVocab.map((item) => item.meaning)));
    const globalWords = Array.from(new Set(fallbackVocab.map((item) => item.word_or_phrase)));
    const categoryWords = Array.from(new Set(list.map((item) => item.word_or_phrase)));

    const questions = selected.map((item, idx) => {
      // Xác định dạng câu hỏi (Hoán đổi đáp án và câu hỏi)
      // Dạng 1: Hỏi từ tiếng Anh -> Đáp án A, B, C, D là nghĩa tiếng Việt
      // Dạng 2: Hỏi nghĩa tiếng Việt -> Đáp án A, B, C, D là từ tiếng Anh
      let isSwap = false;
      if (mode === "vi_to_en") {
        isSwap = true;
      } else if (mode === "en_to_vi") {
        isSwap = false;
      } else {
        // "auto" hoặc "mixed": xen kẽ 50/50 câu hỏi hoặc ngẫu nhiên
        isSwap = idx % 2 === 1;
      }

      if (isSwap) {
        // DẠNG HOÁN ĐỔI: Câu hỏi là NGHĨA TIẾNG VIỆT -> Đáp án chọn TỪ TIẾNG ANH
        // Lấy 3 từ sai (ưu tiên từ trong cùng bài học, sau đó bổ sung từ kho chung)
        const lessonWrongWords = categoryWords
          .filter((w) => w !== item.word_or_phrase)
          .sort(() => 0.5 - Math.random());
        const otherWrongWords = globalWords
          .filter((w) => w !== item.word_or_phrase && !lessonWrongWords.includes(w))
          .sort(() => 0.5 - Math.random());
        const wrongWords = [...lessonWrongWords, ...otherWrongWords].slice(0, 3);

        const options = [item.word_or_phrase, ...wrongWords].sort(() => 0.5 - Math.random());
        const answerLetter = ["A", "B", "C", "D"][options.indexOf(item.word_or_phrase)];

        return {
          id: idx + 1,
          vocabId: item.id,
          word: item.word_or_phrase,
          phonetic: item.phonetic,
          type: item.word_type,
          questionType: "vi_to_en",
          question: `Từ / cụm từ tiếng Anh nào mang nghĩa: "${item.meaning}"?`,
          sentence: item.example_sentence,
          options,
          correctAnswer: answerLetter,
          explanation: `${item.word_or_phrase} (${item.phonetic}): ${item.meaning}. Ví dụ: ${item.example_sentence}`,
        };
      } else {
        // DẠNG TIÊU CHUẨN: Câu hỏi là TỪ TIẾNG ANH -> Đáp án chọn NGHĨA TIẾNG VIỆT
        const wrongMeanings = globalMeanings
          .filter((m) => m !== item.meaning)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [item.meaning, ...wrongMeanings].sort(() => 0.5 - Math.random());
        const answerLetter = ["A", "B", "C", "D"][options.indexOf(item.meaning)];

        return {
          id: idx + 1,
          vocabId: item.id,
          word: item.word_or_phrase,
          phonetic: item.phonetic,
          type: item.word_type,
          questionType: "en_to_vi",
          question: `Nghĩa của từ / cụm từ "${item.word_or_phrase}" là gì?`,
          sentence: item.example_sentence,
          options,
          correctAnswer: answerLetter,
          explanation: `${item.word_or_phrase} (${item.phonetic}): ${item.meaning}. Ví dụ: ${item.example_sentence}`,
        };
      }
    });

    res.json({
      message: "Tạo bài trắc nghiệm từ vựng thành công",
      totalQuestions: questions.length,
      isAllCategory,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo bài tập", error: error.message });
  }
});

// 4. THÊM TỪ VỰNG HOẶC CỤM TỪ MỚI (CHỈ DÀNH CHO ADMIN)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const {
      word_or_phrase,
      phonetic,
      word_type,
      meaning,
      example_sentence,
      example_meaning,
      category,
    } = req.body;

    if (!word_or_phrase || !meaning) {
      return res.status(400).json({
        message: "Vui lòng nhập từ/cụm từ và nghĩa tiếng Việt",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO vocabularies (word_or_phrase, phonetic, word_type, meaning, example_sentence, example_meaning, category)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        word_or_phrase.trim(),
        phonetic || "",
        word_type || "noun",
        meaning.trim(),
        example_sentence || "",
        example_meaning || "",
        category || "Cụm từ TOEIC ăn điểm",
      ]
    );

    res.status(201).json({
      message: "Thêm từ vựng/cụm từ mới thành công",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Add vocab error:", error);
    res.status(500).json({
      message: "Lỗi lưu từ vựng vào MySQL",
      error: error.message,
    });
  }
});

// 5. XÓA TỪ VỰNG HOẶC CỤM TỪ (CHỈ DÀNH CHO ADMIN)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const vocabId = Number(req.params.id);
    await pool.query("DELETE FROM vocabularies WHERE id = ?", [vocabId]);
    res.json({ message: "Xóa từ vựng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa từ vựng", error: error.message });
  }
});

module.exports = router;
