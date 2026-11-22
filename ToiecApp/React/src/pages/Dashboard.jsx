import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toeicApi } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const user = getUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Số từ vựng học viên đã đánh dấu thuộc
  const learnedVocabCount = (() => {
    try {
      const stored = localStorage.getItem("toeic_learned_vocab");
      return stored ? JSON.parse(stored).length : 0;
    } catch {
      return 0;
    }
  })();

  // Số chủ điểm ngữ pháp đã hoàn thành
  const completedGrammarCount = (() => {
    try {
      const stored = localStorage.getItem("toeic_completed_grammar");
      return stored ? JSON.parse(stored).length : 0;
    } catch {
      return 0;
    }
  })();

  useEffect(() => {
    if (user && user.id) {
      toeicApi
        .getUserHistory(user.id)
        .then((res) => {
          setHistory(res.data.data || []);
        })
        .catch((err) => {
          console.warn("Không thể tải lịch sử học tập:", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const totalTestsDone = history.length;
  const totalCorrect = history.reduce((sum, item) => sum + (item.score || 0), 0);
  const totalQuestions = history.reduce((sum, item) => sum + (item.total_questions || 0), 0);
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const stats = [
    { label: "Đề Reading đã hoàn thành", value: `${totalTestsDone}/50 đề`, color: "text-primary", icon: "📝" },
    { label: "Tỉ lệ chính xác", value: `${accuracy}%`, color: "text-success", icon: "🎯" },
    { label: "Ngữ pháp đã học", value: `${completedGrammarCount}/10 bài`, color: "text-warning", icon: "📖" },
    { label: "Từ vựng đã thuộc", value: `${learnedVocabCount}/612 từ`, color: "text-info", icon: "🧠" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="page-shell flex-grow-1">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1 rounded-pill small fw-bold mb-2">
                <span>🎓</span>
                <span>GÓC HỌC TẬP CÁ NHÂN</span>
                <span>•</span>
                <span className="text-secondary fw-normal">Tiến độ thời gian thực</span>
              </div>
              <h2 className="fw-bold display-6 mb-1">Góc Học Tập & Tiến Độ TOEIC</h2>
              <p className="text-muted mb-0">Theo dõi điểm số, phân tích lỗi sai và duy trì thói quen luyện thi mỗi ngày.</p>
            </div>
            <Link to="/" className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 fw-semibold">← Về trang chủ</Link>
          </div>

          {/* BANNER THEO VAI TRÒ */}
          {user?.role === "Admin" ? (
            <div className="alert alert-warning border-0 rounded-4 shadow-sm mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                👑 Bạn đang đăng nhập tài khoản <b>Quản trị viên (Admin)</b>. Bạn có toàn quyền quản lý đề thi và người dùng.
              </div>
              <Link to="/admin" className="btn btn-warning btn-sm px-3 fw-bold">
                ⚙️ Mở Trang Quản Trị Hệ Thống
              </Link>
            </div>
          ) : (
            <div className="alert alert-primary border-0 rounded-4 shadow-sm mb-4">
              🎓 Chào mừng học viên <b>{user?.fullName || user?.email || "Bạn mới"}</b>! Chúc bạn có một buổi học tập hiệu quả và sớm đạt mục tiêu điểm TOEIC!
            </div>
          )}

          {/* 4 THẺ THỐNG KÊ TIẾN TRÌNH CÁ NHÂN */}
          <div className="row g-3 mb-4">
            {stats.map((item) => (
              <div className="col-lg-3 col-sm-6" key={item.label}>
                <div className="dashboard-card soft-card p-4 h-100">
                  <div className="feature-icon mb-3">{item.icon}</div>
                  <h6 className="text-muted small mb-1">{item.label}</h6>
                  <h3 className={`${item.color} fw-bold mb-0`}>{item.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* LỊCH SỬ THI CỦA HỌC VIÊN */}
          <div className="soft-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">📋 Lịch sử làm bài thi của bạn</h4>
              <Link to="/practice" className="btn btn-sm btn-primary">Làm đề mới</Link>
            </div>

            {loading ? (
              <p className="text-muted">Đang tải lịch sử học tập...</p>
            ) : history.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <p>Bạn chưa hoàn thành bài thi nào. Hãy bắt đầu làm bài để ghi nhận kết quả và điểm số!</p>
                <Link to="/practice" className="btn btn-outline-primary">Bắt đầu làm bài thi ngay</Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Tên đề thi</th>
                      <th>Cấp độ</th>
                      <th>Kết quả</th>
                      <th>Tỷ lệ đúng</th>
                      <th>Thời gian nộp</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row, idx) => (
                      <tr key={row.id}>
                        <td><b>{idx + 1}</b></td>
                        <td className="fw-bold text-primary">{row.test_title}</td>
                        <td>
                          <span className="badge text-bg-info rounded-pill">{row.test_level}</span>
                        </td>
                        <td>
                          <span className="fw-bold text-success">
                            {row.score} / {row.total_questions}
                          </span> câu đúng
                        </td>
                        <td>
                          <b>{Math.round((row.score / row.total_questions) * 100)}%</b>
                        </td>
                        <td className="text-muted small">
                          {new Date(row.completed_at).toLocaleString("vi-VN")}
                        </td>
                        <td>
                          <Link to="/practice" className="btn btn-sm btn-outline-primary">
                            Luyện lại
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* LỘ TRÌNH RÈN LUYỆN DÀNH CHO HỌC VIÊN */}
          <div className="soft-card p-4">
            <h4 className="fw-bold mb-3">🎯 Lộ trình rèn luyện dành cho bạn</h4>
            <div className="row g-3">
              <div className="col-md-3 col-sm-6">
                <Link to="/vocabulary" className="btn btn-warning w-100 py-3 fw-bold">
                  🧠 600 Từ Vựng TOEIC
                </Link>
              </div>
              <div className="col-md-3 col-sm-6">
                <Link to="/grammar" className="btn btn-primary w-100 py-3 fw-bold">
                  📖 10 Bài Ngữ Pháp Part 5
                </Link>
              </div>
              <div className="col-md-3 col-sm-6">
                <Link to="/practice" className="btn btn-success w-100 py-3 fw-bold text-white">
                  📝 Luyện Đề Thi Bấm Giờ
                </Link>
              </div>
              <div className="col-md-3 col-sm-6">
                <Link to="/courses" className="btn btn-outline-primary w-100 py-3 fw-bold">
                  📚 Khóa Học & Lộ Trình
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
