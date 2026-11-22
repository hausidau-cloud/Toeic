import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setMessage("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    if (form.password.length < 3) {
      setMessage("Mật khẩu phải có ít nhất 3 ký tự!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);
      setMessage(res.data.message || "Đăng ký thành công! Đang chuyển hướng đăng nhập...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="auth-card p-4 p-md-5">
              <Link to="/" className="d-inline-flex mb-4 text-primary fw-bold">← Về trang chủ</Link>

              <div className="text-center mb-4">
                <span className="fs-1">🎯</span>
                <h2 className="fw-bold mb-1">Đăng ký tài khoản</h2>
                <p className="text-muted small mb-0">Tạo tài khoản học viên để lưu tiến độ ôn luyện TOEIC</p>
              </div>

              {message && (
                <div
                  className={`alert ${
                    message.includes("thành công") ? "alert-success" : "alert-danger"
                  } text-center rounded-4`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Họ và tên (*)</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="VD: Nguyễn Văn A"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email (*)</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="VD: hocvien@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Mật khẩu (*)</label>
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
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Xác nhận mật khẩu (*)</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold" disabled={loading}>
                  {loading ? "Đang tạo tài khoản..." : "Hoàn Tất Đăng Ký"}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Đã có tài khoản? <Link to="/login" className="fw-bold text-primary">Đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
