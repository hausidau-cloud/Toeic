import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toeicApi, authApi, vocabularyApi } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export default function Admin() {
  const user = getUser();
  const [activeTab, setActiveTab] = useState("tests"); // 'tests' | 'vocab' | 'users' | 'results'
  const [stats, setStats] = useState({
    totalTests: 0,
    totalParts: 0,
    totalQuestions: 0,
    totalUsers: 0,
    totalSubmissions: 0,
    totalVocab: 612,
  });
  const [tests, setTests] = useState([]);
  const [vocabList, setVocabList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [studentResults, setStudentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form tạo đề thi mới
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [newTest, setNewTest] = useState({
    title: "",
    level: "Trung bình",
    duration: 20,
    totalQuestions: 14,
    description: "",
  });
  const [creatingTest, setCreatingTest] = useState(false);
  const [testMsg, setTestMsg] = useState("");

  // Form tạo từ vựng mới
  const [showCreateVocab, setShowCreateVocab] = useState(false);
  const [newVocab, setNewVocab] = useState({
    word_or_phrase: "",
    phonetic: "",
    word_type: "collocation",
    meaning: "",
    example_sentence: "",
    example_meaning: "",
    category: "Cụm từ TOEIC ăn điểm",
  });
  const [creatingVocab, setCreatingVocab] = useState(false);
  const [vocabMsg, setVocabMsg] = useState("");

  const loadData = () => {
    setLoading(true);
    Promise.all([
      toeicApi.getStats(),
      toeicApi.getTests(),
      authApi.getUsers(),
      vocabularyApi.getAll(),
      toeicApi.getAllResults().catch(() => ({ data: { data: [] } })),
    ])
      .then(([statsRes, testsRes, usersRes, vocabRes, resultsRes]) => {
        if (statsRes.data?.data) setStats(statsRes.data.data);
        if (testsRes.data?.data) setTests(testsRes.data.data);
        if (usersRes.data?.data) setUsersList(usersRes.data.data);
        if (vocabRes.data?.data) setVocabList(vocabRes.data.data);
        if (resultsRes.data?.data) setStudentResults(resultsRes.data.data);
      })
      .catch((err) => console.error("Admin data load error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user && user.role === "Admin") {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user?.role]);

  // CHẶN NẾU KHÔNG PHẢI ADMIN (HỌC VIÊN HOẶC CHƯA ĐĂNG NHẬP)
  if (!user || user.role !== "Admin") {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="page-shell flex-grow-1 d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 text-center">
                <div className="soft-card p-5 shadow-sm">
                  <div className="fs-1 mb-3">🚫</div>
                  <h2 className="fw-bold text-danger mb-3">Từ Chối Truy Cập (403 Forbidden)</h2>
                  <p className="text-secondary mb-4">
                    Khu vực này chỉ dành riêng cho <b>Quản trị viên (Admin)</b> quản lý đề thi, từ vựng và tài khoản hệ thống.
                    {user ? (
                      <span> Bạn đang đăng nhập với vai trò <b>Học viên ({user.email})</b>. Người dùng chỉ có quyền học tập và luyện đề.</span>
                    ) : (
                      <span> Bạn chưa đăng nhập. Vui lòng đăng nhập bằng tài khoản Quản trị viên để truy cập.</span>
                    )}
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/dashboard" className="btn btn-primary px-4 py-2">
                      ← Về Góc Học Tập Của Bạn
                    </Link>
                    <Link to="/practice" className="btn btn-outline-secondary px-4 py-2">
                      Luyện Đề Thi
                    </Link>
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

  // --- HÀM QUẢN LÝ ĐỀ THI ---
  const handleCreateTest = async (e) => {
    e.preventDefault();
    setTestMsg("");
    if (!newTest.title.trim()) {
      setTestMsg("Vui lòng nhập tên đề thi");
      return;
    }
    try {
      setCreatingTest(true);
      await toeicApi.createTest(newTest);
      setTestMsg(" Tạo đề thi mới thành công!");
      setNewTest({ title: "", level: "Dễ", duration: 30, totalQuestions: 10, description: "" });
      loadData();
      setTimeout(() => setShowCreateTest(false), 1200);
    } catch (err) {
      setTestMsg("Lỗi khi tạo đề: " + (err.response?.data?.message || err.message));
    } finally {
      setCreatingTest(false);
    }
  };

  const handleDeleteTest = async (testId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đề thi này không?")) {
      try {
        await toeicApi.deleteTest(testId);
        loadData();
      } catch (err) {
        alert("Lỗi khi xóa đề: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // --- HÀM QUẢN LÝ TỪ VỰNG ---
  const handleCreateVocab = async (e) => {
    e.preventDefault();
    setVocabMsg("");
    if (!newVocab.word_or_phrase.trim() || !newVocab.meaning.trim()) {
      setVocabMsg("Vui lòng nhập từ/cụm từ và nghĩa!");
      return;
    }
    try {
      setCreatingVocab(true);
      await vocabularyApi.create(newVocab);
      setVocabMsg(" Thêm từ vựng mới thành công!");
      setNewVocab({
        word_or_phrase: "",
        phonetic: "",
        word_type: "collocation",
        meaning: "",
        example_sentence: "",
        example_meaning: "",
        category: "Cụm từ TOEIC ăn điểm",
      });
      loadData();
      setTimeout(() => setShowCreateVocab(false), 1200);
    } catch (err) {
      setVocabMsg("Lỗi khi thêm từ: " + (err.response?.data?.message || err.message));
    } finally {
      setCreatingVocab(false);
    }
  };

  const handleDeleteVocab = async (vocabId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa từ vựng này không?")) {
      try {
        await vocabularyApi.delete(vocabId);
        loadData();
      } catch (err) {
        alert("Lỗi khi xóa từ: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // --- HÀM QUẢN LÝ TÀI KHOẢN ---
  const handleToggleRole = async (targetUser) => {
    const newRole = targetUser.role === "Admin" ? "User" : "Admin";
    if (window.confirm(`Bạn có chắc muốn đổi vai trò của ${targetUser.email} thành "${newRole}" không?`)) {
      try {
        await authApi.updateUserRole(targetUser.id, newRole);
        loadData();
      } catch (err) {
        alert("Lỗi cập nhật vai trò: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleDeleteUser = async (targetId) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản người dùng này không?")) {
      try {
        await authApi.deleteUser(targetId);
        loadData();
      } catch (err) {
        alert("Lỗi xóa người dùng: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const cards = [
    { title: "Tài khoản hệ thống", value: stats.totalUsers || usersList.length, icon: "👥", color: "text-primary" },
    { title: "Đề thi TOEIC", value: stats.totalTests, icon: "🧾", color: "text-success" },
    { title: "Phần thi (Parts)", value: stats.totalParts, icon: "📌", color: "text-info" },
    { title: "Tổng câu hỏi", value: stats.totalQuestions, icon: "❓", color: "text-warning" },
    { title: "Từ vựng & Cụm từ", value: stats.totalVocab || vocabList.length, icon: "🧠", color: "text-purple" },
    { title: "Lượt học viên thi", value: stats.totalSubmissions || studentResults.length, icon: "🏆", color: "text-danger" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="page-shell flex-grow-1">
        <div className="container">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <span className="badge-soft mb-2">👑 TRUNG TÂM ĐIỀU HÀNH ADMIN</span>
              <h2 className="fw-bold display-6 mb-1">Quản Trị Toàn Bộ Hệ Thống TOEIC</h2>
              <p className="text-muted mb-0">Admin toàn quyền quản lý đề thi, câu hỏi, từ vựng và tài khoản học viên.</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/vocabulary" className="btn btn-warning fw-bold">🧠 Xem trang Học Từ Vựng</Link>
              <Link to="/practice" className="btn btn-outline-primary">📝 Xem trang Luyện Đề</Link>
            </div>
          </div>

          <div className="alert alert-success rounded-4 border-0 shadow-sm mb-4">
            ✅ Đang đăng nhập: <b>{user.fullName || user.email}</b> (Quyền: <b>Quản trị viên hệ thống</b>). Bạn có quyền quản lý toàn bộ đề thi, câu hỏi và từ vựng của nền tảng.
          </div>

          {/* CÁC THẺ THỐNG KÊ TỔNG QUAN */}
          <div className="row g-3 mb-4">
            {cards.map((card) => (
              <div className="col-lg-2 col-md-4 col-sm-6" key={card.title}>
                <div className="dashboard-card soft-card p-3 h-100 text-center">
                  <div className="feature-icon mx-auto mb-2" style={{ width: 44, height: 44, fontSize: "1.3rem" }}>
                    {card.icon}
                  </div>
                  <h6 className="text-muted small mb-1">{card.title}</h6>
                  <h3 className={`fw-bold mb-0 ${card.color}`}>{card.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* THANH TAB ĐIỀU HÀNH */}
          <div className="btn-group p-1 bg-white rounded-pill shadow-sm border mb-4">
            <button
              className={`btn rounded-pill px-4 ${activeTab === "tests" ? "btn-primary" : "btn-light"}`}
              onClick={() => setActiveTab("tests")}
            >
              📝 Quản lý Đề thi ({tests.length})
            </button>
            <button
              className={`btn rounded-pill px-4 ${activeTab === "vocab" ? "btn-primary" : "btn-light"}`}
              onClick={() => setActiveTab("vocab")}
            >
              🧠 Quản lý Từ vựng ({vocabList.length})
            </button>
            <button
              className={`btn rounded-pill px-4 ${activeTab === "users" ? "btn-primary" : "btn-light"}`}
              onClick={() => setActiveTab("users")}
            >
              👥 Quản lý Học viên ({usersList.length})
            </button>
            <button
              className={`btn rounded-pill px-4 ${activeTab === "results" ? "btn-primary" : "btn-light"}`}
              onClick={() => setActiveTab("results")}
            >
              🏆 Kết quả Thi ({studentResults.length})
            </button>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: QUẢN LÝ ĐỀ THI TOEIC */}
          {/* ======================================================== */}
          {activeTab === "tests" && (
            <div className="soft-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">Quản lý Đề thi TOEIC</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowCreateTest(!showCreateTest)}
                >
                  {showCreateTest ? "Đóng form" : "➕ Tạo Đề Thi Mới"}
                </button>
              </div>

              {/* FORM TẠO ĐỀ THI MỚI */}
              {showCreateTest && (
                <div className="p-4 mb-4 bg-light rounded-4 border">
                  <h5 className="fw-bold mb-3 text-primary">Tạo Đề Thi Mới</h5>
                  {testMsg && (
                    <div className={`alert ${testMsg.includes("thành công") ? "alert-success" : "alert-danger"} rounded-3`}>
                      {testMsg}
                    </div>
                  )}
                  <form onSubmit={handleCreateTest}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Tiêu đề đề thi (*)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: TOEIC Practice Test 2026..."
                          value={newTest.title}
                          onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Cấp độ</label>
                        <select
                          className="form-control"
                          value={newTest.level}
                          onChange={(e) => setNewTest({ ...newTest, level: e.target.value })}
                        >
                          <option value="Dễ">Dễ (450 - 550)</option>
                          <option value="Trung bình">Trung bình (600 - 750)</option>
                          <option value="Khó">Khó (800+)</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Thời lượng (phút)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={newTest.duration}
                          onChange={(e) => setNewTest({ ...newTest, duration: Number(e.target.value) })}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Mô tả đề thi</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Mô tả nội dung các phần thi..."
                          value={newTest.description}
                          onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                        ></textarea>
                      </div>
                      <div className="col-12 text-end">
                        <button type="submit" className="btn btn-primary px-4 py-2" disabled={creatingTest}>
                          {creatingTest ? "Đang lưu đề..." : "Lưu Đề Thi"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {loading ? (
                <p className="text-muted">Đang tải danh sách đề thi...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Tên đề thi</th>
                        <th>Cấp độ</th>
                        <th>Thời lượng</th>
                        <th>Số câu</th>
                        <th>Các Part</th>
                        <th>Thao tác Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((test) => (
                        <tr key={test.id}>
                          <td><b>#{test.id}</b></td>
                          <td className="fw-bold text-primary">{test.title}</td>
                          <td>
                            <span className="badge text-bg-primary rounded-pill">{test.level}</span>
                          </td>
                          <td>⏱ {test.duration} phút</td>
                          <td><b>{test.totalQuestions}</b> câu</td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {test.parts?.map((p) => (
                                <span key={p.part} className="badge bg-light text-dark border">
                                  Part {p.part}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link to={`/practice/${test.id}`} className="btn btn-sm btn-outline-primary">
                                Test đề
                              </Link>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteTest(test.id)}
                              >
                                🗑️ Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: QUẢN LÝ TỪ VỰNG & CỤM TỪ */}
          {/* ======================================================== */}
          {activeTab === "vocab" && (
            <div className="soft-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">Quản lý Từ vựng & Cụm từ ({vocabList.length} từ)</h4>
                <button
                  className="btn btn-success"
                  onClick={() => setShowCreateVocab(!showCreateVocab)}
                >
                  {showCreateVocab ? "Đóng form" : "➕ Thêm Từ / Cụm Từ Mới"}
                </button>
              </div>

              {/* FORM THÊM TỪ VỰNG MỚI */}
              {showCreateVocab && (
                <div className="p-4 mb-4 bg-light rounded-4 border">
                  <h5 className="fw-bold mb-3 text-success">Thêm Từ Vựng / Cụm Từ Mới</h5>
                  {vocabMsg && (
                    <div className={`alert ${vocabMsg.includes("thành công") ? "alert-success" : "alert-danger"} rounded-3`}>
                      {vocabMsg}
                    </div>
                  )}
                  <form onSubmit={handleCreateVocab}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Từ hoặc Cụm từ (*)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: comply with, implement..."
                          value={newVocab.word_or_phrase}
                          onChange={(e) => setNewVocab({ ...newVocab, word_or_phrase: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Phiên âm IPA</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="VD: /kəmˈplaɪ wɪð/"
                          value={newVocab.phonetic}
                          onChange={(e) => setNewVocab({ ...newVocab, phonetic: e.target.value })}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label fw-bold">Loại từ</label>
                        <select
                          className="form-control"
                          value={newVocab.word_type}
                          onChange={(e) => setNewVocab({ ...newVocab, word_type: e.target.value })}
                        >
                          <option value="collocation">Cụm từ (Collocation)</option>
                          <option value="phrasal_verb">Cụm động từ</option>
                          <option value="verb">Động từ</option>
                          <option value="noun">Danh từ</option>
                          <option value="adjective">Tính từ</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-bold">Chủ đề</label>
                        <select
                          className="form-control"
                          value={newVocab.category}
                          onChange={(e) => setNewVocab({ ...newVocab, category: e.target.value })}
                        >
                          <option value="Cụm từ TOEIC ăn điểm">Cụm từ TOEIC ăn điểm</option>
                          <option value="Văn phòng & Công việc">Văn phòng & Công việc</option>
                          <option value="Hợp đồng & Kinh doanh">Hợp đồng & Kinh doanh</option>
                          <option value="Du lịch & Khách sạn">Du lịch & Khách sạn</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Nghĩa tiếng Việt (*)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nghĩa của từ..."
                          value={newVocab.meaning}
                          onChange={(e) => setNewVocab({ ...newVocab, meaning: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Câu ví dụ tiếng Anh</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Example sentence..."
                          value={newVocab.example_sentence}
                          onChange={(e) => setNewVocab({ ...newVocab, example_sentence: e.target.value })}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Dịch nghĩa câu ví dụ</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Dịch nghĩa câu ví dụ..."
                          value={newVocab.example_meaning}
                          onChange={(e) => setNewVocab({ ...newVocab, example_meaning: e.target.value })}
                        />
                      </div>
                      <div className="col-12 text-end">
                        <button type="submit" className="btn btn-success px-4 py-2" disabled={creatingVocab}>
                          {creatingVocab ? "Đang lưu..." : "Lưu Từ Vựng"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Từ / Cụm từ</th>
                      <th>Phiên âm</th>
                      <th>Loại</th>
                      <th>Nghĩa tiếng Việt</th>
                      <th>Chủ đề</th>
                      <th>Thao tác Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocabList.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td className="fw-bold text-primary">{item.word_or_phrase}</td>
                        <td className="text-muted font-monospace">{item.phonetic}</td>
                        <td><span className="badge bg-light text-dark border">{item.word_type}</span></td>
                        <td>{item.meaning}</td>
                        <td><span className="badge text-bg-info rounded-pill">{item.category}</span></td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteVocab(item.id)}
                          >
                            🗑️ Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: QUẢN LÝ TÀI KHOẢN HỌC VIÊN & ADMIN */}
          {/* ======================================================== */}
          {activeTab === "users" && (
            <div className="soft-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">👥 Quản lý Người dùng & Phân quyền ({usersList.length} tài khoản)</h4>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Họ và tên</th>
                      <th>Email</th>
                      <th>Vai trò hiện tại</th>
                      <th>Ngày tham gia</th>
                      <th>Hành động Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.id}>
                        <td>#{u.id}</td>
                        <td className="fw-bold">{u.full_name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge rounded-pill ${u.role === "Admin" ? "bg-warning text-dark fw-bold" : "bg-primary"}`}>
                            {u.role === "Admin" ? "👑 Admin" : "🎓 Học viên (User)"}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {u.created_at ? new Date(u.created_at).toLocaleDateString("vi-VN") : "N/A"}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleToggleRole(u)}
                              title="Chuyển đổi vai trò Admin <-> Học viên"
                            >
                              Đổi quyền
                            </button>
                            {u.id !== user.id && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteUser(u.id)}
                              >
                                🗑️ Xóa tài khoản
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: LỊCH SỬ THI CỦA TOÀN BỘ HỌC VIÊN */}
          {/* ======================================================== */}
          {activeTab === "results" && (
            <div className="soft-card p-4">
              <h4 className="fw-bold mb-3">🏆 Bảng Điểm & Lịch Sử Làm Bài Của Tất Cả Học Viên</h4>
              {studentResults.length === 0 ? (
                <p className="text-muted">Chưa có kết quả thi nào được ghi nhận.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Học viên</th>
                        <th>Email</th>
                        <th>Đề thi đã làm</th>
                        <th>Cấp độ</th>
                        <th>Kết quả</th>
                        <th>Tỉ lệ đúng</th>
                        <th>Thời gian nộp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentResults.map((res, i) => (
                        <tr key={res.id || i}>
                          <td>{i + 1}</td>
                          <td className="fw-bold text-primary">{res.student_name}</td>
                          <td>{res.student_email}</td>
                          <td>{res.test_title}</td>
                          <td><span className="badge text-bg-info rounded-pill">{res.test_level}</span></td>
                          <td><b className="text-success">{res.score}</b> / {res.total_questions} câu</td>
                          <td><b>{Math.round((res.score / res.total_questions) * 100)}%</b></td>
                          <td className="text-muted small">
                            {new Date(res.completed_at).toLocaleString("vi-VN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
