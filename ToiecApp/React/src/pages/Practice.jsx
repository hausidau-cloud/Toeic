import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toeicApi } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Practice() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [part, setPart] = useState("");
  const [level, setLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");

  const groups = [
    { id: "all", label: "🌟 Tất cả (50 đề)" },
    { id: "group1", label: "📁 Đề 01 - 10: Hợp đồng & VP", range: [1, 10] },
    { id: "group2", label: "📁 Đề 11 - 20: Nhân sự & Mua sắm", range: [11, 20] },
    { id: "group3", label: "📁 Đề 21 - 30: Tài chính & BĐS", range: [21, 30] },
    { id: "group4", label: "📁 Đề 31 - 40: Ẩm thực & Du lịch", range: [31, 40] },
    { id: "group5", label: "📁 Đề 41 - 50: Giải trí & Y tế", range: [41, 50] },
  ];

  const params = useMemo(() => ({
    ...(part ? { part } : {}),
    ...(level ? { level } : {}),
  }), [part, level]);

  useEffect(() => {
    async function loadTests() {
      try {
        setLoading(true);
        setError("");
        const res = await toeicApi.getTests(params);
        setTests(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Không thể tải danh sách đề thi. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }

    loadTests();
  }, [params]);

  const filteredTests = useMemo(() => {
    let list = tests;

    if (groupFilter !== "all") {
      const g = groups.find((item) => item.id === groupFilter);
      if (g && g.range) {
        list = list.filter((t) => t.id >= g.range[0] && t.id <= g.range[1]);
      }
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          (t.description && t.description.toLowerCase().includes(term))
      );
    }

    return list;
  }, [tests, searchTerm, groupFilter]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="page-shell flex-grow-1">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1 rounded-pill small fw-bold mb-2">
                <span>📝</span>
                <span>50 ĐỀ LUYỆN TOEIC READING</span>
                <span>•</span>
                <span className="text-secondary fw-normal">Part 5, 6, 7 có bấm giờ & giải thích</span>
              </div>
              <h2 className="fw-bold display-6 mb-1">Kho Đề Thi & Luyện Tập TOEIC Reading</h2>
              <p className="text-muted mb-0">
                50 đề luyện tập Reading bám sát trọn vẹn 50 bài học: gồm Part 5 (hoàn thành câu), Part 6 (điền đoạn văn), Part 7 (đọc hiểu), có bấm giờ và xem đáp án giải thích chi tiết.
              </p>
            </div>
            <Link to="/vocabulary" className="btn btn-warning btn-sm rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-1.5 shadow-sm">
              <span>🧠</span> Ôn Từ Vựng Trước Khi Thi
            </Link>
          </div>

          {/* NHÓM BỘ LỌC ĐỀ 1-50 THEO CỤM */}
          <div className="mb-4 d-flex flex-wrap gap-2">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                  groupFilter === g.id
                    ? "btn-primary shadow-sm"
                    : "btn-outline-secondary bg-white"
                }`}
                onClick={() => setGroupFilter(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* THANH TÌM KIẾM & BỘ LỌC */}
          <div className="soft-card p-4 mb-4">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label fw-bold">Tìm kiếm đề thi</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên đề thi, bài học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold">Lọc theo Part Reading</label>
                <select className="form-control" value={part} onChange={(e) => setPart(e.target.value)}>
                  <option value="">Tất cả Part (Reading 5, 6, 7)</option>
                  <option value="5">Part 5 (Hoàn thành câu)</option>
                  <option value="6">Part 6 (Điền đoạn văn)</option>
                  <option value="7">Part 7 (Đọc hiểu văn bản)</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold">Lọc theo độ khó</label>
                <select className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="">Tất cả độ khó</option>
                  <option value="Dễ">Dễ (Target 450 - 550)</option>
                  <option value="Trung bình">Trung bình (Target 600 - 750)</option>
                  <option value="Khó">Khó (Target 800+)</option>
                </select>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-light border w-100 py-2"
                  onClick={() => { setPart(""); setLevel(""); setSearchTerm(""); setGroupFilter("all"); }}
                >
                  Xóa lọc
                </button>
              </div>
            </div>
          </div>

          {loading && <div className="alert alert-info rounded-4 text-center">Đang tải danh sách 50 đề luyện thi TOEIC Reading...</div>}
          {error && <div className="alert alert-danger rounded-4">{error}</div>}

          {!loading && !error && (
            <div className="row g-4">
              {filteredTests.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-warning rounded-4 text-center py-4">
                    Không có đề thi nào phù hợp với điều kiện tìm kiếm của bạn.
                  </div>
                </div>
              ) : filteredTests.map((test) => (
                <div className="col-lg-4 col-md-6" key={test.id}>
                  <div className="course-card soft-card p-4 h-100 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                      <div className="feature-icon">🧾</div>
                      <span className={`badge rounded-pill ${
                        test.level === "Khó"
                          ? "text-bg-danger"
                          : test.level === "Trung bình"
                          ? "text-bg-warning"
                          : "text-bg-success"
                      }`}>
                        {test.level}
                      </span>
                    </div>

                    <h5 className="fw-bold mb-2">{test.title}</h5>
                    <p className="text-muted flex-grow-1 small">{test.description}</p>

                    <div className="toeic-meta mb-3 p-3 bg-light rounded-3">
                      <div className="d-flex justify-content-between">
                        <span>⏱ Thời lượng:</span>
                        <b>{test.duration} phút</b>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>❓ Số câu hỏi:</span>
                        <b>{test.totalQuestions} câu</b>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>📌 Cấu trúc:</span>
                        <b>Part 5, Part 6, Part 7</b>
                      </div>
                    </div>

                    <div className="mb-3 d-flex flex-wrap gap-2">
                      {test.parts?.map((item) => (
                        <span className="part-chip" key={item.part}>
                          Part {item.part} ({item.questionCount}c)
                        </span>
                      ))}
                    </div>

                    <Link to={`/practice/${test.id}`} className="btn btn-primary w-100 py-3 fw-bold">
                      Bắt đầu làm bài ⏱
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
