import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        navigate(parsed.role === "Admin" ? "/admin" : "/dashboard");
      } catch {}
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email.trim() || !form.password.trim()) {
      setMessage("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(res.data.user.role === "Admin" ? "/admin" : "/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Không kết nối được server. Hãy kiểm tra backend đã chạy chưa.");
    } finally {
      setLoading(false);
    }
  };

  const setPreset = (email, password) => {
    setForm({ email, password });
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="auth-card p-4 p-md-5">
              <Link to="/" className="d-inline-flex mb-4 text-primary fw-bold">← Về trang chủ</Link>

              <div className="text-center mb-4">
                <span className="fs-1">🎯</span>
                <h2 className="fw-bold mb-1">Đăng nhập</h2>
                <p className="text-muted small mb-0">Đăng nhập để lưu tiến độ và lịch sử làm bài thi</p>
              </div>

              {message && (
                <div className={`alert ${message.includes("thành công") ? "alert-success" : "alert-danger"} text-center rounded-4`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Nhập địa chỉ email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Mật khẩu</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈 Ẩn" : "👁️ Hiện"}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold" disabled={loading}>
                  {loading ? "Đang xác thực..." : "Đăng Nhập"}
                </button>
              </form>

              {/* TÀI KHOẢN MẪU BẤM ĐIỀN NHANH */}
              <div className="alert alert-light border rounded-4 mt-4 small mb-0">
                <div className="fw-bold mb-2">💡 Tài khoản mẫu để trải nghiệm:</div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span>👑 Admin: <b>admin@gmail.com</b> / <b>123</b></span>
                  <button
                    type="button"
                    className="btn btn-xs btn-outline-primary py-0 px-2"
                    onClick={() => setPreset("admin@gmail.com", "123")}
                  >
                    Điền nhanh
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>🎓 Học viên: <b>hocvien@gmail.com</b> / <b>123456</b></span>
                  <button
                    type="button"
                    className="btn btn-xs btn-outline-primary py-0 px-2"
                    onClick={() => setPreset("hocvien@gmail.com", "123456")}
                  >
                    Điền nhanh
                  </button>
                </div>
              </div>

              <p className="text-center mt-4 mb-0">
                Chưa có tài khoản? <Link to="/register" className="fw-bold text-primary">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
