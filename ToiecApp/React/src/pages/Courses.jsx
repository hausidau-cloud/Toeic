import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Courses() {
  const [activeCourse, setActiveCourse] = useState(0);

  const courses = [
    {
      id: 0,
      title: "TOEIC Reading Master (Part 5, 6, 7)",
      desc: "Trọn bộ 50 đề thi thực chiến Reading bám sát 50 bài học PDF: Hoàn thành câu (Part 5), Điền đoạn văn (Part 6) và Đọc hiểu (Part 7) có bấm giờ và giải thích chi tiết.",
      icon: "📑",
      level: "Target 500 - 850+ Reading",
      lessons: "50 đề thi (700 câu)",
      link: "/practice",
      btnText: "Luyện Đề Reading",
      status: "ready",
      modules: [
        {
          title: "Part 5: Hoàn thành câu (Incomplete Sentences)",
          count: "50 bài (300 câu)",
          desc: "Nhận diện nhanh câu từ loại, hòa hợp thì động từ, đại từ quan hệ, liên từ và giới từ."
        },
        {
          title: "Part 6: Điền đoạn văn (Text Completion)",
          count: "50 bài (150 câu)",
          desc: "Kỹ năng nắm mạch văn cảnh, điền từ ngữ cảnh và chọn câu phù hợp cho văn bản thương mại."
        },
        {
          title: "Part 7: Đọc hiểu văn bản (Reading Comprehension)",
          count: "50 bài (250 câu)",
          desc: "Chiến thuật Skimming & Scanning cho email, thư thương mại, thông báo nội bộ và quảng cáo."
        },
      ],
    },
    {
      id: 1,
      title: "0 GRAMMAR FOR TOEIC (10 Chủ Điểm Part 5)",
      desc: "Trích xuất chuẩn từ giáo trình 0 GRAMMAR FOR TOEIC: Câu từ loại, Mệnh đề quan hệ (who/which/that), Tính từ V-ed/V-ing, Điều kiện đảo ngữ, Bị động, Liên từ...",
      icon: "✍️",
      level: "Target 450 - 750+ Part 5",
      lessons: "10 chủ điểm (100+ câu)",
      link: "/grammar",
      btnText: "Ôn Ngữ Pháp Ngay",
      status: "ready",
      modules: [
        {
          title: "Bài 1: Câu Từ Loại (Word Forms - N, V, Adj, Adv)",
          count: "20 câu",
          desc: "Đuôi nhận biết N/Adj/Adv/V, cụm danh từ chuẩn (a/an/the + ADV + ADJ + N), mẹo giải nhanh không cần dịch."
        },
        {
          title: "Bài 2: Mệnh Đề Quan Hệ (Who, Whom, Which, That, Whose)",
          count: "18 câu",
          desc: "Đại từ quan hệ làm chủ ngữ, tân ngữ, sở hữu; cụm 'Those who' và cách rút gọn mệnh đề V-ing / V-ed."
        },
        {
          title: "Bài 3 - 6: Tính Từ, Động Từ, So Sánh & Trạng Từ",
          count: "20 câu",
          desc: "Tính từ -ed vs -ing, To-V vs V-ing, so sánh hơn/nhất, 4 vị trí đắc địa của trạng từ."
        },
        {
          title: "Bài 7 - 10: Điều Kiện Đảo Ngữ, Bị Động, Đại Từ, Liên Từ",
          count: "25 câu",
          desc: "Đảo ngữ Should loại 1, cụm bị động cố định đề TOEIC hay gặp, phân biệt liên từ vs giới từ."
        },
      ],
    },
    {
      id: 2,
      title: "600 Essential Words for the TOEIC & Collocations",
      desc: "Lộ trình 50 chủ đề từ vựng cốt lõi Barron's và cụm từ cố định ăn điểm trực tiếp trong Part 5 & 6. Học qua Flashcard 3D, danh sách tra cứu và trắc nghiệm đảo chiều.",
      icon: "🧠",
      level: "Nền tảng cho mọi học viên",
      lessons: "50 bài (612 từ & cụm)",
      link: "/vocabulary",
      btnText: "Học Flashcard 3D",
      status: "ready",
      modules: [
        {
          title: "Chủ đề Hợp đồng & Văn phòng (Bài 1 - 10)",
          count: "120 từ",
          desc: "Contracts, Marketing, Warranties, Business Planning, Office Tech, Procedures, Correspondence..."
        },
        {
          title: "Chủ đề Nhân sự & Mua sắm (Bài 11 - 20)",
          count: "120 từ",
          desc: "Job Advertising, Hiring, Salaries, Shopping, Ordering Supplies, Shipping, Invoices, Inventory..."
        },
        {
          title: "Chủ đề Tài chính & Doanh nghiệp (Bài 21 - 30)",
          count: "120 từ",
          desc: "Banking, Accounting, Investments, Taxes, Financial Statements, Quality Control, Leasing..."
        },
        {
          title: "Chủ đề Ẩm thực, Du lịch, Giải trí & Y tế (Bài 31 - 50)",
          count: "252 từ",
          desc: "Restaurants, Travel, Airlines, Hotels, Media, Doctor, Health Insurance, Pharmacy & Cụm từ ăn điểm."
        },
      ],
    },
    {
      id: 3,
      title: "TOEIC Listening Master (Part 1 - 4)",
      desc: "Phần luyện nghe Part 1 đến Part 4 hiện đang được biên soạn nội dung và chuẩn bị file âm thanh audio, sẽ được cập nhật bổ sung vào hệ thống trong thời gian tới.",
      icon: "🎧",
      level: "Đang cập nhật audio",
      lessons: "Sắp ra mắt",
      link: "#",
      btnText: "Sắp ra mắt ⏳",
      status: "coming_soon",
      note: "Hệ thống hiện tại đang tối ưu trọng tâm cho Reading Part 5, 6, 7; Ngữ pháp và Từ vựng. File nghe Part 1 - 4 sẽ được bổ sung khi có dữ liệu.",
      modules: [
        {
          title: "Part 1: Tranh miêu tả người & vật (Photographs)",
          count: "Đang cập nhật",
          desc: "Đang chuẩn bị file audio nghe chuẩn giọng bản xứ và hình ảnh tranh thi."
        },
        {
          title: "Part 2: Hỏi & Đáp ngắn (Question - Response)",
          count: "Đang cập nhật",
          desc: "Đang biên tập file âm thanh câu hỏi và các phương án trả lời gián tiếp."
        },
        {
          title: "Part 3: Hội thoại ngắn 2-3 người (Short Conversations)",
          count: "Đang cập nhật",
          desc: "Đang chuẩn bị audio hội thoại và hệ thống câu hỏi bắt từ khóa."
        },
        {
          title: "Part 4: Độc thoại ngắn (Short Talks)",
          count: "Đang cập nhật",
          desc: "Đang chuẩn bị các bài nghe thông báo sân bay, tin nhắn thoại, bản tin giao thông."
        },
      ],
    },
  ];

  const current = courses[activeCourse];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="page-shell flex-grow-1">
        <div className="container">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <span className="badge-soft mb-2">🎓 LỘ TRÌNH LUYỆN THI THỰC CHIẾN</span>
              <h2 className="fw-bold display-6 mb-1">Khóa Học & Lộ Trình TOEIC</h2>
              <p className="text-muted mb-0">
                Hệ thống tập trung tối đa cho <strong>Reading Part 5, 6, 7</strong>, <strong>Ngữ pháp trọng tâm</strong> và <strong>600 Từ vựng Barron's</strong>.
              </p>
            </div>
            <Link to="/vocabulary" className="btn btn-warning fw-bold">
              🧠 Ôn từ vựng & Cụm từ
            </Link>
          </div>

          {/* DANH SÁCH KHÓA HỌC */}
          <div className="row g-4 mb-5">
            {courses.map((item, idx) => (
              <div className="col-lg-3 col-md-6" key={item.id}>
                <div
                  className={`course-card soft-card p-4 h-100 d-flex flex-column cursor-pointer border ${
                    activeCourse === idx ? "border-primary shadow" : "border-transparent"
                  } ${item.status === "coming_soon" ? "opacity-85 bg-light" : "bg-white"}`}
                  onClick={() => setActiveCourse(idx)}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="feature-icon">{item.icon}</div>
                    <span
                      className={`badge rounded-pill ${
                        item.status === "coming_soon"
                          ? "bg-secondary-subtle text-secondary border"
                          : "text-bg-primary"
                      }`}
                    >
                      {item.status === "coming_soon" ? "⏳ Sắp ra mắt" : item.level}
                    </span>
                  </div>

                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted flex-grow-1 small">{item.desc}</p>
                  <div className="d-flex justify-content-between text-muted small mb-3">
                    <span>📚 {item.lessons}</span>
                    <span>🎯 {item.modules.length} chuyên đề</span>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className={`btn w-50 py-2 ${activeCourse === idx ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => setActiveCourse(idx)}
                    >
                      Chi tiết
                    </button>
                    {item.status === "coming_soon" ? (
                      <button
                        type="button"
                        className="btn btn-secondary w-50 py-2 fw-semibold disabled"
                        title="Đang chuẩn bị dữ liệu audio"
                      >
                        {item.btnText}
                      </button>
                    ) : (
                      <Link to={item.link} className="btn btn-warning w-50 py-2 fw-bold">
                        Vào học
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CHI TIẾT NỘI DUNG KHÓA HỌC ĐANG CHỌN */}
          <div className="soft-card p-4 p-md-5 bg-white border rounded-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-primary rounded-pill px-3 py-1.5">CHI TIẾT KHÓA HỌC</span>
                  {current.status === "coming_soon" && (
                    <span className="badge bg-warning text-dark rounded-pill px-3 py-1.5 fw-bold">
                      ⏳ Đang cập nhật dữ liệu âm thanh
                    </span>
                  )}
                </div>
                <h3 className="fw-bold mb-1">{current.icon} {current.title}</h3>
                <p className="text-muted mb-0">{current.desc}</p>
              </div>

              {current.status === "coming_soon" ? (
                <button className="btn btn-secondary px-4 py-3 fw-bold disabled">
                  ⏳ Đang chuẩn bị audio
                </button>
              ) : (
                <Link to={current.link} className="btn btn-primary px-4 py-3 fw-bold shadow-sm">
                  {current.btnText} →
                </Link>
              )}
            </div>

            {current.note && (
              <div className="alert alert-info border-info border-start-4 rounded-3 mb-4">
                ℹ️ <strong>Thông báo:</strong> {current.note}
              </div>
            )}

            <div className="row g-3">
              {current.modules.map((m, i) => (
                <div className="col-md-6" key={i}>
                  <div className="p-3 bg-light rounded-4 h-100 border">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold text-dark mb-0">{m.title}</h6>
                      <span className="badge bg-white text-primary border rounded-pill">{m.count}</span>
                    </div>
                    <p className="text-muted small mb-0">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
