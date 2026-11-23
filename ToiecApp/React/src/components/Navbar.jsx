import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-navbar sticky-top shadow-sm py-2.5">
      <div className="container-fluid px-xl-5 px-lg-4 px-3">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: "1.5rem" }}>🎯</span>
          <span>TOEIC <span className="text-warning">MASTER</span></span>
        </Link>

        {/* Nút Toggle Mobile Menu */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <div className="navbar-nav mx-auto gap-lg-2 py-2 py-lg-0 align-items-center">
            <Link
              className={`nav-link ${isActive("/") ? "active-pill" : ""}`}
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              className={`nav-link ${isActive("/vocabulary") ? "active-pill" : ""}`}
              to="/vocabulary"
              onClick={() => setIsOpen(false)}
            >
              🧠 Ôn Từ Vựng
            </Link>
            <Link
              className={`nav-link ${isActive("/grammar") ? "active-pill" : ""}`}
              to="/grammar"
              onClick={() => setIsOpen(false)}
            >
              📖 Ngữ Pháp
            </Link>
            <Link
              className={`nav-link ${isActive("/practice") ? "active-pill" : ""}`}
              to="/practice"
              onClick={() => setIsOpen(false)}
            >
              📝 Luyện Đề
            </Link>
            <Link
              className={`nav-link ${isActive("/courses") ? "active-pill" : ""}`}
              to="/courses"
              onClick={() => setIsOpen(false)}
            >
              📚 Khóa Học
            </Link>
          </div>

          <div className="d-flex gap-2 align-items-center flex-nowrap pt-2 pt-lg-0 ms-lg-2">
            {user ? (
              <>
                {/* User chip */}
                <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 border border-white border-opacity-15 px-3 py-1.5 rounded-pill" title={`${user.fullName || user.email} (${user.role === "Admin" ? "Quản trị viên" : "Học viên"})`}>
                  <div className={`user-avatar-circle ${user.role === "Admin" ? "admin" : ""}`}>
                    {((user.fullName || user.email || "H")[0]).toUpperCase()}
                  </div>
                  <span className="fw-semibold text-white small" style={{ maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.fullName || user.email}
                  </span>
                  <span className={`badge rounded-pill px-2 py-0.5 ${user.role === "Admin" ? "bg-warning text-dark fw-bold" : "bg-primary text-white"}`} style={{ fontSize: "0.68rem" }}>
                    {user.role === "Admin" ? "Admin" : "Học viên"}
                  </span>
                </div>

                {/* NÚT QUẢN TRỊ CHỈ HIỆN KHI LÀ ADMIN */}
                {user.role === "Admin" && (
                  <Link
                    to="/admin"
                    className="btn btn-warning btn-sm px-2.5 py-1.5 rounded-pill fw-bold text-nowrap"
                    onClick={() => setIsOpen(false)}
                    title="Trang quản trị hệ thống"
                  >
                    ⚙️ Quản trị
                  </Link>
                )}

                {/* BẢNG HỌC TẬP CỦA HỌC VIÊN HOẶC ADMIN */}
                <Link
                  to="/dashboard"
                  className="btn btn-primary btn-sm px-3 py-1.5 rounded-pill d-flex align-items-center gap-1.5 fw-semibold text-nowrap shadow-sm"
                  onClick={() => setIsOpen(false)}
                  title="Góc học tập cá nhân"
                >
                  <span>📊</span>
                  <span>{user.role === "Admin" ? "Dashboard" : "Góc Học Tập"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm px-2.5 py-1.5 rounded-pill text-nowrap"
                  title="Đăng xuất khỏi hệ thống"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-light btn-sm px-3 py-1.5 rounded-pill"
                  onClick={() => setIsOpen(false)}
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="btn btn-warning btn-sm px-3 py-1.5 rounded-pill fw-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
