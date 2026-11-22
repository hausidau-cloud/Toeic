import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { grammarApi } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Grammar() {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(1);
  const [topicDetail, setTopicDetail] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'practice'

  // Trạng thái tìm kiếm chủ điểm
  const [searchTerm, setSearchTerm] = useState("");

  // Trạng thái làm bài trắc nghiệm
  const [answers, setAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Tiến độ học tập đã hoàn thành lưu trong localStorage
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("toeic_completed_grammar") || "[]");
    } catch {
      return [];
    }
  });

  // Tải danh sách 10 chủ điểm
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoadingList(true);
        const res = await grammarApi.getAll();
        const list = res.data.data || [];
        setTopics(list);
        if (list.length > 0) {
          setSelectedTopicId(list[0].id);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách chủ điểm ngữ pháp:", err);
      } finally {
        setLoadingList(false);
      }
    };

    fetchTopics();
  }, []);

  // Tải chi tiết chủ điểm đang chọn
  useEffect(() => {
    if (!selectedTopicId) return;

    const fetchDetail = async () => {
      try {
        setLoadingDetail(true);
        setAnswers({});
        setSubmissionResult(null);
        const res = await grammarApi.getById(selectedTopicId);
        setTopicDetail(res.data.data || null);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết ngữ pháp:", err);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [selectedTopicId]);

  // Phát âm câu mẫu bằng Web Speech API
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Chọn đáp án trắc nghiệm
  const handleSelectOption = (questionId, optionKey) => {
    if (submissionResult) return; // Đã nộp bài thì không sửa
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  // Nộp bài và chấm điểm
  const handleSubmitQuiz = async () => {
    if (!topicDetail || !topicDetail.questions) return;
    try {
      setSubmitting(true);
      const res = await grammarApi.submitQuiz(selectedTopicId, answers);
      const resultData = res.data.data;
      setSubmissionResult(resultData);

      // Nếu đạt từ 70% trở lên, tự động đánh dấu đã hoàn thành
      if (resultData.passed && !completedTopicIds.includes(selectedTopicId)) {
        const updated = [...completedTopicIds, selectedTopicId];
        setCompletedTopicIds(updated);
        localStorage.setItem("toeic_completed_grammar", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Lỗi khi nộp bài:", err);
      alert("Có lỗi xảy ra khi chấm điểm, vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  // Làm lại bài quiz
  const handleResetQuiz = () => {
    setAnswers({});
    setSubmissionResult(null);
  };

  // Toggle thủ công trạng thái đã học / chưa học
  const toggleCompleted = (id) => {
    setCompletedTopicIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("toeic_completed_grammar", JSON.stringify(updated));
      return updated;
    });
  };

  // Lọc chủ điểm theo từ khóa tìm kiếm
  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.summary && t.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const completedCount = completedTopicIds.length;
  const progressPercent = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      {/* HEADER BANNER */}
      <section className="bg-primary text-white py-5 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}>
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-pill mb-3 text-white small fw-bold">
                <span>📚 10 CHỦ ĐIỂM NGỮ PHÁP PART 5</span>
                <span>•</span>
                <span>Bộ tài liệu 10 bài chuẩn ngữ pháp Part 5</span>
              </div>
              <h1 className="fw-bold display-6 mb-2">
                Ôn Luyện Ngữ Pháp TOEIC Thực Chiến
              </h1>
              <p className="text-light opacity-90 mb-4 fs-6">
                Làm chủ 10 chủ điểm ngữ pháp cốt lõi xuất hiện nhiều nhất trong đề thi TOEIC: 
                Nhận biết loại từ, Mệnh đề quan hệ, Tính từ V-ed/V-ing, Câu điều kiện & đảo ngữ, Liên từ - Giới từ.
              </p>

              {/* THANH TIẾN ĐỘ HỌC TẬP */}
              <div className="bg-dark bg-opacity-25 p-3 rounded-3 border border-white border-opacity-10" style={{ maxWidth: "520px" }}>
                <div className="d-flex justify-content-between align-items-center mb-2 small">
                  <span className="fw-semibold text-white">Tiến độ ôn luyện ngữ pháp:</span>
                  <span className="badge bg-warning text-dark fw-bold">
                    {completedCount} / {topics.length || 10} chủ điểm ({progressPercent}%)
                  </span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 d-none d-lg-block text-end">
              <div className="p-4 bg-white bg-opacity-10 backdrop-blur rounded-4 border border-white border-opacity-20 text-start shadow">
                <h6 className="fw-bold text-warning mb-2">💡 Mẹo đạt điểm cao Part 5:</h6>
                <ul className="small text-light ps-3 mb-3">
                  <li>Xác định loại từ xung quanh chỗ trống trước khi dịch nghĩa.</li>
                  <li>Thuộc lòng các linking verbs và cấu trúc bị động không tân ngữ.</li>
                  <li>Phân biệt rõ Liên từ (+ Clause) và Giới từ (+ Cụm N/V-ing).</li>
                </ul>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm fw-bold w-100"
                    onClick={() => setActiveTab("practice")}
                  >
                    ✍️ Luyện Đề Part 5 Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NỘI DUNG CHÍNH */}
      <div className="container py-4 flex-grow-1">
        <div className="row g-4">
          {/* CỘT TRÁI: DANH SÁCH 10 CHỦ ĐIỂM */}
          <div className="col-lg-4 col-xl-3">
            <div className="card shadow-sm border-0 sticky-top" style={{ top: "90px", zIndex: 10 }}>
              <div className="card-header bg-white py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 fw-bold text-primary d-flex align-items-center gap-2">
                    <span>📑</span> 10 Chủ Điểm Ngữ Pháp
                  </h6>
                  <span className="badge bg-primary-subtle text-primary fw-semibold">
                    {topics.length} bài
                  </span>
                </div>
                {/* Ô tìm kiếm chủ điểm */}
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="🔍 Tìm nhanh bài học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: "calc(100vh - 260px)" }}>
                {loadingList ? (
                  <div className="p-4 text-center text-muted">
                    <div className="spinner-border spinner-border-sm text-primary mb-2" role="status"></div>
                    <div className="small">Đang tải danh mục...</div>
                  </div>
                ) : filteredTopics.length === 0 ? (
                  <div className="p-3 text-center text-muted small">Không tìm thấy chủ điểm phù hợp.</div>
                ) : (
                  filteredTopics.map((topic) => {
                    const isSelected = topic.id === selectedTopicId;
                    const isCompleted = completedTopicIds.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`list-group-item list-group-item-action py-3 px-3 border-start-4 ${
                          isSelected
                            ? "bg-primary-subtle border-start border-primary fw-bold"
                            : "border-start-transparent"
                        }`}
                        style={{
                          borderLeftWidth: isSelected ? "4px" : "0px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <span className={`badge ${isSelected ? "bg-primary text-white" : "bg-secondary-subtle text-secondary"} small`}>
                            Bài {topic.id}
                          </span>
                          {isCompleted ? (
                            <span className="badge bg-success-subtle text-success small" title="Đã hoàn thành">
                              ✓ Đã học
                            </span>
                          ) : (
                            <span className="badge bg-light text-muted border small">
                              Chưa học
                            </span>
                          )}
                        </div>
                        <div className={`text-truncate small ${isSelected ? "text-primary" : "text-dark"}`} style={{ fontWeight: isSelected ? "700" : "500" }}>
                          {topic.title}
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2 small text-muted">
                          <span style={{ fontSize: "11px" }}>{topic.level || "Part 5"}</span>
                          <span className="badge bg-light text-dark border" style={{ fontSize: "10px" }}>
                            {topic.question_count || 5} câu hỏi
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG CHI TIẾT BÀI HỌC & BÀI TẬP */}
          <div className="col-lg-8 col-xl-9">
            {loadingDetail ? (
              <div className="card shadow-sm border-0 p-5 text-center">
                <div className="spinner-border text-primary mx-auto mb-3" role="status"></div>
                <h6 className="fw-semibold text-muted">Đang tải nội dung bài học...</h6>
              </div>
            ) : !topicDetail ? (
              <div className="card shadow-sm border-0 p-5 text-center text-muted">
                <h5>Vui lòng chọn một chủ điểm ngữ pháp từ danh sách bên trái.</h5>
              </div>
            ) : (
              <div className="card shadow-sm border-0">
                {/* CARD HEADER: TIÊU ĐỀ BÀI VÀ NÚT CHUYỂN TAB */}
                <div className="card-header bg-white border-bottom p-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                    <div>
                      <span className="badge bg-primary px-3 py-1 mb-2">Chủ điểm {topicDetail.id}</span>
                      <h4 className="fw-bold mb-1 text-dark">{topicDetail.title}</h4>
                      <p className="text-muted small mb-0">{topicDetail.summary}</p>
                    </div>

                    <button
                      className={`btn btn-sm ${
                        completedTopicIds.includes(topicDetail.id)
                          ? "btn-outline-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => toggleCompleted(topicDetail.id)}
                    >
                      {completedTopicIds.includes(topicDetail.id)
                        ? "✓ Đã đánh dấu hoàn thành"
                        : "○ Đánh dấu đã học"}
                    </button>
                  </div>

                  {/* TAB SWITCHER */}
                  <ul className="nav nav-pills nav-fill bg-light p-1 rounded-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link py-2 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                          activeTab === "theory" ? "active shadow-sm" : "text-muted"
                        }`}
                        onClick={() => setActiveTab("theory")}
                      >
                        <span>📘</span> Lý Thuyết & Mẹo Thi TOEIC
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link py-2 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                          activeTab === "practice" ? "active shadow-sm" : "text-muted"
                        }`}
                        onClick={() => setActiveTab("practice")}
                      >
                        <span>✍️</span> Luyện Tập Trắc Nghiệm Part 5
                        <span className="badge bg-warning text-dark ms-1">
                          {topicDetail.questions?.length || 0} câu
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* CARD BODY */}
                <div className="card-body p-4">
                  {/* ======================================================== */}
                  {/* TAB 1: LÝ THUYẾT & MẸO LÀM BÀI */}
                  {/* ======================================================== */}
                  {activeTab === "theory" && (
                    <div>
                      {/* HỘP MẸO THI TOEIC NHANH */}
                      {topicDetail.tips && topicDetail.tips.length > 0 && (
                        <div className="alert alert-warning border-warning border-start-4 shadow-sm mb-4">
                          <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                            <span>⚡</span> MẸO GIẢI NHANH TRONG PHÒNG THI (PART 5 & 6)
                          </h6>
                          <ul className="mb-0 ps-3 small text-dark">
                            {topicDetail.tips.map((tip, idx) => (
                              <li key={idx} className="mb-1">
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* NỘI DUNG LÝ THUYẾT CHI TIẾT */}
                      <div className="grammar-theory-content">
                        {topicDetail.theory ? (
                          <div
                            className="prose max-w-none lh-lg"
                            dangerouslySetInnerHTML={{
                              __html: topicDetail.theory
                                .replace(/### (.*?)\n/g, '<h5 class="fw-bold text-primary mt-4 mb-3 border-bottom pb-2">$1</h5>')
                                .replace(/\*\* (.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                .replace(/```([\s\S]*?)```/g, '<pre class="bg-dark text-light p-3 rounded-3 my-3"><code>$1</code></pre>')
                                .replace(/`([^`]+)`/g, '<code class="bg-light text-danger px-1 py-0.5 rounded border">$1</code>')
                                .replace(/\n\n/g, '<p class="mb-3"></p>')
                                .replace(/\| (.*?) \|/g, (match) => {
                                  return match; // Simple markdown table pass-through
                                }),
                            }}
                          />
                        ) : (
                          <p className="text-muted">Đang cập nhật nội dung chi tiết...</p>
                        )}
                      </div>

                      {/* NÚT CHUYỂN SANG BÀI TẬP */}
                      <div className="mt-5 pt-4 border-top text-center">
                        <button
                          className="btn btn-primary px-4 py-2 fw-bold shadow-sm"
                          onClick={() => setActiveTab("practice")}
                        >
                          👉 Chuyển Sang Làm {topicDetail.questions?.length || 0} Câu Trắc Nghiệm Ngay
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TAB 2: LUYỆN TẬP TRẮC NGHIỆM PART 5 */}
                  {/* ======================================================== */}
                  {activeTab === "practice" && (
                    <div>
                      {/* BẢNG TỔNG KẾT KẾT QUẢ SAU KHI NỘP BÀI */}
                      {submissionResult && (
                        <div
                          className={`alert p-4 mb-4 rounded-3 border-0 shadow-sm ${
                            submissionResult.passed
                              ? "alert-success bg-success-subtle text-success-emphasis"
                              : "alert-warning bg-warning-subtle text-warning-emphasis"
                          }`}
                        >
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                            <div>
                              <h4 className="fw-bold mb-1">
                                {submissionResult.passed ? "🎉 Chúc Mừng Bạn Đã Đạt Chuẩn!" : "💪 Hãy Cố Gắng Thêm Nhé!"}
                              </h4>
                              <p className="mb-0">
                                Bạn đã trả lời đúng <strong>{submissionResult.score}</strong> / {submissionResult.total_questions} câu hỏi ({submissionResult.percentage}%).
                              </p>
                            </div>
                            <div className="d-flex gap-2">
                              <button className="btn btn-dark btn-sm fw-bold px-3" onClick={handleResetQuiz}>
                                🔄 Làm Lại Bài Thi
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm fw-bold px-3 bg-white"
                                onClick={() => setActiveTab("theory")}
                              >
                                📖 Xem Lại Lý Thuyết
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* DANH SÁCH CÂU HỎI TRẮC NGHIỆM */}
                      {(!topicDetail.questions || topicDetail.questions.length === 0) ? (
                        <div className="text-center py-5 text-muted">
                          <p>Chưa có câu hỏi luyện tập cho chủ điểm này.</p>
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-4">
                          {topicDetail.questions.map((q, index) => {
                            const userAnswer = answers[q.id];
                            const detail = submissionResult?.details?.find((d) => d.id === q.id);
                            const isSubmitted = !!submissionResult;

                            return (
                              <div
                                key={q.id}
                                className={`card border rounded-3 p-4 shadow-sm ${
                                  isSubmitted
                                    ? detail?.is_correct
                                      ? "border-success bg-success bg-opacity-10"
                                      : "border-danger bg-danger bg-opacity-10"
                                    : "border-light-subtle"
                                }`}
                              >
                                {/* CÂU HỎI */}
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                  <h6 className="fw-bold text-dark mb-0 lh-base">
                                    <span className="badge bg-primary me-2">Câu {index + 1}</span>
                                    {q.question}
                                  </h6>
                                  <button
                                    type="button"
                                    className="btn btn-light btn-sm text-primary rounded-circle p-1 border shadow-none"
                                    title="Nghe phát âm câu hỏi"
                                    onClick={() => speakText(q.question.replace(/[-_]{3,}/g, "blank"))}
                                  >
                                    🔊
                                  </button>
                                </div>

                                {/* CÁC LỰA CHỌN A, B, C, D */}
                                <div className="row g-2 mb-2">
                                  {Object.entries(q.options).map(([optKey, optText]) => {
                                    let btnClass = "btn-outline-secondary text-dark";

                                    if (isSubmitted) {
                                      if (optKey === q.correct_answer) {
                                        btnClass = "btn-success fw-bold text-white";
                                      } else if (optKey === userAnswer && !detail?.is_correct) {
                                        btnClass = "btn-danger fw-bold text-white";
                                      } else {
                                        btnClass = "btn-light text-muted opacity-50";
                                      }
                                    } else if (userAnswer === optKey) {
                                      btnClass = "btn-primary text-white fw-bold shadow-sm";
                                    }

                                    return (
                                      <div key={optKey} className="col-12 col-md-6">
                                        <button
                                          type="button"
                                          disabled={isSubmitted}
                                          className={`btn w-100 text-start p-3 d-flex align-items-center gap-2 rounded-3 border ${btnClass}`}
                                          onClick={() => handleSelectOption(q.id, optKey)}
                                        >
                                          <span
                                            className="badge rounded-circle bg-white text-dark border px-2 py-1 fw-bold"
                                            style={{ minWidth: "26px" }}
                                          >
                                            {optKey}
                                          </span>
                                          <span className="flex-grow-1">{optText}</span>
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* GIẢI THÍCH CHI TIẾT SAU KHI NỘP BÀI */}
                                {isSubmitted && (
                                  <div className="mt-3 pt-3 border-top">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                      <span
                                        className={`badge ${
                                          detail?.is_correct ? "bg-success" : "bg-danger"
                                        }`}
                                      >
                                        {detail?.is_correct ? "✓ Đúng" : `✗ Sai (Đáp án đúng: ${q.correct_answer})`}
                                      </span>
                                      <span className="small text-muted">
                                        Lựa chọn của bạn: <strong>{userAnswer || "Chưa chọn"}</strong>
                                      </span>
                                    </div>
                                    <div className="p-3 bg-white rounded-3 border small text-dark">
                                      <strong className="text-primary">💡 Giải thích ngữ pháp: </strong>
                                      {q.explanation}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {/* THANH NỘP BÀI */}
                          <div className="card p-3 bg-white border shadow-sm mt-4 mb-4 d-flex flex-row justify-content-between align-items-center rounded-3">
                            <span className="text-muted small">
                              Đã chọn:{" "}
                              <strong>{Object.keys(answers).length}</strong> / {topicDetail.questions.length} câu
                            </span>

                            {!submissionResult ? (
                              <button
                                className="btn btn-warning px-4 py-2 fw-bold text-dark shadow-sm"
                                onClick={handleSubmitQuiz}
                                disabled={submitting || Object.keys(answers).length === 0}
                              >
                                {submitting ? "Đang chấm điểm..." : "🚀 Nộp Bài & Xem Điểm"}
                              </button>
                            ) : (
                              <button
                                className="btn btn-outline-primary px-4 py-2 fw-bold shadow-sm"
                                onClick={handleResetQuiz}
                              >
                                🔄 Làm Lại
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}