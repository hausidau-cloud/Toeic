import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toeicApi } from "../../services/api";

export default function Home() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const [testsCompleted, setTestsCompleted] = useState(0);

  // Dữ liệu tiến độ học tập THẬT của người dùng
  const learnedVocabCount = (() => {
    try {
      const stored = localStorage.getItem("toeic_learned_vocab");
      return stored ? JSON.parse(stored).length : 0;
    } catch {
      return 0;
    }
  })();

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
          const list = res.data.data || [];
          const uniqueTests = new Set(list.map((item) => item.test_id));
          setTestsCompleted(uniqueTests.size);
        })
        .catch(() => {});
    }
  }, [user?.id]);

  const testsPct = Math.min(100, Math.round((testsCompleted / 50) * 100));
  const vocabPct = Math.min(100, Math.round((learnedVocabCount / 612) * 100));
  const grammarPct = Math.min(100, Math.round((completedGrammarCount / 10) * 100));

  const courses = [
    {
      title: "TOEIC Reading Master",
      lessons: "50 đề (700 câu)",
      level: "Target 500 - 850+",
      icon: "📑",
      desc: "Trọn bộ 50 đề thi Part 5, Part 6, Part 7 trích xuất từ bài học PDF, có bấm giờ và giải thích chi tiết.",
      link: "/practice",
      badge: "Sẵn sàng học"
    },
    {
      title: "0 GRAMMAR FOR TOEIC",
      lessons: "10 chủ điểm Part 5",
      level: "Target 450 - 750+",
      icon: "✍️",
      desc: "Làm chủ Câu từ loại, Mệnh đề quan hệ (who/which/that), Tính từ, Động từ, Bị động, Liên từ...",
      link: "/grammar",
      badge: "Sẵn sàng học"
    },
    {
      title: "600 Từ Vựng Barron's",
      lessons: "50 bài (612 từ)",
      level: "Mọi cấp độ",
      icon: "🧠",
      desc: "Thẻ Flashcard 3D học 600 từ vựng cốt lõi và cụm từ TOEIC ăn điểm có phát âm giọng chuẩn.",
      link: "/vocabulary",
      badge: "Sẵn sàng học"
    },
    {
      title: "TOEIC Listening (Part 1 - 4)",
      lessons: "Sắp ra mắt",
      level: "Đang cập nhật audio",
      icon: "🎧",
      desc: "Phần luyện nghe Part 1 đến Part 4 sẽ được bổ sung file âm thanh trong thời gian tới.",
      link: "/practice",
      badge: "⏳ Sắp ra mắt"
    },
  ];

  const features = [
    { title: "Ngữ pháp 10 chủ điểm Part 5", icon: "📖", link: "/grammar", desc: "Tổng hợp công thức, mẹo bẫy đề và bài tập trắc nghiệm giải chi tiết theo 0 GRAMMAR FOR TOEIC." },
    { title: "Flashcard 600 từ vựng & Cụm từ", icon: "🧠", link: "/vocabulary", desc: "Kho từ vựng 50 bài học Barron's với phiên âm, audio và trắc nghiệm đảo chiều." },
    { title: "50 Đề Luyện Reading Part 5, 6, 7", icon: "📝", link: "/practice", desc: "Bộ 50 đề thi thực chiến bám sát bài học PDF, có phân loại theo từng Part." },
    { title: "Thi thử có bấm giờ 20 phút", icon: "⏱", link: "/practice", desc: "Đồng hồ đếm ngược giúp bạn làm quen với áp lực phòng thi thật." },
    { title: "Giải thích đáp án chi tiết", icon: "🤖", link: "/practice", desc: "Chấm điểm ngay sau khi nộp bài và chỉ ra lý do đáp án đúng." },
    { title: "Theo dõi tiến độ trên Dashboard", icon: "📊", link: "/dashboard", desc: "Lưu lịch sử bài thi, bảng điểm chi tiết và biểu đồ tiến độ học tập của bạn." },
  ];

  return (
    <div className="app-page d-flex flex-column min-vh-100">
      <Navbar />

      <main id="top" className="flex-grow-1">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1.5 rounded-pill small fw-bold mb-4">
                  <span>🚀</span>
                  <span>TOEIC LEARNING PLATFORM 2026</span>
                  <span>•</span>
                  <span className="text-secondary fw-normal">Lộ trình chuẩn</span>
                </div>

                <h1 className="hero-title fw-bold mb-3">
                  Chinh phục TOEIC với <span className="text-gradient">Lộ Trình Chuẩn</span>
                </h1>

                <p className="lead text-secondary mb-4 fs-6" style={{ lineHeight: 1.7 }}>
                  Học từ vựng thông minh qua Flashcard 3D, làm chủ 10 chủ điểm ngữ pháp trọng tâm Part 5,
                  luyện 50 đề thi thực chiến có bấm giờ và hệ thống lưu trữ tiến độ học tập tự động.
                </p>

                <div className="d-flex gap-2 flex-wrap">
                  <Link to="/vocabulary" className="btn btn-warning px-3.5 py-2.5 fw-bold shadow-sm d-flex align-items-center gap-1.5 rounded-pill text-nowrap">
                    <span>🧠</span> Ôn Từ Vựng
                  </Link>

                  <Link to="/grammar" className="btn btn-primary px-3.5 py-2.5 fw-bold shadow-sm d-flex align-items-center gap-1.5 rounded-pill text-nowrap">
                    <span>📖</span> Ngữ Pháp TOEIC
                  </Link>

                  <Link to="/practice" className="btn btn-outline-primary px-3.5 py-2.5 fw-semibold d-flex align-items-center gap-1.5 rounded-pill text-nowrap">
                    <span>📝</span> Luyện Đề Thi
                  </Link>
                </div>

                <div className="row g-3 mt-3">
                  <div className="col-4">
                    <div className="hero-stat-card text-center">
                      <b className="fs-3 text-primary">50</b>
                      <div className="text-muted small fw-semibold mt-1">Đề Reading (Part 5-7)</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="hero-stat-card text-center">
                      <b className="fs-3 text-success">600+</b>
                      <div className="text-muted small fw-semibold mt-1">Từ vựng Barron's</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="hero-stat-card text-center">
                      <b className="fs-3 text-warning">10</b>
                      <div className="text-muted small fw-semibold mt-1">Chủ điểm ngữ pháp</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="hero-card p-4 p-md-4 shadow">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                        <span>🎯</span> Mục tiêu & Tiến độ
                      </h4>
                      <p className="text-muted small mb-0">Dữ liệu học tập cập nhật thời gian thực</p>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border rounded-pill px-2.5 py-1 small">
                      Real-time
                    </span>
                  </div>

                  {user ? (
                    <div className="hero-widget-profile d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-2.5">
                        <div className={`user-avatar-circle ${user.role === "Admin" ? "admin" : ""}`}>
                          {((user.fullName || user.email || "H")[0]).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold text-dark small" style={{ lineHeight: 1.2 }}>
                            {user.fullName || user.email}
                          </div>
                          <div className="text-success small" style={{ fontSize: "0.75rem" }}>
                            ● {user.role === "Admin" ? "Quản trị viên" : "Học viên trực tuyến"}
                          </div>
                        </div>
                      </div>
                      <span className="badge bg-white text-dark border rounded-pill px-2.5 py-1 small shadow-sm">
                        {user.role === "Admin" ? "👑 Admin" : "🎓 Học viên"}
                      </span>
                    </div>
                  ) : (
                    <div className="alert alert-warning rounded-4 border-0 mb-3 small py-2.5 d-flex justify-content-between align-items-center">
                      <span>💡 Đăng nhập để lưu tiến độ và kết quả thi!</span>
                      <Link to="/login" className="btn btn-warning btn-sm py-1 px-2.5 fw-bold rounded-pill">
                        Đăng nhập
                      </Link>
                    </div>
                  )}

                  {[
                    {
                      name: "50 Đề Luyện Reading",
                      sub: "Part 5, 6, 7 bám sát PDF",
                      icon: "📝",
                      current: testsCompleted,
                      total: 50,
                      unit: "đề",
                      value: testsPct,
                      barClass: "progress-gradient-blue",
                    },
                    {
                      name: "600 Từ Vựng & Cụm Từ",
                      sub: "50 bài Barron's cốt lõi",
                      icon: "🧠",
                      current: learnedVocabCount,
                      total: 612,
                      unit: "từ",
                      value: vocabPct,
                      barClass: "progress-gradient-amber",
                    },
                    {
                      name: "10 Chủ Điểm Ngữ Pháp",
                      sub: "Part 5 trích xuất chuẩn",
                      icon: "📖",
                      current: completedGrammarCount,
                      total: 10,
                      unit: "bài",
                      value: grammarPct,
                      barClass: "progress-gradient-emerald",
                    },
                  ].map((item) => (
                    <div className="mb-3.5" key={item.name}>
                      <div className="d-flex justify-content-between align-items-center small mb-1.5">
                        <div className="d-flex align-items-center gap-1.5">
                          <span>{item.icon}</span>
                          <span className="fw-bold text-dark">{item.name}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-secondary small">
                            <b className="text-dark">{item.current}</b>/{item.total} {item.unit}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill px-2 py-0.5" style={{ fontSize: "0.72rem" }}>
                            {item.value}%
                          </span>
                        </div>
                      </div>
                      <div className="progress rounded-pill bg-light border" style={{ height: 10 }}>
                        <div
                          className={`progress-bar rounded-pill ${item.barClass}`}
                          style={{ width: `${Math.max(item.value, item.current > 0 ? 5 : 0)}%`, transition: "width 0.4s ease" }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  <div className="d-flex gap-2 mt-4 pt-2 border-top">
                    <Link to="/dashboard" className="btn btn-primary flex-grow-1 py-2.5 rounded-pill fw-bold shadow-sm">
                      {user?.role === "Admin" ? "Xem Dashboard Quản Trị" : "📊 Góc Học Tập Của Bạn"}
                    </Link>
                    <Link to="/vocabulary" className="btn btn-outline-warning py-2.5 px-3.5 rounded-pill fw-bold text-dark">
                      🧠 Học Từ Vựng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="section-padding bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1 rounded-pill small fw-bold mb-2">
                <span>⭐</span>
                <span>TÍNH NĂNG NỔI BẬT</span>
                <span>•</span>
                <span className="text-secondary fw-normal">Học & Luyện thi thông minh</span>
              </div>
              <h2 className="fw-bold display-6">Phương pháp học TOEIC toàn diện</h2>
              <p className="text-muted mb-0">Thiết kế bài bản, hiện đại, hỗ trợ ôn luyện từ cơ bản đến nâng cao.</p>
            </div>

            <div className="row g-4">
              {features.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <Link to={item.link} className="text-decoration-none">
                    <div className="feature-card soft-card h-100 p-4">
                      <div className="feature-icon mb-3">{item.icon}</div>
                      <h4 className="fw-bold text-dark">{item.title}</h4>
                      <p className="text-muted mb-0">{item.desc}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES SECTION */}
        <section id="courses" className="section-padding">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end gap-3 flex-wrap mb-4">
              <div>
                <h2 className="fw-bold display-5 mb-2">Các khóa học & Lộ trình</h2>
                <p className="text-muted mb-0">Lựa chọn nội dung phù hợp với thang điểm mong muốn.</p>
              </div>
              <Link to="/courses" className="btn btn-outline-primary btn-sm rounded-pill px-3.5 py-2 fw-semibold">Xem tất cả khóa học →</Link>
            </div>

            <div className="row g-4">
              {courses.map((course, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className="course-card soft-card h-100 p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="feature-icon mb-0">{course.icon}</div>
                      {course.badge && (
                        <span className={`badge rounded-pill ${course.badge.includes("Sắp") ? "bg-secondary-subtle text-secondary border" : "bg-primary-subtle text-primary"}`}>
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <h5 className="fw-bold mb-2">{course.title}</h5>
                    <p className="text-muted flex-grow-1 small">{course.desc}</p>
                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span>📚 {course.lessons}</span>
                      <span>🎯 {course.level}</span>
                    </div>
                    {course.badge?.includes("Sắp") ? (
                      <button className="btn btn-secondary w-100 py-2 disabled" title="Đang chuẩn bị file audio">
                        Đang chuẩn bị audio
                      </button>
                    ) : (
                      <Link to={course.link} className="btn btn-primary w-100 py-2">
                        Bắt đầu học ngay
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
