import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { toeicApi } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const letters = ["A", "B", "C", "D"];

// Chuẩn hóa tiêu đề phần thi (tránh trùng lặp 'Part 5 - Part 5: ...')
function formatPartTitle(partNum, name) {
  if (!name) return `Part ${partNum}`;
  const clean = name.replace(new RegExp(`^Part\\s*${partNum}\\s*[:\\-–—]*\\s*`, 'i'), '').trim();
  return `Part ${partNum}: ${clean || name}`;
}

// Xóa bỏ số thứ tự câu hỏi thừa từ bản trích xuất PDF (tránh 'Câu 1: 10. ...')
function formatQuestionText(text) {
  if (!text) return "";
  return text
    .replace(/^\s*(?:Câu\s*\d+[\s:.-]*|Question\s*\d+[\s:.-]*|\d+[\s:.-]+)\s*/i, "")
    .trim();
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export default function TestDetail() {
  const { id } = useParams();
  const user = getUser();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");

  // BỘ ĐẾM THỜI GIAN (COUNTDOWN TIMER)
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef(null);

  // BỘ LỌC XEM LẠI KẾT QUẢ (Tất cả / Câu đúng / Câu sai)
  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    async function loadTest() {
      try {
        setLoading(true);
        setError("");
        const res = await toeicApi.getTestById(id);
        const testData = res.data.data;
        setTest(testData);
        // Thiết lập thời gian (phút -> giây)
        const totalSeconds = (testData?.duration || 30) * 60;
        setTimeLeft(totalSeconds);
      } catch (err) {
        setError(err.response?.data?.message || "Không tải được chi tiết đề TOEIC.");
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, [id]);

  // Quản lý đếm ngược thời gian
  useEffect(() => {
    if (!submitted && isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            alert("⏰ Đã hết thời gian làm bài! Hệ thống đang tự động nộp bài của bạn.");
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [submitted, isTimerRunning, timeLeft]);

  const allQuestions = useMemo(() => {
    if (!test || !test.parts) return [];
    return test.parts.flatMap((part) =>
      part.questions.map((question) => ({ ...question, part: part.part }))
    );
  }, [test]);

  const score = useMemo(() => {
    return allQuestions.reduce((total, question) => {
      return total + (answers[question.id] === question.answer ? 1 : 0);
    }, 0);
  }, [allQuestions, answers]);

  // Định dạng thời gian mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Phát âm nội dung câu hỏi hoặc hội thoại (Web Speech API)
  const speakAudio = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitTest = async () => {
    setSubmitted(true);
    setIsTimerRunning(false);
    setSaveMessage("");

    if (user && user.id) {
      try {
        setSubmitting(true);
        await toeicApi.submitResult({
          userId: user.id,
          testId: test.id,
          score,
          totalQuestions: allQuestions.length,
        });
        setSaveMessage("✓ Kết quả bài thi đã được lưu vào hồ sơ học tập của bạn!");
      } catch (err) {
        console.error("Lỗi lưu kết quả thi:", err);
      } finally {
        setSubmitting(false);
      }
    } else {
      setSaveMessage("💡 Bạn đang làm bài ở chế độ khách. Đăng nhập để lưu kết quả và theo dõi tiến độ học tập nhé!");
    }
  };

  const scrollToQuestion = (qId) => {
    const element = document.getElementById(`q-${qId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="page-shell flex-grow-1">
          <div className="container text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <h4>Đang tải nội dung đề thi TOEIC...</h4>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="page-shell flex-grow-1">
          <div className="container text-center py-5">
            <div className="alert alert-danger rounded-4">{error || "Không tìm thấy đề thi"}</div>
            <Link to="/practice" className="btn btn-primary">Quay lại danh sách đề</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="page-shell flex-grow-1">
        <div className="container">
          {/* HEADER BÀI THI */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <span className="badge-soft mb-2">
                {test.level} · ⏱ Thời gian quy định: {test.duration} phút
              </span>
              <h2 className="fw-bold display-6 mb-1">{test.title}</h2>
              <p className="text-muted mb-0">{test.description}</p>
            </div>

            <div className="d-flex align-items-center gap-3">
              {/* ĐỒNG HỒ ĐẾM NGƯỢC */}
              {!submitted && (
                <div className={`p-3 rounded-4 shadow-sm border text-center ${
                  timeLeft <= 300 ? "bg-danger text-white border-danger" : "bg-white text-dark"
                }`}>
                  <div className="small fw-semibold">Thời gian còn lại</div>
                  <div className="fs-3 fw-bold font-monospace">⏱ {formatTime(timeLeft)}</div>
                </div>
              )}
              <Link to="/practice" className="btn btn-outline-secondary">← Danh sách đề</Link>
            </div>
          </div>

          {/* BẢNG KẾT QUẢ KHI ĐÃ NỘP BÀI */}
          {submitted && (
            <div className="result-card soft-card p-4 mb-4">
              <div className="row align-items-center g-3">
                <div className="col-md-8">
                  <span className="badge bg-success rounded-pill px-3 py-2 mb-2">ĐÃ NỘP BÀI VÀ CHẤM ĐIỂM</span>
                  <h3 className="fw-bold mb-1">
                    🎉 Kết quả: {score}/{allQuestions.length} câu đúng ({Math.round((score / (allQuestions.length || 1)) * 100)}%)
                  </h3>
                  <p className="text-muted mb-2">Bạn có thể xem chi tiết đáp án và phần giải thích cặn kẽ từng câu dưới đây.</p>
                  {saveMessage && <div className="alert alert-light border rounded-3 small mb-0">{saveMessage}</div>}
                </div>
                <div className="col-md-4 text-md-end">
                  {/* BỘ LỌC XEM LẠI */}
                  <div className="btn-group w-100">
                    <button
                      className={`btn btn-sm ${reviewFilter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => setReviewFilter("all")}
                    >
                      Tất cả ({allQuestions.length})
                    </button>
                    <button
                      className={`btn btn-sm ${reviewFilter === "wrong" ? "btn-danger" : "btn-outline-danger"}`}
                      onClick={() => setReviewFilter("wrong")}
                    >
                      Câu sai ({allQuestions.length - score})
                    </button>
                    <button
                      className={`btn btn-sm ${reviewFilter === "correct" ? "btn-success" : "btn-outline-success"}`}
                      onClick={() => setReviewFilter("correct")}
                    >
                      Câu đúng ({score})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row g-4">
            {/* CỘT CÂU HỎI CHÍNH */}
            <div className="col-lg-9">
              {test.parts.map((part) => (
                <div className="soft-card p-4 mb-4" key={part.part}>
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <h4 className="fw-bold mb-0 text-primary">
                      {formatPartTitle(part.part, part.name)}
                    </h4>
                    <span className="part-chip">{part.questions.length} câu hỏi</span>
                  </div>

                  {part.passage && (
                    <div className="passage-box mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <b className="text-secondary small">ĐOẠN VĂN / HỘI THOẠI (PASSAGE)</b>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary rounded-pill"
                          onClick={() => speakAudio(part.passage)}
                        >
                          🔊 Nghe đoạn văn
                        </button>
                      </div>
                      {part.passage}
                    </div>
                  )}

                  {part.questions.map((question, index) => {
                    const selected = answers[question.id];
                    const isCorrect = selected === question.answer;

                    // Lọc câu hỏi nếu đang xem lại kết quả
                    if (submitted) {
                      if (reviewFilter === "wrong" && isCorrect) return null;
                      if (reviewFilter === "correct" && !isCorrect) return null;
                    }

                    const globalIdx = allQuestions.findIndex((q) => q.id === question.id);
                    const qNumber = globalIdx !== -1 ? globalIdx + 1 : index + 1;

                    return (
                      <div className="question-box" key={question.id} id={`q-${question.id}`}>
                        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                          <p className="fw-bold mb-0 text-dark" style={{ lineHeight: 1.6 }}>
                            <span className="text-primary me-1.5">Câu {qNumber}:</span>
                            {formatQuestionText(question.question)}
                          </p>
                          <button
                            type="button"
                            className="btn btn-sm btn-light border rounded-pill px-2.5 py-1 text-nowrap flex-shrink-0 d-inline-flex align-items-center gap-1"
                            title="Nghe câu hỏi"
                            onClick={() => speakAudio(formatQuestionText(question.question))}
                          >
                            <span>🔊</span>
                            <span className="small">Nghe</span>
                          </button>
                        </div>

                        {question.image && (
                          <img src={question.image} alt="TOEIC question" className="question-img mb-3" />
                        )}

                        <div className="row g-2">
                          {question.options.map((option, optionIndex) => {
                            const letter = letters[optionIndex];
                            const active = selected === letter;
                            const correct = submitted && question.answer === letter;
                            const wrong = submitted && active && !isCorrect;

                            return (
                              <div className="col-md-6" key={letter}>
                                <button
                                  type="button"
                                  className={`answer-btn ${active ? "active" : ""} ${correct ? "correct" : ""} ${
                                    wrong ? "wrong" : ""
                                  }`}
                                  onClick={() =>
                                    !submitted && setAnswers((prev) => ({ ...prev, [question.id]: letter }))
                                  }
                                >
                                  <b>{letter}.</b> {option}
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {submitted && (
                          <div className={`explain-box mt-3 ${isCorrect ? "ok" : "no"}`}>
                            <b>Đáp án đúng: {question.answer}.</b> {question.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* BẢNG ĐIỀU HƯỚNG CÂU HỎI NHANH (QUESTION PALETTE) */}
            <div className="col-lg-3">
              <div className="soft-card p-3 sticky-top" style={{ top: 90 }}>
                <h6 className="fw-bold mb-3 d-flex justify-content-between align-items-center">
                  <span>Bảng câu hỏi ({allQuestions.length})</span>
                  <span className="badge bg-light text-dark border">
                    {Object.keys(answers).length}/{allQuestions.length}
                  </span>
                </h6>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {allQuestions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCorrect = answers[q.id] === q.answer;

                    let btnClass = "btn-outline-secondary";
                    if (submitted) {
                      btnClass = isCorrect ? "btn-success" : "btn-danger";
                    } else if (isAnswered) {
                      btnClass = "btn-primary";
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        className={`btn btn-sm ${btnClass} rounded-circle`}
                        style={{ width: 38, height: 38, padding: 0 }}
                        onClick={() => scrollToQuestion(q.id)}
                        title={`Câu ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="d-grid gap-2">
                  {!submitted ? (
                    <button
                      className="btn btn-primary py-3 fw-bold"
                      disabled={submitting}
                      onClick={handleSubmitTest}
                    >
                      {submitting ? "Đang chấm điểm..." : "Nộp bài chấm điểm 📤"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary py-3 fw-bold"
                      onClick={() => {
                        setSubmitted(false);
                        setAnswers({});
                        setSaveMessage("");
                        setTimeLeft((test?.duration || 30) * 60);
                        setIsTimerRunning(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Làm lại đề này 🔄
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
