import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold text-white mb-3">🎯 TOEIC MASTER</h4>
            <p className="text-secondary small mb-3">
              Nền tảng ôn thi và luyện thi TOEIC trực tuyến hiện đại với hệ thống thẻ Flashcard thông minh,
              chủ điểm ngữ pháp trọng tâm, kho đề thi format chuẩn và tự động theo dõi tiến độ học tập.
            </p>
            <div className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill small">
              ✨ Nền Tảng Học Trực Tuyến 2026
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Lộ trình học</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><Link to="/practice" className="text-decoration-none text-secondary">50 Đề Reading (Part 5-7)</Link></li>
              <li className="mb-2"><Link to="/grammar" className="text-decoration-none text-secondary">10 Chủ điểm Ngữ pháp</Link></li>
              <li className="mb-2"><Link to="/vocabulary" className="text-decoration-none text-secondary">600 Từ vựng Barron's</Link></li>
              <li className="mb-2"><Link to="/vocabulary" className="text-decoration-none text-secondary">Cụm từ Collocations</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Tính năng chính</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><Link to="/vocabulary" className="text-decoration-none text-secondary">🧠 Thẻ Flashcard Từ vựng</Link></li>
              <li className="mb-2"><Link to="/practice" className="text-decoration-none text-secondary">📝 Thi thử bấm giờ TOEIC</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-decoration-none text-secondary">📊 Bảng theo dõi tiến độ</Link></li>
              <li className="mb-2"><Link to="/admin" className="text-decoration-none text-secondary">⚙️ Bảng quản trị hệ thống</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Hỗ trợ & Liên hệ</h6>
            <p className="small text-secondary mb-1">📧 Email: contact@toeicmaster.edu.vn</p>
            <p className="small text-secondary mb-1">📞 Hotline: 1900 6868</p>
            <p className="small text-secondary mb-0">🏢 Thời gian: 8:00 - 22:00 hàng ngày</p>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 small text-secondary">
          <div>© 2026 TOEIC MASTER. All rights reserved.</div>
          <div>Thiết kế cho học viên TOEIC Việt Nam</div>
        </div>
      </div>
    </footer>
  );
}
