import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { quizApi } from "../services/api";

// BỘ TẠO ÂM THANH GAME BẰNG WEB AUDIO API (Không cần tải file ngoài, mượt 100% trên điện thoại)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.15, gainVal = 0.2) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {}
  }

  playWrong() {
    if (!this.enabled) return;
    this.playTone(180, "sawtooth", 0.35, 0.25);
  }

  playStreak() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.2, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } catch {}
  }
}

const sfx = new SoundFX();

export default function Quiz() {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [gameState, setGameState] = useState("lobby"); // "lobby" | "playing" | "completed"
  const [activeTab, setActiveTab] = useState("play"); // "play" | "leaderboard"
  const [mode, setMode] = useState("all"); // "all" | "vocab" | "grammar"
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  // Bộ đếm thời gian mỗi câu (15 giây)
  const QUESTION_TIME = 15;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Bảng xếp hạng
  const [leaderboard, setLeaderboard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [myRank, setMyRank] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Tải bảng xếp hạng từ API
  const fetchLeaderboard = useCallback(async () => {
    try {
      setLbLoading(true);
      const res = await quizApi.getLeaderboard({ limit: 20 });
      setLeaderboard(res.data.data || []);
    } catch (err) {
      console.warn("Lỗi tải bảng xếp hạng:", err.message);
    } finally {
      setLbLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sfx.enabled = next;
  };

  // BẮT ĐẦU VÁN ĐẤU MỚI
  const startNewGame = async () => {
    try {
      setLoadingQuestions(true);
      const res = await quizApi.getQuestions({ count: 10, mode });
      const qList = res.data.data || [];

      if (qList.length === 0) {
        alert("Không thể tải câu hỏi. Vui lòng thử lại!");
        return;
      }

      setQuestions(qList);
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      setCorrectCount(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME);
      startTimeRef.current = Date.now();
      setGameState("playing");
      setActiveTab("play");
    } catch (err) {
      alert("Lỗi tải câu hỏi đấu trường: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ĐIỀU KHIỂN BỘ ĐẾM THỜI GIAN
  useEffect(() => {
    if (gameState === "playing" && !isAnswered && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [gameState, isAnswered, timeLeft, currentIndex]);

  // KHI HẾT GIỜ MÀ CHƯA CHỌN
  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption("__TIMEOUT__");
    setStreak(0);
    sfx.playWrong();
  };

  // KHI NGƯỜI CHƠI CHỌN ĐÁP ÁN
  const handleSelectOption = (optKey) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);

    const currentQ = questions[currentIndex];
    const isCorrect = optKey === currentQ.correctKey;

    setIsAnswered(true);
    setSelectedOption(optKey);

    if (isCorrect) {
      // Tính điểm Quizizz: 100 điểm gốc + thưởng tốc độ tối đa 50 điểm
      const speedBonus = Math.round((timeLeft / QUESTION_TIME) * 50);
      const streakBonus = streak >= 2 ? streak * 20 : 0;
      const points = 100 + speedBonus + streakBonus;

      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newStreak >= 3) {
        sfx.playStreak();
      } else {
        sfx.playCorrect();
      }
    } else {
      setStreak(0);
      sfx.playWrong();
    }
  };

  // CHUYỂN SANG CÂU TIẾP THEO
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME);
    } else {
      finishGame();
    }
  };

  // KẾT THÚC VÁN ĐẤU & LƯU BẢNG XẾP HẠNG
  const finishGame = async () => {
    const elapsedSeconds = Math.round((Date.now() - (startTimeRef.current || Date.now())) / 1000);
    setTotalTimeSpent(elapsedSeconds);
    setGameState("completed");

    const playerName = user?.fullName || user?.email?.split("@")[0] || "Học Viên Vô Danh";
    const finalScore = score;

    // Gửi điểm lên server để lưu vào MySQL Clever Cloud
    try {
      setSavingResult(true);
      const res = await quizApi.submitScore({
        userId: user?.id || 0,
        playerName,
        score: finalScore,
        correctCount,
        totalQuestions: questions.length,
        timeSpent: elapsedSeconds,
        streakMax: maxStreak,
      });

      setMyRank(res.data.rank || 1);
      fetchLeaderboard();
    } catch (err) {
      console.warn("Lỗi lưu điểm Quiz:", err.message);
    } finally {
      setSavingResult(false);
    }
  };

  const currentQ = questions[currentIndex];
  const timePercent = Math.max(0, Math.min(100, (timeLeft / QUESTION_TIME) * 100));

  // 4 Màu sắc phong cách Quizizz
  const optionTheme = [
    { bg: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", shape: "▲", border: "#818cf8" },
    { bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", shape: "◆", border: "#38bdf8" },
    { bg: "linear-gradient(135deg, #059669 0%, #047857 100%)", shape: "●", border: "#34d399" },
    { bg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)", shape: "■", border: "#fbbf24" },
  ];

  return (
    <div className="app-page d-flex flex-column min-vh-100" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", color: "#f8fafc" }}>
      <Navbar />

      <div className="page-shell flex-grow-1 py-4">
        <div className="container">
          {/* TAB CHUYỂN ĐỔI: ĐẤU TRƯỜNG / BẢNG XẾP HẠNG */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 border-bottom border-white border-opacity-10 pb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-3">🎮</span>
              <div>
                <h4 className="fw-bold mb-0 text-white">Đấu Trường TOEIC Quiz</h4>
                <p className="text-white-50 small mb-0">Học nhanh - Phản xạ tốc độ - Vinh danh bảng vàng</p>
              </div>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <button
                className={`btn btn-sm px-3 py-1.5 rounded-pill fw-semibold ${activeTab === "play" ? "btn-warning text-dark" : "btn-outline-light"}`}
                onClick={() => setActiveTab("play")}
              >
                🎯 Vào Thi Đấu
              </button>
              <button
                className={`btn btn-sm px-3 py-1.5 rounded-pill fw-semibold ${activeTab === "leaderboard" ? "btn-warning text-dark" : "btn-outline-light"}`}
                onClick={() => {
                  setActiveTab("leaderboard");
                  fetchLeaderboard();
                }}
              >
                🏆 Bảng Xếp Hạng
              </button>
              <button
                className="btn btn-sm btn-outline-light rounded-circle p-1.5"
                onClick={toggleSound}
                title={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}
                style={{ width: 34, height: 34 }}
              >
                {soundOn ? "🔊" : "🔇"}
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 1. MÀN HÌNH BẢNG XẾP HẠNG (LEADERBOARD) */}
          {/* ======================================================== */}
          {activeTab === "leaderboard" && (
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5" style={{ background: "rgba(30, 41, 59, 0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-center mb-4">
                    <span className="fs-1">🏆</span>
                    <h2 className="fw-bold text-warning mb-1">BẢNG VINH DANH CAO THỦ</h2>
                    <p className="text-white-50 small">Top những học viên đạt điểm cao nhất trong Đấu Trường TOEIC</p>
                  </div>

                  {lbLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-warning mb-3"></div>
                      <p className="text-white-50">Đang tải bảng xếp hạng trực tiếp từ máy chủ...</p>
                    </div>
                  ) : leaderboard.length === 0 ? (
                    <div className="text-center py-5 text-white-50">
                      <p>Chưa có lượt thi đấu nào. Hãy là người đầu tiên ghi danh trên bảng vàng!</p>
                      <button className="btn btn-warning fw-bold px-4 rounded-pill" onClick={() => setActiveTab("play")}>
                        Bắt Đầu Thi Đấu Ngay
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* BỤC VINH DANH TOP 1, 2, 3 */}
                      <div className="row g-3 justify-content-center align-items-end mb-4 pt-3">
                        {/* HẠNG 2 (BẠC) */}
                        {leaderboard[1] && (
                          <div className="col-4 text-center order-1 order-sm-1">
                            <div className="p-3 rounded-4 shadow-sm" style={{ background: "linear-gradient(180deg, rgba(148, 163, 184, 0.25) 0%, rgba(51, 65, 85, 0.4) 100%)", border: "2px solid #94a3b8" }}>
                              <span className="fs-2">🥈</span>
                              <div className="fw-bold text-white small text-truncate mt-1">{leaderboard[1].player_name}</div>
                              <h4 className="fw-bold text-info mb-0">{leaderboard[1].score.toLocaleString()} đ</h4>
                              <span className="badge bg-secondary-subtle text-secondary small rounded-pill mt-1">
                                {leaderboard[1].correct_count}/{leaderboard[1].total_questions}c · ⏱{leaderboard[1].time_spent}s
                              </span>
                            </div>
                          </div>
                        )}

                        {/* HẠNG 1 (VÀNG - CAO NHẤT) */}
                        {leaderboard[0] && (
                          <div className="col-4 text-center order-0 order-sm-0" style={{ transform: "scale(1.08)" }}>
                            <div className="p-3.5 rounded-4 shadow-lg position-relative" style={{ background: "linear-gradient(180deg, rgba(245, 158, 11, 0.35) 0%, rgba(79, 70, 229, 0.4) 100%)", border: "2px solid #f59e0b" }}>
                              <span className="position-absolute top-0 start-50 translate-middle fs-1">👑</span>
                              <span className="fs-1 d-block mt-2">🥇</span>
                              <div className="fw-bold text-warning small text-truncate">{leaderboard[0].player_name}</div>
                              <h3 className="fw-bold text-warning mb-0">{leaderboard[0].score.toLocaleString()} đ</h3>
                              <span className="badge bg-warning text-dark fw-bold rounded-pill mt-1">
                                {leaderboard[0].correct_count}/{leaderboard[0].total_questions}c · ⏱{leaderboard[0].time_spent}s
                              </span>
                            </div>
                          </div>
                        )}

                        {/* HẠNG 3 (ĐỒNG) */}
                        {leaderboard[2] && (
                          <div className="col-4 text-center order-2 order-sm-2">
                            <div className="p-3 rounded-4 shadow-sm" style={{ background: "linear-gradient(180deg, rgba(217, 119, 6, 0.25) 0%, rgba(51, 65, 85, 0.4) 100%)", border: "2px solid #d97706" }}>
                              <span className="fs-2">🥉</span>
                              <div className="fw-bold text-white small text-truncate mt-1">{leaderboard[2].player_name}</div>
                              <h4 className="fw-bold text-warning mb-0">{leaderboard[2].score.toLocaleString()} đ</h4>
                              <span className="badge bg-secondary-subtle text-secondary small rounded-pill mt-1">
                                {leaderboard[2].correct_count}/{leaderboard[2].total_questions}c · ⏱{leaderboard[2].time_spent}s
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* DANH SÁCH BẢNG XẾP HẠNG TỪ TOP 4 TRỞ ĐI */}
                      <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle mb-0" style={{ background: "transparent" }}>
                          <thead>
                            <tr className="text-white-50 border-bottom border-white border-opacity-15">
                              <th style={{ width: 60 }}>Hạng</th>
                              <th>Người chơi</th>
                              <th className="text-center">Số câu đúng</th>
                              <th className="text-center">Chuỗi 🔥</th>
                              <th className="text-center">Thời gian</th>
                              <th className="text-end">Điểm số</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaderboard.map((item) => {
                              const isMe = user && (item.user_id === user.id || item.player_name === (user.fullName || user.email));
                              return (
                                <tr key={item.id} className={isMe ? "table-active border-warning" : ""}>
                                  <td>
                                    {item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : `#${item.rank}`}
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="user-avatar-circle" style={{ width: 26, height: 26, fontSize: "0.75rem" }}>
                                        {item.player_name[0].toUpperCase()}
                                      </div>
                                      <span className="fw-semibold text-white">
                                        {item.player_name} {isMe && <span className="badge bg-warning text-dark ms-1">Bạn</span>}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <span className="badge bg-white bg-opacity-10 text-white rounded-pill">
                                      {item.correct_count}/{item.total_questions}
                                    </span>
                                  </td>
                                  <td className="text-center text-warning fw-bold">
                                    {item.streak_max > 1 ? `x${item.streak_max}` : "-"}
                                  </td>
                                  <td className="text-center text-white-50 small">{item.time_spent}s</td>
                                  <td className="text-end fw-bold text-warning fs-6">
                                    {item.score.toLocaleString()} đ
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-center mt-4 pt-2">
                        <button className="btn btn-warning px-4 py-2.5 rounded-pill fw-bold" onClick={() => setActiveTab("play")}>
                          🎯 Thách Đấu Ngay Bây Giờ
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. MÀN HÌNH SẢNH CHỜ (LOBBY) */}
          {/* ======================================================== */}
          {activeTab === "play" && gameState === "lobby" && (
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ background: "rgba(30, 41, 59, 0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="mb-3">
                    <span className="badge bg-warning bg-opacity-20 text-warning border border-warning px-3 py-1.5 rounded-pill fw-bold">
                      🔥 QUIZIZZ ARENA 2026
                    </span>
                  </div>

                  <h1 className="fw-bold display-6 text-white mb-2">ĐẤU TRƯỜNG TOEIC</h1>
                  <p className="text-white-50 mb-4 fs-6" style={{ maxWidth: 560, margin: "0 auto" }}>
                    Trắc nghiệm tốc độ cao kết hợp giữa <b>Ngữ pháp Part 5</b> và <b>600 Từ vựng Barron's</b>.
                    Trả lời càng nhanh, chuỗi đúng càng dài thì điểm số càng bùng nổ!
                  </p>

                  {/* THẺ NGƯỜI CHƠI */}
                  <div className="p-3 rounded-4 mb-4 mx-auto" style={{ maxWidth: 440, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2.5 text-start">
                        <div className="user-avatar-circle" style={{ width: 38, height: 38 }}>
                          {user ? ((user.fullName || user.email || "H")[0]).toUpperCase() : "👤"}
                        </div>
                        <div>
                          <div className="fw-bold text-white">
                            {user ? (user.fullName || user.email) : "Khách trải nghiệm"}
                          </div>
                          <div className="text-white-50 small">
                            {user ? `Vai trò: ${user.role === "Admin" ? "Quản trị viên" : "Học viên"}` : "Chưa đăng nhập (chơi thử)"}
                          </div>
                        </div>
                      </div>

                      {!user && (
                        <Link to="/login?redirect=/quiz" className="btn btn-warning btn-sm fw-bold rounded-pill px-3">
                          Đăng nhập
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* CHỌN CHẾ ĐỘ CHƠI */}
                  <div className="text-start mb-4" style={{ maxWidth: 520, margin: "0 auto" }}>
                    <label className="fw-bold text-white small mb-2 d-block">Chọn Chế Độ Thi Đấu:</label>
                    <div className="row g-2">
                      <div className="col-4">
                        <button
                          type="button"
                          className={`btn w-100 py-2.5 rounded-3 fw-bold small text-nowrap ${mode === "all" ? "btn-primary" : "btn-outline-light"}`}
                          onClick={() => setMode("all")}
                        >
                          🌟 Tổng Hợp
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className={`btn w-100 py-2.5 rounded-3 fw-bold small text-nowrap ${mode === "vocab" ? "btn-primary" : "btn-outline-light"}`}
                          onClick={() => setMode("vocab")}
                        >
                          🧠 Từ Vựng
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className={`btn w-100 py-2.5 rounded-3 fw-bold small text-nowrap ${mode === "grammar" ? "btn-primary" : "btn-outline-light"}`}
                          onClick={() => setMode("grammar")}
                        >
                          📖 Ngữ Pháp
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* THÔNG TIN LUẬT CHƠI */}
                  <div className="d-flex justify-content-center gap-3 text-white-50 small mb-4 flex-wrap">
                    <span>⏱ 15s / câu hỏi</span>
                    <span>•</span>
                    <span>🎯 10 câu kịch tính</span>
                    <span>•</span>
                    <span>🔥 Thưởng chuỗi đúng</span>
                    <span>•</span>
                    <span>🏆 Lưu bảng xếp hạng</span>
                  </div>

                  {/* NÚT BẮT ĐẦU */}
                  <button
                    className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg"
                    style={{ fontSize: "1.2rem", letterSpacing: 0.5 }}
                    onClick={startNewGame}
                    disabled={loadingQuestions}
                  >
                    {loadingQuestions ? "Đang chuẩn bị đề thi..." : "🚀 VÀO ĐẤU TRƯỜNG NGAY"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. MÀN HÌNH ĐANG THI ĐẤU (PLAYING) */}
          {/* ======================================================== */}
          {activeTab === "play" && gameState === "playing" && currentQ && (
            <div className="row justify-content-center">
              <div className="col-lg-9 col-md-11">
                {/* THANH ĐIỂM SỐ & CHUỖI & THỜI GIAN */}
                <div className="d-flex justify-content-between align-items-center mb-3 text-white">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary px-3 py-1.5 rounded-pill fw-bold">
                      Câu {currentIndex + 1} / {questions.length}
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary px-2.5 py-1.5 rounded-pill small">
                      {currentQ.badge}
                    </span>
                  </div>

                  {/* CHUỖI ĐÚNG (STREAK) */}
                  {streak >= 2 && (
                    <div className="badge bg-danger px-3 py-1.5 rounded-pill fw-bold animate__animated animate__pulse animate__infinite">
                      🔥 Chuỗi x{streak} (+{streak * 20}đ)
                    </div>
                  )}

                  {/* ĐIỂM SỐ HIỆN TẠI */}
                  <div className="text-end">
                    <span className="text-white-50 small">Điểm: </span>
                    <b className="fs-5 text-warning">{score.toLocaleString()}</b>
                  </div>
                </div>

                {/* THANH ĐẾM NGƯỢC THỜI GIAN (15 GIÂY) */}
                <div className="progress mb-4 rounded-pill" style={{ height: 10, background: "rgba(255,255,255,0.15)" }}>
                  <div
                    className="progress-bar rounded-pill"
                    style={{
                      width: `${timePercent}%`,
                      transition: "width 1s linear",
                      background: timeLeft <= 4 ? "#ef4444" : timeLeft <= 8 ? "#f59e0b" : "#3b82f6",
                    }}
                  ></div>
                </div>

                {/* KHUNG CÂU HỎI CHÍNH */}
                <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 mb-4 text-center" style={{ background: "rgba(30, 41, 59, 0.95)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div className="text-white-50 small mb-2 fw-semibold">
                    {currentQ.topic}
                  </div>
                  <h3 className="fw-bold text-white mb-2" style={{ lineHeight: 1.4 }}>
                    {currentQ.prompt}
                  </h3>
                  {currentQ.subPrompt && (
                    <p className="text-warning small mb-0 fw-semibold">{currentQ.subPrompt}</p>
                  )}
                </div>

                {/* 4 THẺ ĐÁP ÁN QUIZIZZ MÀU SẮC */}
                <div className="row g-3 mb-4">
                  {currentQ.options.map((opt, idx) => {
                    const theme = optionTheme[idx % optionTheme.length];
                    const isSelected = selectedOption === opt.key;
                    const isCorrect = opt.key === currentQ.correctKey;

                    let btnStyle = {
                      background: theme.bg,
                      border: `2px solid ${theme.border}`,
                      color: "#ffffff",
                      minHeight: 80,
                    };

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = {
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          border: "3px solid #34d399",
                          color: "#ffffff",
                          transform: "scale(1.02)",
                          boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
                          minHeight: 80,
                        };
                      } else if (isSelected) {
                        btnStyle = {
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                          border: "3px solid #f87171",
                          color: "#ffffff",
                          opacity: 0.8,
                          minHeight: 80,
                        };
                      } else {
                        btnStyle = {
                          background: "rgba(30, 41, 59, 0.5)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.4)",
                          minHeight: 80,
                        };
                      }
                    }

                    return (
                      <div className="col-12 col-md-6" key={opt.key}>
                        <button
                          type="button"
                          className="btn w-100 p-3 rounded-4 d-flex align-items-center gap-3 text-start position-relative shadow transition-all"
                          style={btnStyle}
                          onClick={() => handleSelectOption(opt.key)}
                          disabled={isAnswered}
                        >
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                            style={{
                              width: 36,
                              height: 36,
                              background: "rgba(0,0,0,0.25)",
                              fontSize: "1rem",
                              flexShrink: 0,
                            }}
                          >
                            {opt.key}
                          </div>
                          <span className="fw-bold fs-6 flex-grow-1">{opt.text}</span>
                          {isAnswered && isCorrect && <span className="fs-4">✅</span>}
                          {isAnswered && isSelected && !isCorrect && <span className="fs-4">❌</span>}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* GIẢI THÍCH & NÚT CHUYỂN CÂU */}
                {isAnswered && (
                  <div className="p-3.5 rounded-4 mb-3 d-flex justify-content-between align-items-center flex-wrap gap-3 animate__animated animate__fadeIn" style={{ background: "rgba(15, 23, 42, 0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <div className="flex-grow-1 text-white">
                      <div className="fw-bold mb-1">
                        {selectedOption === currentQ.correctKey ? (
                          <span className="text-success">🎉 Chính xác! (+Điểm tốc độ)</span>
                        ) : selectedOption === "__TIMEOUT__" ? (
                          <span className="text-warning">⏰ Hết thời gian làm bài!</span>
                        ) : (
                          <span className="text-danger">❌ Chưa chính xác!</span>
                        )}
                      </div>
                      <div className="text-white-50 small">{currentQ.explanation}</div>
                    </div>

                    <button className="btn btn-warning px-4 py-2.5 rounded-pill fw-bold text-dark text-nowrap shadow" onClick={handleNextQuestion}>
                      {currentIndex + 1 < questions.length ? "Câu Kế Tiếp ➜" : "Xem Kết Quả 🏆"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. MÀN HÌNH TỔNG KẾT VÁN ĐẤU (COMPLETED) */}
          {/* ======================================================== */}
          {activeTab === "play" && gameState === "completed" && (
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-9">
                <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ background: "rgba(30, 41, 59, 0.95)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span className="fs-1">🎉</span>
                  <h2 className="fw-bold text-warning mb-1">HOÀN THÀNH ĐẤU TRƯỜNG!</h2>
                  <p className="text-white-50 small mb-4">Bạn đã xuất sắc vượt qua 10 câu hỏi thử thách tốc độ</p>

                  {/* THẺ ĐIỂM SỐ TO */}
                  <div className="p-4 rounded-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(245, 158, 11, 0.2) 100%)", border: "2px solid rgba(245, 158, 11, 0.4)" }}>
                    <div className="text-white-50 small text-uppercase fw-semibold mb-1">Tổng Điểm Ghi Được</div>
                    <h1 className="fw-bold display-4 text-warning mb-2">{score.toLocaleString()}</h1>
                    {myRank && (
                      <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold">
                        🏅 Vị trí hiện tại: Hạng #{myRank} trên Bảng Xếp Hạng!
                      </span>
                    )}
                  </div>

                  {/* 3 THỐNG KÊ CHI TIẾT */}
                  <div className="row g-2 mb-4">
                    <div className="col-4">
                      <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="text-white-50 small">Số câu đúng</div>
                        <h4 className="fw-bold text-success mb-0">{correctCount}/10</h4>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="text-white-50 small">Chuỗi cao nhất</div>
                        <h4 className="fw-bold text-warning mb-0">x{maxStreak}</h4>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="text-white-50 small">Thời gian</div>
                        <h4 className="fw-bold text-info mb-0">{totalTimeSpent}s</h4>
                      </div>
                    </div>
                  </div>

                  {savingResult && (
                    <div className="text-center text-white-50 small mb-3">
                      <div className="spinner-border spinner-border-sm text-warning me-2"></div>
                      Đang đồng bộ kết quả lên Bảng Xếp Hạng Clever Cloud...
                    </div>
                  )}

                  {/* CÁC NÚT ĐIỀU HƯỚNG */}
                  <div className="d-grid gap-2">
                    <button className="btn btn-warning py-3 rounded-pill fw-bold" onClick={startNewGame}>
                      🔄 Chơi Lại Ván Mới
                    </button>
                    <button
                      className="btn btn-outline-light py-2.5 rounded-pill fw-semibold"
                      onClick={() => {
                        setActiveTab("leaderboard");
                        fetchLeaderboard();
                      }}
                    >
                      🏆 Xem Bảng Vinh Danh
                    </button>
                    <Link to="/" className="btn btn-link text-white-50 text-decoration-none small mt-1">
                      ← Về Trang Chủ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
