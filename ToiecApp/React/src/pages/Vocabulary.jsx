import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { vocabularyApi } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const letters = ["A", "B", "C", "D"];

const getCategoryIcon = (category) => {
  if (!category) return "📘";
  if (category.includes("Cụm từ")) return "🔥";
  if (category.includes("Bài 1:")) return "📑";
  if (category.includes("Bài 2:")) return "📈";
  if (category.includes("Bài 3:")) return "🛡️";
  if (category.includes("Bài 4:")) return "💼";
  if (category.includes("Bài 5:")) return "🎤";
  if (category.includes("Bài 6:")) return "💻";
  if (category.includes("Bài 7:")) return "🖨️";
  if (category.includes("Bài 8:")) return "📋";
  if (category.includes("Bài 9:")) return "⚡";
  if (category.includes("Bài 10:")) return "✉️";
  if (category.includes("Bài 11:")) return "📢";
  if (category.includes("Bài 12:")) return "🤝";
  if (category.includes("Bài 13:")) return "👥";
  if (category.includes("Bài 14:")) return "💰";
  if (category.includes("Bài 15:")) return "🏆";
  if (category.includes("Bài 16:")) return "🛒";
  if (category.includes("Bài 17:")) return "📦";
  if (category.includes("Bài 18:")) return "🚚";
  if (category.includes("Bài 19:")) return "🧾";
  if (category.includes("Bài 20:")) return "🏬";
  if (category.includes("Bài 21:")) return "🏦";
  if (category.includes("Bài 22:")) return "📊";
  if (category.includes("Bài 23:")) return "💵";
  if (category.includes("Bài 24:")) return "📑";
  if (category.includes("Bài 25:")) return "📉";
  if (category.includes("Bài 26:")) return "🏢";
  if (category.includes("Bài 27:")) return "👔";
  if (category.includes("Bài 28:")) return "🛠️";
  if (category.includes("Bài 29:")) return "💡";
  if (category.includes("Bài 30:")) return "🔑";
  if (category.includes("Bài 31:")) return "🍽️";
  if (category.includes("Bài 32:")) return "🍴";
  if (category.includes("Bài 33:")) return "🥪";
  if (category.includes("Bài 34:")) return "👨‍🍳";
  if (category.includes("Bài 35:")) return "🎪";
  if (category.includes("Bài 36:")) return "🧳";
  if (category.includes("Bài 37:")) return "✈️";
  if (category.includes("Bài 38:")) return "🚆";
  if (category.includes("Bài 39:")) return "🏨";
  if (category.includes("Bài 40:")) return "🚗";
  if (category.includes("Bài 41:")) return "🎬";
  if (category.includes("Bài 42:")) return "🎭";
  if (category.includes("Bài 43:")) return "🎵";
  if (category.includes("Bài 44:")) return "🏛️";
  if (category.includes("Bài 45:")) return "📺";
  if (category.includes("Bài 46:")) return "🩺";
  if (category.includes("Bài 47:")) return "🦷";
  if (category.includes("Bài 48:")) return "🛡️";
  if (category.includes("Bài 49:")) return "🏥";
  if (category.includes("Bài 50:")) return "💊";
  return "📘";
};

const parseCategoryName = (catName) => {
  if (!catName) return { main: "", sub: "" };
  const match = catName.match(/^(Bài \d+:\s*[^()]+)\s*(?:\((.*)\))?$/);
  if (match) {
    return {
      main: match[1].trim(),
      sub: match[2] ? match[2].trim() : "",
    };
  }
  if (catName.includes("Cụm từ")) {
    return {
      main: "Cụm từ TOEIC ăn điểm",
      sub: "Cụm cố định Part 5 & 6",
    };
  }
  return {
    main: catName,
    sub: "",
  };
};

export default function Vocabulary() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const isAdmin = user?.role === "Admin";

  // Danh sách toàn bộ từ vựng & danh mục chủ đề
  const [allVocab, setAllVocab] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chế độ xem: 'hub' (Tổng quan các chủ đề) | 'study' (Không gian học chi tiết của chủ đề)
  const [viewMode, setViewMode] = useState("hub");

  // Chủ đề đang chọn & chế độ học (Flashcard | Danh sách | Trắc nghiệm)
  const [selectedCategory, setSelectedCategory] = useState("Bài 1: Hợp đồng (Contracts)");
  const [activeTab, setActiveTab] = useState("flashcard"); // 'flashcard' | 'list' | 'quiz'

  // Tìm kiếm chủ đề & bộ lọc nhóm ở chế độ Hub
  const [hubTopicSearch, setHubTopicSearch] = useState("");
  const [hubGroupFilter, setHubGroupFilter] = useState("all");

  // Bộ lọc bên trong tab Tra cứu
  const [listSearch, setListSearch] = useState("");
  const [listType, setListType] = useState("Tất cả");

  // Trạng thái Flashcard
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedIds, setLearnedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("toeic_learned_vocab") || "[]");
    } catch {
      return [];
    }
  });

  // Trạng thái Quiz trắc nghiệm
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizMode, setQuizMode] = useState("mixed"); // "mixed" | "en_to_vi" | "vi_to_en"

  // Trạng thái Admin thêm từ mới
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    word_or_phrase: "",
    phonetic: "",
    word_type: "collocation",
    meaning: "",
    example_sentence: "",
    example_meaning: "",
    category: "Bài 1: Hợp đồng (Contracts)",
  });
  const [addMessage, setAddMessage] = useState("");
  const [adding, setAdding] = useState(false);

  // 1. TẢI DỮ LIỆU TỪ BACKEND
  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [vocabRes, catRes] = await Promise.all([
        vocabularyApi.getAll({}),
        vocabularyApi.getCategories(),
      ]);
      const vocabs = vocabRes.data.data || [];
      const cats = catRes.data.data || [];
      setAllVocab(vocabs);
      setCategoriesList(cats);

      // Nếu có bài học đã lưu trước đó trong localStorage thì khôi phục
      const savedTopic = localStorage.getItem("toeic_last_vocab_topic");
      if (savedTopic && (savedTopic === "Tất cả" || cats.some((c) => c.category === savedTopic))) {
        setSelectedCategory(savedTopic);
      } else if (cats.length > 0) {
        const bai1 = cats.find((c) => c.category.includes("Bài 1:"));
        setSelectedCategory(bai1 ? bai1.category : cats[0].category);
      }
    } catch (err) {
      console.error("Lỗi tải từ vựng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // 2. THỐNG KÊ TIẾN ĐỘ HỌC CHO TỪNG CHỦ ĐỀ
  const categoryStats = useMemo(() => {
    const map = {};
    for (const v of allVocab) {
      if (!map[v.category]) {
        map[v.category] = { total: 0, learned: 0 };
      }
      map[v.category].total += 1;
      if (learnedIds.includes(v.id)) {
        map[v.category].learned += 1;
      }
    }
    return map;
  }, [allVocab, learnedIds]);

  // Thống kê tổng quan toàn bộ hệ thống
  const totalLearned = useMemo(() => {
    return learnedIds.filter((id) => allVocab.some((v) => v.id === id)).length;
  }, [learnedIds, allVocab]);

  const totalPercent = allVocab.length > 0 ? Math.round((totalLearned / allVocab.length) * 100) : 0;

  // 3. TỪ VỰNG CỦA CHỦ ĐỀ ĐANG ĐƯỢC CHỌN (ĐỒNG BỘ CHO FLASHCARD, LIST, QUIZ)
  const currentTopicVocab = useMemo(() => {
    if (selectedCategory === "Tất cả") return allVocab;
    return allVocab.filter((v) => v.category === selectedCategory);
  }, [allVocab, selectedCategory]);

  // Từ vựng sau khi lọc theo từ khóa & loại từ ở tab Tra cứu
  const filteredListVocab = useMemo(() => {
    return currentTopicVocab.filter((item) => {
      const matchSearch =
        !listSearch.trim() ||
        item.word_or_phrase.toLowerCase().includes(listSearch.toLowerCase().trim()) ||
        item.meaning.toLowerCase().includes(listSearch.toLowerCase().trim());
      const matchType = listType === "Tất cả" || item.word_type === listType;
      return matchSearch && matchType;
    });
  }, [currentTopicVocab, listSearch, listType]);

  // Thống kê tiến độ riêng của chủ đề đang chọn
  const currentTopicLearnedCount = useMemo(() => {
    return currentTopicVocab.filter((v) => learnedIds.includes(v.id)).length;
  }, [currentTopicVocab, learnedIds]);

  const currentTopicPercent =
    currentTopicVocab.length > 0
      ? Math.round((currentTopicLearnedCount / currentTopicVocab.length) * 100)
      : 0;

  // Lọc danh sách chủ đề theo ô tìm kiếm & nhóm 10 bài ở chế độ Hub
  const filteredCategories = useMemo(() => {
    let list = categoriesList;
    if (hubGroupFilter !== "all") {
      if (hubGroupFilter === "collocations") {
        list = list.filter((c) => c.category.includes("Cụm từ"));
      } else {
        const match = hubGroupFilter.match(/group(\d)/);
        if (match) {
          const g = parseInt(match[1]);
          const startNum = (g - 1) * 10 + 1;
          const endNum = g * 10;
          list = list.filter((c) => {
            const numMatch = c.category.match(/Bài\s*(\d+):/);
            if (!numMatch) return false;
            const n = parseInt(numMatch[1]);
            return n >= startNum && n <= endNum;
          });
        }
      }
    }
    if (!hubTopicSearch.trim()) return list;
    const q = hubTopicSearch.toLowerCase().trim();
    return list.filter((c) => c.category.toLowerCase().includes(q));
  }, [categoriesList, hubTopicSearch, hubGroupFilter]);

  // 4. HÀM TẢI CÂU HỎI TRẮC NGHIỆM ĐỒNG BỘ CHO CHỦ ĐỀ
  const loadQuizQuestions = async (categoryName, mode = quizMode) => {
    try {
      setLoadingQuiz(true);
      setQuizQuestions([]); // Xóa ngay danh sách cũ để tránh nhầm lẫn câu hỏi của chủ đề trước
      setQuizSubmitted(false);
      setQuizAnswers({});
      const isAll = !categoryName || categoryName === "Tất cả";
      const res = await vocabularyApi.getQuiz({
        category: isAll ? undefined : categoryName,
        limit: isAll ? 10 : undefined,
        mode: mode,
      });
      setQuizQuestions(res.data.data || []);
    } catch (err) {
      console.error("Lỗi tạo bài trắc nghiệm:", err);
    } finally {
      setLoadingQuiz(false);
    }
  };

  // 5. TỰ ĐỘNG ĐỒNG BỘ TRẮC NGHIỆM KHI ĐỔI CHỦ ĐỀ HOẶC CHUYỂN SANG TAB QUIZ
  useEffect(() => {
    if (activeTab === "quiz" && viewMode === "study") {
      loadQuizQuestions(selectedCategory);
    }
  }, [selectedCategory, activeTab, viewMode]);

  // 6. CÁC HÀM XỬ LÝ ĐIỀU HƯỚNG
  const openStudyTopic = (category, tab = "flashcard") => {
    setSelectedCategory(category);
    setActiveTab(tab);
    setViewMode("study");
    setCurrentIndex(0);
    setIsFlipped(false);
    localStorage.setItem("toeic_last_vocab_topic", category);
    if (tab === "quiz") {
      loadQuizQuestions(category);
    }
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const handleChangeCategory = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentIndex(0);
    setIsFlipped(false);
    localStorage.setItem("toeic_last_vocab_topic", newCategory);
  };

  const handleNextLesson = () => {
    const idx = categoriesList.findIndex((c) => c.category === selectedCategory);
    if (idx !== -1 && idx + 1 < categoriesList.length) {
      handleChangeCategory(categoriesList[idx + 1].category);
      setCurrentIndex(0);
      setIsFlipped(false);
      window.scrollTo({ top: 80, behavior: "smooth" });
    }
  };

  // Phát âm từ vựng bằng Web Speech API
  const speakWord = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Đánh dấu từ đã thuộc / chưa thuộc
  const toggleLearned = (id) => {
    setLearnedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("toeic_learned_vocab", JSON.stringify(updated));
      return updated;
    });
  };

  // Chuyển thẻ Flashcard
  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (currentTopicVocab.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + currentTopicVocab.length) % (currentTopicVocab.length || 1)
    );
  };

  // Tính điểm Quiz
  const quizScore = useMemo(() => {
    return quizQuestions.reduce((total, q) => {
      return total + (quizAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
  }, [quizQuestions, quizAnswers]);

  // Xử lý Admin thêm từ vựng mới
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddMessage("");
    if (!addForm.word_or_phrase.trim() || !addForm.meaning.trim()) {
      setAddMessage("Vui lòng điền từ/cụm từ và giải nghĩa!");
      return;
    }

    try {
      setAdding(true);
      await vocabularyApi.create(addForm);
      setAddMessage("✓ Thêm từ vựng mới thành công!");
      setAddForm({
        word_or_phrase: "",
        phonetic: "",
        word_type: "collocation",
        meaning: "",
        example_sentence: "",
        example_meaning: "",
        category: selectedCategory !== "Tất cả" ? selectedCategory : "Bài 1: Hợp đồng (Contracts)",
      });
      loadInitialData();
      setTimeout(() => setShowAddForm(false), 1200);
    } catch (err) {
      setAddMessage("Lỗi khi thêm từ: " + (err.response?.data?.message || err.message));
    } finally {
      setAdding(false);
    }
  };

  // Xóa từ vựng (chỉ dành cho Admin)
  const handleDeleteVocab = async (vocabId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa từ vựng này không?")) {
      try {
        await vocabularyApi.delete(vocabId);
        loadInitialData();
      } catch (err) {
        alert("Lỗi khi xóa từ: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // Vị trí an toàn của thẻ từ vựng hiện tại
  const safeIndex = Math.min(currentIndex, Math.max(0, currentTopicVocab.length - 1));
  const currentVocab = currentTopicVocab[safeIndex] || null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="page-shell flex-grow-1">
        <div className="container">
          {/* HEADER CHÍNH */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <div className="d-inline-flex align-items-center gap-2 bg-warning bg-opacity-10 text-dark border border-warning border-opacity-30 px-3 py-1 rounded-pill small fw-bold mb-2">
                <span>🔥</span>
                <span>600 TỪ VỰNG TOEIC CỐT LÕI</span>
                <span>•</span>
                <span className="text-secondary fw-normal">Barron's 50 Bài & Cụm từ ăn điểm</span>
              </div>
              <h2 className="fw-bold display-6 mb-1">Ôn Luyện Từ Vựng TOEIC Theo Chủ Đề</h2>
              <p className="text-muted mb-0">
                Lộ trình chuẩn 50 bài học trích xuất từ giáo trình 600 Essential Words for the TOEIC, đồng bộ Flashcard 3D, danh sách tra cứu và trắc nghiệm.
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <Link to="/grammar" className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-1.5">
                <span>📖</span> Ngữ Pháp
              </Link>
              <Link to="/practice" className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-1.5">
                <span>📝</span> Luyện Đề
              </Link>
              <Link to="/" className="btn btn-light border btn-sm rounded-pill px-3 py-1.5 text-secondary">
                Trang chủ
              </Link>
            </div>
          </div>

          {/* ADMIN: NÚT VÀ FORM THÊM TỪ VỰNG */}
          {isAdmin && (
            <div className="mb-4">
              <button
                className="btn btn-success rounded-pill px-4"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "✕ Đóng form thêm từ" : "➕ Thêm từ / cụm từ mới (Admin)"}
              </button>

              {showAddForm && (
                <div className="soft-card p-4 mt-3 border border-success-subtle bg-white shadow">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold mb-0 text-success">➕ Thêm từ vựng hoặc cụm từ mới</h4>
                    <button className="btn btn-sm btn-close" onClick={() => setShowAddForm(false)}></button>
                  </div>
                  {addMessage && (
                    <div
                      className={`alert ${
                        addMessage.includes("thành công") ? "alert-success" : "alert-danger"
                      } rounded-3`}
                    >
                      {addMessage}
                    </div>
                  )}
                  <form onSubmit={handleAddSubmit}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Từ hoặc Cụm từ (*)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: comply with, implement, ..."
                          value={addForm.word_or_phrase}
                          onChange={(e) => setAddForm({ ...addForm, word_or_phrase: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Phiên âm IPA</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: /kəmˈplaɪ wɪð/"
                          value={addForm.phonetic}
                          onChange={(e) => setAddForm({ ...addForm, phonetic: e.target.value })}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label fw-bold">Loại từ</label>
                        <select
                          className="form-control"
                          value={addForm.word_type}
                          onChange={(e) => setAddForm({ ...addForm, word_type: e.target.value })}
                        >
                          <option value="collocation">Cụm từ (Collocation)</option>
                          <option value="phrasal_verb">Cụm động từ</option>
                          <option value="noun">Danh từ (Noun)</option>
                          <option value="verb">Động từ (Verb)</option>
                          <option value="adjective">Tính từ (Adjective)</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Chủ đề bài học</label>
                        <select
                          className="form-control"
                          value={addForm.category}
                          onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                        >
                          {categoriesList.map((c) => (
                            <option key={c.category} value={c.category}>
                              {c.category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Nghĩa tiếng Việt (*)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: tuân thủ theo, làm theo..."
                          value={addForm.meaning}
                          onChange={(e) => setAddForm({ ...addForm, meaning: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Câu ví dụ tiếng Anh</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: All employees must comply with the policy."
                          value={addForm.example_sentence}
                          onChange={(e) => setAddForm({ ...addForm, example_sentence: e.target.value })}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Dịch nghĩa câu ví dụ</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: Mọi nhân viên phải tuân thủ chính sách."
                          value={addForm.example_meaning}
                          onChange={(e) => setAddForm({ ...addForm, example_meaning: e.target.value })}
                        />
                      </div>
                      <div className="col-12 text-end">
                        <button type="submit" className="btn btn-primary px-4 py-2" disabled={adding}>
                          {adding ? "Đang lưu..." : "Lưu Từ Vựng"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* CHẾ ĐỘ 1: TỔNG QUAN 50 CHỦ ĐỀ BÀI HỌC (TOPIC CATALOG / HUB)             */}
          {/* ========================================================================= */}
          {viewMode === "hub" && (
            <div>
              {/* THANH TIẾN ĐỘ TỔNG QUAN & TÌM KIẾM CHỦ ĐỀ */}
              <div className="soft-card p-4 mb-4 bg-white shadow-sm border">
                <div className="row align-items-center g-3">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="topic-icon-circle bg-primary-subtle text-primary">
                        📚
                      </div>
                      <div>
                        <h4 className="fw-bold mb-1">Lộ Trình 50 Chủ Đề 600 Từ Vựng TOEIC Chuẩn Barron's</h4>
                        <p className="text-muted small mb-0">
                          Bấm chọn một chủ đề bất kỳ để bắt đầu học Flashcard 3D, tra cứu từ vựng hoặc làm trắc nghiệm kiểm tra.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="p-3 bg-light rounded-4 border">
                      <div className="d-flex justify-content-between align-items-center small fw-bold mb-1">
                        <span>Tiến độ ghi nhớ toàn bộ 600 từ vựng:</span>
                        <span className="text-primary fs-6">
                          {totalLearned} / {allVocab.length} từ ({totalPercent}%)
                        </span>
                      </div>
                      <div className="progress" style={{ height: "10px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${totalPercent}%`, transition: "width 0.4s ease" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* THANH TÌM KIẾM NHANH BÀI HỌC & BỘ LỌC NHÓM CHỦ ĐỀ */}
                <div className="row mt-3 pt-3 border-top g-2 align-items-center">
                  <div className="col-md-6 col-lg-5">
                    <div className="input-group shadow-sm rounded-pill overflow-hidden border">
                      <span className="input-group-text bg-white border-0 ps-3">🔍</span>
                      <input
                        type="text"
                        className="form-control border-0 shadow-none ps-2"
                        placeholder="Tìm bài học (ví dụ: Hợp đồng, Ngân hàng, Bài 25...)"
                        value={hubTopicSearch}
                        onChange={(e) => setHubTopicSearch(e.target.value)}
                      />
                      {hubTopicSearch && (
                        <button
                          type="button"
                          className="btn btn-white border-0 text-muted pe-3"
                          onClick={() => setHubTopicSearch("")}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-7 text-md-end text-muted small">
                    Đang hiển thị <strong>{filteredCategories.length}</strong> / {categoriesList.length} chủ đề bài học
                  </div>
                </div>

                {/* CÁC NÚT LỌC NHANH THEO NHÓM BÀI HỌC */}
                <div className="d-flex flex-wrap gap-2 mt-3 pt-2">
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "all" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("all")}
                  >
                    Tất cả (50 bài + Cụm từ)
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "group1" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("group1")}
                  >
                    Bài 1 - 10: Hợp đồng & Văn phòng
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "group2" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("group2")}
                  >
                    Bài 11 - 20: Nhân sự & Mua sắm
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "group3" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("group3")}
                  >
                    Bài 21 - 30: Tài chính & BĐS
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "group4" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("group4")}
                  >
                    Bài 31 - 40: Ẩm thực & Du lịch
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "group5" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("group5")}
                  >
                    Bài 41 - 50: Giải trí & Y tế
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                      hubGroupFilter === "collocations" ? "btn-primary shadow-sm" : "btn-light border text-muted"
                    }`}
                    onClick={() => setHubGroupFilter("collocations")}
                  >
                    🔥 Cụm từ ăn điểm
                  </button>
                </div>
              </div>

              {/* LƯỚI THẺ CHỦ ĐỀ HIỆN ĐẠI (TOPIC CARDS GRID) */}
              <div className="row g-4">
                {/* THẺ ĐẶC BIỆT: TỔNG HỢP TẤT CẢ CHỦ ĐỀ */}
                {(!hubTopicSearch || "tất cả tổng hợp".includes(hubTopicSearch.toLowerCase())) && hubGroupFilter === "all" && (
                  <div className="col-md-6 col-lg-4">
                    <div
                      className={`topic-card-hub h-100 p-4 d-flex flex-column justify-content-between position-relative shadow-sm ${
                        selectedCategory === "Tất cả" ? "border-2 border-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => openStudyTopic("Tất cả", "flashcard")}
                    >
                      <span className="position-absolute top-0 end-0 badge bg-danger rounded-pill m-3 px-3 py-1">
                        Tổng hợp 🔥
                      </span>
                      <div>
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="topic-icon-circle bg-primary text-white shadow-sm">
                            🌟
                          </div>
                          <div>
                            <h5 className="fw-bold mb-0 text-dark">Tất Cả 50 Bài Học & Cụm Từ</h5>
                            <small className="text-primary fw-semibold">{allVocab.length} từ vựng TOEIC chuẩn Barron's</small>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>Đã thuộc:</span>
                            <span className="fw-bold text-dark">{totalLearned}/{allVocab.length} từ ({totalPercent}%)</span>
                          </div>
                          <div className="progress" style={{ height: 6 }}>
                            <div className="progress-bar bg-success" style={{ width: `${totalPercent}%` }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-top mt-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex gap-1 p-1 bg-light rounded-pill border">
                          <button
                            type="button"
                            className={`btn btn-sm py-1.5 px-2 rounded-pill flex-grow-1 fw-semibold small ${
                              selectedCategory === "Tất cả" && activeTab === "flashcard"
                                ? "btn-primary text-white shadow-xs fw-bold"
                                : "btn-light text-secondary border-0"
                            }`}
                            onClick={() => openStudyTopic("Tất cả", "flashcard")}
                          >
                            🗂 Flashcard
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm py-1.5 px-2 rounded-pill flex-grow-1 fw-semibold small ${
                              selectedCategory === "Tất cả" && activeTab === "list"
                                ? "btn-primary text-white shadow-xs fw-bold"
                                : "btn-light text-secondary border-0"
                            }`}
                            onClick={() => openStudyTopic("Tất cả", "list")}
                          >
                            📖 Tra cứu
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm py-1.5 px-2 rounded-pill flex-grow-1 fw-semibold small ${
                              selectedCategory === "Tất cả" && activeTab === "quiz"
                                ? "btn-primary text-white shadow-xs fw-bold"
                                : "btn-light text-secondary border-0"
                            }`}
                            onClick={() => openStudyTopic("Tất cả", "quiz")}
                          >
                            ✍️ Trắc nghiệm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CÁC THẺ BÀI HỌC CỤ THỂ (BÀI 1 ĐẾN BÀI 20 + CỤM TỪ) */}
                {filteredCategories.map((cat) => {
                  const { main, sub } = parseCategoryName(cat.category);
                  const icon = getCategoryIcon(cat.category);
                  const stats = categoryStats[cat.category] || { total: cat.count || 0, learned: 0 };
                  const percent = stats.total > 0 ? Math.round((stats.learned / stats.total) * 100) : 0;
                  const isCurrent = selectedCategory === cat.category;

                  return (
                    <div className="col-md-6 col-lg-4" key={cat.category}>
                      <div
                        className={`topic-card-hub h-100 p-4 d-flex flex-column justify-content-between shadow-sm position-relative ${
                          isCurrent ? "border-2 border-primary" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => openStudyTopic(cat.category, "flashcard")}
                      >
                        {isCurrent && (
                          <span className="position-absolute top-0 end-0 badge bg-primary rounded-pill m-2.5 px-2.5 py-1 small">
                            Đang học ⭐
                          </span>
                        )}

                        <div>
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="topic-icon-circle border">
                              {icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <h5 className="fw-bold mb-0 text-truncate text-dark" title={main}>
                                {main}
                              </h5>
                              {sub && <small className="text-muted fw-semibold">{sub}</small>}
                            </div>
                            <span className="badge bg-light text-primary border rounded-pill px-2.5 py-1 small">
                              {cat.count} từ
                            </span>
                          </div>

                          <div className="mb-3">
                            <div className="d-flex justify-content-between small text-muted mb-1">
                              <span>Tiến độ ghi nhớ:</span>
                              <span className="fw-bold text-dark">
                                {stats.learned}/{stats.total} từ ({percent}%)
                              </span>
                            </div>
                            <div className="progress" style={{ height: 6 }}>
                              <div
                                className={`progress-bar ${percent === 100 ? "bg-success" : "bg-primary"}`}
                                style={{ width: `${percent}%`, transition: "width 0.3s ease" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* 3 NÚT THAO TÁC ĐỒNG BỘ CHO BÀI HỌC NÀY */}
                        <div className="pt-3 border-top mt-auto" onClick={(e) => e.stopPropagation()}>
                          <div className="d-flex gap-1 p-1 bg-light rounded-pill border">
                            <button
                              type="button"
                              className={`btn btn-sm py-1.5 px-2 rounded-pill flex-grow-1 fw-semibold small ${
                                isCurrent && activeTab === "flashcard"
                                  ? "btn-primary text-white shadow-xs fw-bold"
                                  : "btn-light text-secondary border-0"
                              }`}
                              title="Học thẻ Flashcard 3D bài này"
                              onClick={() => openStudyTopic(cat.category, "flashcard")}
                            >
                              🗂 Flashcard
                            </button>
                            <button
                              type="button"
                              className={`btn btn-sm py-1.5 px-2 rounded-pill flex-grow-1 fw-semibold small ${
                                isCurrent && activeTab === "list"
                                  ? "btn-primary text-white shadow-xs fw-bold"
                                  : "btn-light text-secondary border-0"
                              }`}
                              title="Tra cứu danh sách từ vựng bài này"
                              onClick={() => openStudyTopic(cat.category, "list")}
                            >
                              📖 Tra cứu
                            </button>
                            <button
                              type="button"
                              className={`btn btn-sm py-1.5 px-2 rounded-pill flex-grow-1 fw-semibold small ${
                                isCurrent && activeTab === "quiz"
                                  ? "btn-primary text-white shadow-xs fw-bold"
                                  : "btn-light text-secondary border-0"
                              }`}
                              title="Làm trắc nghiệm ôn tập bài này"
                              onClick={() => openStudyTopic(cat.category, "quiz")}
                            >
                              ✍️ Trắc nghiệm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredCategories.length === 0 && (
                <div className="alert alert-warning text-center rounded-4 p-5 mt-4">
                  <h5>Không tìm thấy bài học nào phù hợp với từ khóa "<strong>{hubTopicSearch}</strong>".</h5>
                  <button
                    className="btn btn-sm btn-outline-dark mt-2 rounded-pill px-4"
                    onClick={() => setHubTopicSearch("")}
                  >
                    Xem tất cả bài học
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* CHẾ ĐỘ 2: KHÔNG GIAN HỌC TẬP THEO CHỦ ĐỀ (ACTIVE TOPIC STUDY ROOM)       */}
          {/* ========================================================================= */}
          {viewMode === "study" && (
            <div>
              {/* THANH ĐIỀU HƯỚNG CHỦ ĐỀ TINH GỌN (COMPACT STUDY BAR) */}
              <div className="study-header-bar p-3 mb-4 bg-white shadow-sm border">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  {/* CỤM NÚT QUAY LẠI VÀ CHỌN BÀI HỌC */}
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-light border rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-1 shadow-sm"
                      onClick={() => setViewMode("hub")}
                      title="Quay lại danh sách 50 chủ đề"
                    >
                      <span>←</span>
                      <span>50 Chủ đề TOEIC</span>
                    </button>

                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-3">{getCategoryIcon(selectedCategory)}</span>
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <select
                            className="form-select form-select-sm fw-bold border-0 bg-light text-dark rounded-pill px-3 py-1 shadow-sm"
                            style={{ fontSize: "1rem", cursor: "pointer", maxWidth: "340px" }}
                            value={selectedCategory}
                            onChange={(e) => handleChangeCategory(e.target.value)}
                          >
                            <option value="Tất cả">🌟 Tất cả 50 bài ({allVocab.length} từ vựng)</option>
                            {categoriesList.map((c) => (
                              <option key={c.category} value={c.category}>
                                {c.category} ({c.count} từ)
                              </option>
                            ))}
                          </select>
                        </div>
                        <small className="text-muted d-block mt-0.5">
                          Đã thuộc: <strong className="text-success">{currentTopicLearnedCount}</strong> /{" "}
                          {currentTopicVocab.length} từ ({currentTopicPercent}%)
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* 3 CHẾ ĐỘ HỌC ĐỒNG BỘ: FLASHCARD | TRA CỨU | TRẮC NGHIỆM */}
                  <div className="btn-group p-1 bg-light rounded-pill border">
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 py-2 fw-bold ${
                        activeTab === "flashcard" ? "btn-primary shadow-sm" : "btn-light text-dark"
                      }`}
                      onClick={() => setActiveTab("flashcard")}
                    >
                      🗂 Thẻ Flashcard
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 py-2 fw-bold ${
                        activeTab === "list" ? "btn-primary shadow-sm" : "btn-light text-dark"
                      }`}
                      onClick={() => setActiveTab("list")}
                    >
                      📖 Danh sách tra cứu ({currentTopicVocab.length})
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 py-2 fw-bold ${
                        activeTab === "quiz" ? "btn-primary shadow-sm" : "btn-light text-dark"
                      }`}
                      onClick={() => setActiveTab("quiz")}
                    >
                      ✍️ Trắc nghiệm ôn tập
                    </button>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* TAB 1: GIAO DIỆN FLASHCARD 3D                                  */}
              {/* ------------------------------------------------------------- */}
              {activeTab === "flashcard" && (
                <div>
                  {loading ? (
                    <div className="alert alert-info rounded-4 text-center p-5">
                      Đang tải thẻ Flashcard...
                    </div>
                  ) : currentTopicVocab.length === 0 || !currentVocab ? (
                    <div className="alert alert-warning rounded-4 text-center p-5">
                      Chủ đề này chưa có từ vựng nào.
                    </div>
                  ) : (
                    <div className="row justify-content-center">
                      <div className="col-lg-8 col-md-10">
                        {/* THANH TIẾN TRÌNH THẺ */}
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary px-3 py-1.5 rounded-pill fw-bold">
                              {selectedCategory}
                            </span>
                            <span className="fw-bold text-muted small">
                              Thẻ {safeIndex + 1} / {currentTopicVocab.length}
                            </span>
                          </div>
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1.5 rounded-pill fw-bold">
                            Đã thuộc: {currentTopicLearnedCount} / {currentTopicVocab.length} từ
                          </span>
                        </div>

                        {/* THẺ FLASHCARD 3D */}
                        <div
                          className={`flashcard-box soft-card ${isFlipped ? "flipped" : ""}`}
                          onClick={() => setIsFlipped(!isFlipped)}
                        >
                          {!isFlipped ? (
                            /* MẶT TRƯỚC */
                            <div className="card-face front-face text-center p-5">
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="badge text-bg-primary rounded-pill px-3 py-1.5">
                                  {currentVocab.word_type?.toUpperCase()}
                                </span>
                                <span className="badge bg-light text-muted border rounded-pill">
                                  {currentVocab.category}
                                </span>
                              </div>

                              <h1 className="fw-bold display-4 mb-2 text-primary">
                                {currentVocab.word_or_phrase}
                              </h1>
                              <p className="text-muted fs-5 mb-4">{currentVocab.phonetic}</p>

                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm rounded-pill px-4 py-2 mb-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakWord(currentVocab.word_or_phrase);
                                }}
                              >
                                🔊 Nghe phát âm
                              </button>

                              <p className="text-secondary small mt-3">
                                👉 Bấm vào thẻ để xem nghĩa tiếng Việt & ví dụ thực tế
                              </p>
                            </div>
                          ) : (
                            /* MẶT SAU */
                            <div className="card-face back-face text-center p-5">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="badge text-bg-success rounded-pill px-3 py-1.5">
                                  Ý NGHĨA & VÍ DỤ THỰC TẾ
                                </span>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakWord(currentVocab.example_sentence);
                                  }}
                                >
                                  🔊 Đọc câu ví dụ
                                </button>
                              </div>

                              <h3 className="fw-bold text-dark mb-4">{currentVocab.meaning}</h3>

                              {currentVocab.example_sentence && (
                                <div className="example-quote p-3 rounded-4 mb-3 text-start bg-light border">
                                  <p className="fw-semibold text-primary mb-1">
                                    “ {currentVocab.example_sentence} ”
                                  </p>
                                  <p className="text-muted mb-0 small">
                                    → {currentVocab.example_meaning}
                                  </p>
                                </div>
                              )}

                              <p className="text-secondary small mt-2">👈 Bấm để quay lại mặt trước</p>
                            </div>
                          )}
                        </div>

                        {/* CÁC NÚT ĐIỀU HƯỚNG FLASHCARD */}
                        <div className="d-flex justify-content-between align-items-center mt-4 gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold"
                            onClick={handlePrevCard}
                          >
                            ← Thẻ trước
                          </button>

                          <button
                            type="button"
                            className={`btn px-4 py-2 rounded-pill fw-bold ${
                              learnedIds.includes(currentVocab.id)
                                ? "btn-success"
                                : "btn-outline-success"
                            }`}
                            onClick={() => toggleLearned(currentVocab.id)}
                          >
                            {learnedIds.includes(currentVocab.id)
                              ? "✓ Đã thuộc từ này"
                              : "Đánh dấu đã thuộc"}
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary px-4 py-2 rounded-pill fw-bold"
                            onClick={handleNextCard}
                          >
                            Thẻ kế tiếp →
                          </button>
                        </div>

                        {/* GỢI Ý BÀI TIẾP THEO KHI HỌC HẾT THẺ */}
                        {safeIndex === currentTopicVocab.length - 1 && (
                          <div className="card mt-4 p-4 rounded-4 border-primary-subtle bg-primary-subtle text-center shadow-sm">
                            <h5 className="fw-bold text-primary mb-1">
                              🎉 Bạn đã lướt hết {currentTopicVocab.length} từ của chủ đề này!
                            </h5>
                            <p className="text-muted small mb-3">
                              Hãy làm bài trắc nghiệm 10 câu để kiểm tra khả năng nhớ nghĩa, hoặc tiếp tục học bài kế tiếp.
                            </p>
                            <div className="d-flex justify-content-center gap-2 flex-wrap">
                              <button
                                type="button"
                                className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
                                onClick={() => setActiveTab("quiz")}
                              >
                                ✍️ Làm trắc nghiệm củng cố
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold bg-white"
                                onClick={handleNextLesson}
                              >
                                Chuyển sang bài tiếp theo →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 2: GIAO DIỆN DANH SÁCH TRA CỨU TỪ VỰNG                      */}
              {/* ------------------------------------------------------------- */}
              {activeTab === "list" && (
                <div className="soft-card p-4 bg-white shadow-sm border">
                  {/* THANH LỌC TỪ VỰNG NHỎ GỌN TRONG BÀI */}
                  <div className="row g-3 align-items-center mb-3 pb-3 border-bottom">
                    <div className="col-md-5">
                      <div className="input-group">
                        <span className="input-group-text bg-white">🔍</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt..."
                          value={listSearch}
                          onChange={(e) => setListSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-control"
                        value={listType}
                        onChange={(e) => setListType(e.target.value)}
                      >
                        <option value="Tất cả">Tất cả từ loại</option>
                        <option value="collocation">Cụm từ (Collocation)</option>
                        <option value="verb">Động từ (Verb)</option>
                        <option value="noun">Danh từ (Noun)</option>
                        <option value="adjective">Tính từ (Adjective)</option>
                        <option value="phrasal_verb">Cụm động từ</option>
                      </select>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill px-4 fw-bold"
                        onClick={() => setActiveTab("quiz")}
                      >
                        ✍️ Làm trắc nghiệm ({currentTopicVocab.length} từ)
                      </button>
                    </div>
                  </div>

                  {/* BẢNG TỪ VỰNG */}
                  {filteredListVocab.length === 0 ? (
                    <div className="alert alert-warning text-center rounded-4 p-4">
                      Không tìm thấy từ vựng nào khớp với bộ lọc tìm kiếm.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Từ / Cụm từ</th>
                            <th>Phiên âm</th>
                            <th>Loại</th>
                            <th>Nghĩa tiếng Việt</th>
                            <th>Ví dụ & Dịch nghĩa</th>
                            <th>Trạng thái</th>
                            <th>Phát âm</th>
                            {isAdmin && <th>Quản lý</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredListVocab.map((item, idx) => {
                            const isLearned = learnedIds.includes(item.id);
                            return (
                              <tr key={item.id}>
                                <td>{idx + 1}</td>
                                <td className="fw-bold text-primary fs-6">{item.word_or_phrase}</td>
                                <td className="text-muted font-monospace">{item.phonetic}</td>
                                <td>
                                  <span className="badge text-bg-light border">{item.word_type}</span>
                                </td>
                                <td className="fw-semibold">{item.meaning}</td>
                                <td className="small" style={{ maxWidth: 300 }}>
                                  <span className="text-dark d-block">“{item.example_sentence}”</span>
                                  <span className="text-muted">→ {item.example_meaning}</span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className={`btn btn-sm rounded-pill px-2.5 py-1 ${
                                      isLearned
                                        ? "btn-success"
                                        : "btn-outline-secondary"
                                    }`}
                                    style={{ fontSize: "11px" }}
                                    onClick={() => toggleLearned(item.id)}
                                  >
                                    {isLearned ? "✓ Đã thuộc" : "Chưa thuộc"}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-light border rounded-circle"
                                    title="Nghe phát âm"
                                    onClick={() => speakWord(item.word_or_phrase)}
                                  >
                                    🔊
                                  </button>
                                </td>
                                {isAdmin && (
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => handleDeleteVocab(item.id)}
                                      title="Xóa từ vựng"
                                    >
                                      🗑️ Xóa
                                    </button>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 3: GIAO DIỆN TRẮC NGHIỆM ÔN TẬP (QUIZ)                     */}
              {/* ------------------------------------------------------------- */}
              {activeTab === "quiz" && (
                <div>
                  {/* HEADER BÀI KIỂM TRA TRẮC NGHIỆM ĐỒNG BỘ */}
                  <div className="soft-card p-4 mb-4 bg-white shadow-sm border">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center flex-wrap gap-2">
                        <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold">
                          ✍️ BÀI THI TRẮC NGHIỆM
                        </span>
                        <h4 className="fw-bold mb-0 text-dark">
                          {selectedCategory === "Tất cả" ? "Đề Tổng Hợp Tất Cả 50 Bài" : selectedCategory}
                        </h4>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-1 small fw-bold">
                          {quizQuestions.length} câu {selectedCategory === "Tất cả" ? "(ngẫu nhiên)" : "đầy đủ"}
                        </span>
                      </div>
                      <div className="d-flex align-items-center flex-wrap gap-2">
                        {selectedCategory !== "Tất cả" ? (
                          <>
                            {/* BỘ CHỌN HOÁN ĐỔI CHIỀU CÂU HỎI VÀ ĐÁP ÁN */}
                            <div className="btn-group btn-group-sm rounded-pill border bg-light p-0.5" title="Chọn chiều câu hỏi và đáp án">
                              <button
                                type="button"
                                className={`btn btn-sm rounded-pill px-2.5 py-1 fw-bold ${quizMode === "mixed" ? "btn-primary text-white" : "btn-light text-muted"}`}
                                onClick={() => {
                                  setQuizMode("mixed");
                                  loadQuizQuestions(selectedCategory, "mixed");
                                }}
                              >
                                🔀 Xen kẽ
                              </button>
                              <button
                                type="button"
                                className={`btn btn-sm rounded-pill px-2.5 py-1 fw-bold ${quizMode === "en_to_vi" ? "btn-primary text-white" : "btn-light text-muted"}`}
                                onClick={() => {
                                  setQuizMode("en_to_vi");
                                  loadQuizQuestions(selectedCategory, "en_to_vi");
                                }}
                              >
                                Từ ➔ Nghĩa
                              </button>
                              <button
                                type="button"
                                className={`btn btn-sm rounded-pill px-2.5 py-1 fw-bold ${quizMode === "vi_to_en" ? "btn-primary text-white" : "btn-light text-muted"}`}
                                onClick={() => {
                                  setQuizMode("vi_to_en");
                                  loadQuizQuestions(selectedCategory, "vi_to_en");
                                }}
                              >
                                Nghĩa ➔ Từ
                              </button>
                            </div>

                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 fw-bold"
                              onClick={() => loadQuizQuestions(selectedCategory, quizMode)}
                              disabled={loadingQuiz}
                              title="Xáo trộn lại thứ tự câu hỏi và hoán đổi vị trí đáp án"
                            >
                              🔀 Đổi thứ tự câu & đáp án
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 fw-bold"
                            onClick={() => loadQuizQuestions("Tất cả", quizMode)}
                            disabled={loadingQuiz}
                          >
                            🔄 Đổi 10 câu hỏi khác
                          </button>
                        )}

                        {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm rounded-pill px-3 py-1.5 fw-bold shadow-sm"
                            onClick={() => {
                              setQuizSubmitted(true);
                              window.scrollTo({ top: 120, behavior: "smooth" });
                            }}
                          >
                            ✓ Nộp bài ngay ({Object.keys(quizAnswers).length}/{quizQuestions.length})
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center small fw-bold mb-2 text-muted">
                      <span>
                        Tiến độ làm bài: {Object.keys(quizAnswers).length} / {quizQuestions.length} câu
                      </span>
                      <span className="text-primary">
                        {Math.round((Object.keys(quizAnswers).length / (quizQuestions.length || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: `${(Object.keys(quizAnswers).length / (quizQuestions.length || 1)) * 100}%`,
                          transition: "width 0.3s ease",
                        }}
                      ></div>
                    </div>
                  </div>

                  {loadingQuiz ? (
                    <div className="card p-5 text-center border-0 shadow-sm rounded-4 my-4">
                      <div className="spinner-border text-primary mx-auto mb-3" role="status"></div>
                      <h5 className="fw-bold">
                        Đang tạo câu hỏi trắc nghiệm cho "{selectedCategory}"...
                      </h5>
                      <p className="text-muted mb-0">
                        {selectedCategory === "Tất cả"
                          ? "Hệ thống đang chuẩn bị 10 câu hỏi ngẫu nhiên từ kho 600 từ vựng..."
                          : `Hệ thống đang chuẩn bị đầy đủ ${currentTopicVocab.length} câu hỏi và xáo trộn đáp án...`}
                      </p>
                    </div>
                  ) : quizQuestions.length === 0 ? (
                    <div className="alert alert-warning rounded-4 text-center p-4">
                      Không thể tạo câu hỏi trắc nghiệm cho chủ đề này.
                      <button
                        className="btn btn-sm btn-primary ms-2 rounded-pill px-3"
                        onClick={() => loadQuizQuestions(selectedCategory)}
                      >
                        Thử lại
                      </button>
                    </div>
                  ) : (
                    <div style={{ paddingBottom: "140px" }}>
                      {/* BẢNG ĐIỂM KHI NỘP BÀI */}
                      {quizSubmitted && (
                        <div className="result-card soft-card p-4 mb-4 text-center">
                          <span className="badge bg-white text-primary px-3 py-1 rounded-pill fw-bold mb-2 shadow-sm">
                            KẾT QUẢ BÀI THI: {selectedCategory}
                          </span>
                          <h2 className="fw-bold mb-2 text-dark">
                            🎉 Điểm số: {quizScore} / {quizQuestions.length} câu đúng (
                            {Math.round((quizScore / quizQuestions.length) * 100)}%)
                          </h2>
                          <p className="text-muted mb-3">
                            {quizScore >= 8
                              ? "Xuất sắc! Bạn đã nắm rất vững từ vựng của bài học này."
                              : quizScore >= 5
                              ? "Khá tốt! Hãy xem lại các câu sai bên dưới để ghi nhớ thêm nhé."
                              : "Hãy ôn lại từ vựng qua Flashcard và thử lại một lần nữa nhé!"}
                          </p>
                          <div className="d-flex justify-content-center gap-3">
                            <button
                              type="button"
                              className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
                              onClick={() => {
                                setQuizSubmitted(false);
                                setQuizAnswers({});
                                window.scrollTo({ top: 120, behavior: "smooth" });
                              }}
                            >
                              🔄 Làm lại bài này
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold bg-white"
                              onClick={handleNextLesson}
                            >
                              Chuyển sang bài tiếp theo →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* DANH SÁCH 10 CÂU HỎI TRẮC NGHIỆM */}
                      {quizQuestions.map((q, idx) => {
                        const selected = quizAnswers[q.id];
                        const isCorrect = selected === q.correctAnswer;

                        return (
                          <div className="soft-card p-4 mb-4 bg-white border" key={q.id}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="fw-bold mb-0 text-dark">
                                Câu {idx + 1}: {q.question}
                              </h5>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                onClick={() => speakWord(q.word)}
                              >
                                🔊 Nghe từ
                              </button>
                            </div>

                            {q.sentence && (
                              <div className="p-3 bg-light rounded-3 mb-3 text-muted small border">
                                💡 Ngữ cảnh câu: <b>{q.sentence}</b>
                              </div>
                            )}

                            <div className="row g-2">
                              {q.options.map((opt, optIdx) => {
                                const letter = letters[optIdx];
                                const active = selected === letter;
                                const correct = quizSubmitted && q.correctAnswer === letter;
                                const wrong = quizSubmitted && active && !isCorrect;

                                return (
                                  <div className="col-md-6" key={letter}>
                                    <button
                                      type="button"
                                      className={`answer-btn ${active ? "active" : ""} ${
                                        correct ? "correct" : ""
                                      } ${wrong ? "wrong" : ""}`}
                                      onClick={() =>
                                        !quizSubmitted &&
                                        setQuizAnswers((prev) => ({ ...prev, [q.id]: letter }))
                                      }
                                    >
                                      <b>{letter}.</b> {opt}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <div className={`explain-box mt-3 ${isCorrect ? "ok" : "no"}`}>
                                <b>Đáp án đúng: {q.correctAnswer}.</b> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* THANH NỘP BÀI DÍNH DƯỚI ĐÁY */}
                      <div className="sticky-submit soft-card p-3 d-flex justify-content-between align-items-center flex-wrap gap-3 bg-white shadow-lg border rounded-4">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-primary-subtle text-primary fw-bold px-2.5 py-1 rounded-pill">
                            Tiến độ làm bài
                          </span>
                          <span className="fw-bold text-dark">
                            Đã chọn: <strong className="text-primary fs-6">{Object.keys(quizAnswers).length}</strong> / {quizQuestions.length} câu
                          </span>
                        </div>
                        {!quizSubmitted ? (
                          <button
                            type="button"
                            className="btn btn-primary px-4 py-2.5 rounded-pill fw-bold shadow-sm"
                            disabled={Object.keys(quizAnswers).length === 0}
                            onClick={() => {
                              setQuizSubmitted(true);
                              window.scrollTo({ top: 120, behavior: "smooth" });
                            }}
                          >
                            Nộp bài chấm điểm ({Object.keys(quizAnswers).length}/{quizQuestions.length})
                          </button>
                        ) : (
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-primary px-3 py-2 rounded-pill fw-bold shadow-sm"
                              onClick={() => {
                                setQuizSubmitted(false);
                                setQuizAnswers({});
                                window.scrollTo({ top: 120, behavior: "smooth" });
                              }}
                            >
                              🔄 Làm lại bài này
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary px-3 py-2 rounded-pill fw-bold"
                              onClick={() => setViewMode("hub")}
                            >
                              ← Chọn chủ đề khác
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
