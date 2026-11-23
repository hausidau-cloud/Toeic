import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { quizApi } from "../services/api";

// BỘ TẠO ÂM THANH GAME WEB AUDIO API (Hoạt động mượt mà không cần tải file ngoài)
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

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880, 1108.73, 1318.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.22, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
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

  const myName = user?.fullName || user?.email?.split("@")[0] || "Học Viên Vô Danh";

  // Tab chính: "solo" (Đấu đơn phá kỷ lục) | "room" (Thách đấu 2-3 người) | "leaderboard" (Bảng vàng)
  const [activeTab, setActiveTab] = useState("solo");
  const [soundOn, setSoundOn] = useState(true);

  // Kỷ lục cao nhất hiện tại (All-time Record)
  const [recordHolder, setRecordHolder] = useState(null);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Trạng thái chơi chung: "lobby" | "playing" | "completed"
  const [gameState, setGameState] = useState("lobby");
  const [quizMode, setQuizMode] = useState("all"); // "all" | "vocab" | "grammar"
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Bộ đếm thời gian mỗi câu (15s)
  const QUESTION_MAX_TIME = 15;
  const [timeLeft, setTimeLeft] = useState(QUESTION_MAX_TIME);
  const timerRef = useRef(null);
  const questionStartTimeRef = useRef(Date.now());
  const gameStartTimeRef = useRef(Date.now());
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Bảng xếp hạng chung
  const [leaderboard, setLeaderboard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [myRank, setMyRank] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // PHÒNG THÁCH ĐẤU (MULTIPLAYER)
  const [roomState, setRoomState] = useState("menu"); // "menu" | "waiting" | "battle_results"
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomRankings, setRoomRankings] = useState([]);
  const roomPollRef = useRef(null);

  // Tải kỷ lục điểm cao nhất
  const fetchRecord = useCallback(async () => {
    try {
      const res = await quizApi.getRecord();
      setRecordHolder(res.data.data || null);
    } catch (err) {
      console.warn("Lỗi tải kỷ lục:", err.message);
    }
  }, []);

  // Tải bảng xếp hạng chung
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
    fetchRecord();
    fetchLeaderboard();
  }, [fetchRecord, fetchLeaderboard]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sfx.enabled = next;
  };

  // ========================================================
  // ĐẤU ĐƠN PHÁ KỶ LỤC (SOLO MODE)
  // ========================================================
  const startSoloGame = async () => {
    try {
      setLoadingQuestions(true);
      const res = await quizApi.getQuestions({ count: 10, mode: quizMode });
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
      setTimeLeft(QUESTION_MAX_TIME);
      setIsNewRecord(false);
      gameStartTimeRef.current = Date.now();
      questionStartTimeRef.current = Date.now();
      setGameState("playing");
      setCurrentRoom(null);
    } catch (err) {
      alert("Lỗi tải đề thi: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ĐIỀU KHIỂN ĐỒNG HỒ ĐẾM NGƯỢC 15s MỖI CÂU
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

  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption("__TIMEOUT__");
    setStreak(0);
    sfx.playWrong();
  };

  // CHỌN ĐÁP ÁN: 1000 ĐIỂM TRỪ THỜI GIAN
  const handleSelectOption = (optKey) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);

    const timeSpentOnQ = Math.max(0.5, (Date.now() - questionStartTimeRef.current) / 1000);
    const currentQ = questions[currentIndex];
    const isCorrect = optKey === currentQ.correctKey;

    setIsAnswered(true);
    setSelectedOption(optKey);

    if (isCorrect) {
      // Công thức: 1000 điểm trừ đi thời gian (mỗi giây dùng trừ 55 điểm)
      // Ví dụ: 1s = 945đ, 4s = 780đ, 12s = 340đ
      const timeDeduction = Math.round(timeSpentOnQ * 55);
      const baseEarned = Math.max(100, 1000 - timeDeduction);

      // Thưởng chuỗi (Streak)
      const streakBonus = streak >= 5 ? 200 : streak >= 3 ? 100 : streak >= 1 ? 50 : 0;
      const questionPoints = baseEarned + streakBonus;

      setScore((prev) => prev + questionPoints);
      setCorrectCount((prev) => prev + 1);

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);

      if (nextStreak >= 3) {
        sfx.playFanfare();
      } else {
        sfx.playCorrect();
      }
    } else {
      setStreak(0);
      sfx.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_MAX_TIME);
      questionStartTimeRef.current = Date.now();
    } else {
      finishGame();
    }
  };

  // KẾT THÚC BÀI THI (ĐẤU ĐƠN HOẶC THÁCH ĐẤU)
  const finishGame = async () => {
    const elapsedSeconds = Math.round((Date.now() - gameStartTimeRef.current) / 1000);
    setTotalTimeSpent(elapsedSeconds);
    setGameState("completed");

    // Kiểm tra xem có phá kỷ lục không
    if (recordHolder && score > (recordHolder.score || 0)) {
      setIsNewRecord(true);
      sfx.playFanfare();
    }

    try {
      setSavingResult(true);

      if (currentRoom) {
        // Nộp điểm phòng thách đấu
        const res = await quizApi.submitRoom(currentRoom.roomCode, {
          playerName: myName,
          score,
          correctCount,
          timeSpent: elapsedSeconds,
          streakMax: maxStreak,
          userId: user?.id || 0,
        });
        setRoomRankings(res.data.rankings || []);
      } else {
        // Nộp điểm đấu đơn bảng xếp hạng
        const res = await quizApi.submitScore({
          userId: user?.id || 0,
          playerName: myName,
          score,
          correctCount,
          totalQuestions: questions.length,
          timeSpent: elapsedSeconds,
          streakMax: maxStreak,
        });
        setMyRank(res.data.rank || 1);
        fetchLeaderboard();
        fetchRecord();
      }
    } catch (err) {
      console.warn("Lỗi lưu điểm:", err.message);
    } finally {
      setSavingResult(false);
    }
  };

  // ========================================================
  // PHÒNG THÁCH ĐẤU (MULTIPLAYER 2 - 3 NGƯỜI TRỞ LÊN)
  // ========================================================
  const createNewRoom = async () => {
    try {
      setRoomLoading(true);
      const res = await quizApi.createRoom({
        hostUserId: user?.id || 0,
        hostName: myName,
        mode: quizMode,
      });

      setCurrentRoom({
        roomCode: res.data.roomCode,
        id: res.data.roomId,
        hostName: myName,
        isHost: true,
        players: [{ player_name: myName, score: 0 }],
      });
      setRoomState("waiting");
      pollRoomStatus(res.data.roomCode);
    } catch (err) {
      alert("Lỗi tạo phòng: " + (err.response?.data?.message || err.message));
    } finally {
      setRoomLoading(false);
    }
  };

  const joinExistingRoom = async (codeToJoin) => {
    const code = (codeToJoin || roomCodeInput).trim();
    if (!code) {
      alert("Vui lòng nhập mã PIN phòng gồm 6 số!");
      return;
    }

    try {
      setRoomLoading(true);
      await quizApi.joinRoom({
        roomCode: code,
        playerName: myName,
        userId: user?.id || 0,
      });

      const res = await quizApi.getRoom(code);
      const room = res.data.room;

      setCurrentRoom({
        ...room,
        isHost: room.hostName === myName,
      });
      setRoomState("waiting");
      pollRoomStatus(code);
    } catch (err) {
      alert(err.response?.data?.message || "Không thể tham gia phòng này!");
    } finally {
      setRoomLoading(false);
    }
  };

  // Lặp tải trạng thái phòng chờ (Polling)
  const pollRoomStatus = (code) => {
    if (roomPollRef.current) clearInterval(roomPollRef.current);

    roomPollRef.current = setInterval(async () => {
      try {
        const res = await quizApi.getRoom(code);
        const rData = res.data.room;

        setCurrentRoom((prev) => ({
          ...prev,
          ...rData,
          isHost: rData.hostName === myName,
        }));

        // Nếu chủ phòng đã bấm bắt đầu và câu hỏi đã sẵn sàng
        if (rData.status === "in_progress" && rData.questions && rData.questions.length > 0) {
          clearInterval(roomPollRef.current);
          setQuestions(rData.questions);
          setCurrentIndex(0);
          setScore(0);
          setStreak(0);
          setMaxStreak(0);
          setCorrectCount(0);
          setSelectedOption(null);
          setIsAnswered(false);
          setTimeLeft(QUESTION_MAX_TIME);
          gameStartTimeRef.current = Date.now();
          questionStartTimeRef.current = Date.now();
          setGameState("playing");
        }
      } catch (err) {
        clearInterval(roomPollRef.current);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (roomPollRef.current) clearInterval(roomPollRef.current);
    };
  }, []);

  // THÊM BẠN CHƠI THỬ (BOT) ĐỂ ĐỦ 2 - 3 NGƯỜI BẮT ĐẦU NGAY
  const handleAddBot = async () => {
    if (!currentRoom) return;
    try {
      const res = await quizApi.addBot(currentRoom.roomCode);
      const updated = await quizApi.getRoom(currentRoom.roomCode);
      setCurrentRoom((prev) => ({ ...prev, ...updated.data.room }));
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi thêm người chơi");
    }
  };

  // CHỦ PHÒNG BẤM BẮT ĐẦU TRANH TÀI
  const handleStartBattle = async () => {
    if (!currentRoom) return;

    // KIỂM TRA ĐIỀU KIỆN: 2 - 3 NGƯỜI TRỞ LÊN
    if ((currentRoom.playerCount || currentRoom.players?.length || 0) < 2) {
      alert("⚠️ Phòng thách đấu cần tối thiểu từ 2 - 3 người chơi trở lên để thi đấu! Bạn có thể bấm 'Mời bạn chơi thử' để đủ người ngay lập tức.");
      return;
    }

    try {
      await quizApi.startRoom(currentRoom.roomCode);
      const updated = await quizApi.getRoom(currentRoom.roomCode);
      if (updated.data.room.questions) {
        setQuestions(updated.data.room.questions);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setMaxStreak(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setTimeLeft(QUESTION_MAX_TIME);
        gameStartTimeRef.current = Date.now();
        questionStartTimeRef.current = Date.now();
        setGameState("playing");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi bắt đầu trận thách đấu");
    }
  };

  const currentQ = questions[currentIndex];
  const timePercent = Math.max(0, Math.min(100, (timeLeft / QUESTION_MAX_TIME) * 100));

  const optionTheme = [
    { bg: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", border: "#818cf8" },
    { bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", border: "#38bdf8" },
    { bg: "linear-gradient(135deg, #059669 0%, #047857 100%)", border: "#34d399" },
    { bg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)", border: "#fbbf24" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#0a0f1d", color: "#f8fafc" }}>
      <Navbar />

      <main className="quiz-arena-shell flex-grow-1">
        <div className="container">
          {/* HEADER CHÍNH CỦA ĐẤU TRƯỜNG */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom border-white border-opacity-10">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                }}
              >
                <span className="fs-3">🎮</span>
              </div>
              <div>
                <h3 className="fw-bold text-white mb-0" style={{ letterSpacing: "-0.5px" }}>
                  Đấu Trường <span style={{ color: "#fbbf24" }}>TOEIC Quiz</span>
                </h3>
                <p className="text-white-50 small mb-0">1.000 điểm mỗi câu · Phản xạ thần tốc · Thách đấu phá kỷ lục</p>
              </div>
            </div>

            <div className="d-flex gap-2 align-items-center flex-wrap">
              <div className="quiz-nav-capsule">
                <button
                  className={`quiz-tab-btn ${activeTab === "solo" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("solo");
                    setGameState("lobby");
                  }}
                >
                  👤 Đấu Đơn
                </button>

                <button
                  className={`quiz-tab-btn ${activeTab === "room" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("room");
                    setGameState("lobby");
                    setRoomState("menu");
                  }}
                >
                  ⚔️ Thách Đấu
                </button>

                <button
                  className={`quiz-tab-btn ${activeTab === "leaderboard" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("leaderboard");
                    fetchLeaderboard();
                  }}
                >
                  🏆 Bảng Kỷ Lục
                </button>
              </div>

              <button
                className="btn btn-sm btn-outline-light rounded-circle p-1.5 text-white shadow-sm"
                onClick={toggleSound}
                title={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}
                style={{ width: 38, height: 38, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                {soundOn ? "🔊" : "🔇"}
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 1. TAB BẢNG XẾP HẠNG & KỶ LỤC TOÀN SERVER */}
          {/* ======================================================== */}
          {activeTab === "leaderboard" && (
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card quiz-card-dark rounded-4 p-4 p-md-5">
                  <div className="text-center mb-4">
                    <span className="fs-1">🏆</span>
                    <h2 className="fw-bold text-warning mb-1">BẢNG KỶ LỤC CAO THỦ</h2>
                    <p className="text-white-50 small">Top những học viên đạt điểm số kỷ lục trong Đấu Trường TOEIC</p>
                  </div>

                  {/* BỤC VINH DANH TOP 1, 2, 3 */}
                  <div className="row g-3 justify-content-center align-items-end mb-4 pt-3">
                    {leaderboard[1] && (
                      <div className="col-4 text-center">
                        <div className="p-3 rounded-4 quiz-podium-2 shadow-sm">
                          <span className="fs-2">🥈</span>
                          <div className="fw-bold text-white small text-truncate mt-1">{leaderboard[1].player_name}</div>
                          <h4 className="fw-bold text-info mb-0">{leaderboard[1].score.toLocaleString()} đ</h4>
                          <span className="badge bg-secondary-subtle text-white small rounded-pill mt-1">
                            {leaderboard[1].correct_count}/{leaderboard[1].total_questions}c · ⏱{leaderboard[1].time_spent}s
                          </span>
                        </div>
                      </div>
                    )}

                    {leaderboard[0] && (
                      <div className="col-4 text-center" style={{ transform: "scale(1.08)" }}>
                        <div className="p-3.5 rounded-4 quiz-podium-1 shadow-lg position-relative">
                          <span className="position-absolute top-0 start-50 translate-middle fs-2">👑</span>
                          <span className="fs-1 d-block mt-2">🥇</span>
                          <div className="fw-bold text-warning small text-truncate">{leaderboard[0].player_name}</div>
                          <h3 className="fw-bold text-warning mb-0">{leaderboard[0].score.toLocaleString()} đ</h3>
                          <span className="badge bg-warning text-dark fw-bold rounded-pill mt-1">
                            {leaderboard[0].correct_count}/{leaderboard[0].total_questions}c · ⏱{leaderboard[0].time_spent}s
                          </span>
                        </div>
                      </div>
                    )}

                    {leaderboard[2] && (
                      <div className="col-4 text-center">
                        <div className="p-3 rounded-4 quiz-podium-3 shadow-sm">
                          <span className="fs-2">🥉</span>
                          <div className="fw-bold text-white small text-truncate mt-1">{leaderboard[2].player_name}</div>
                          <h4 className="fw-bold text-warning mb-0">{leaderboard[2].score.toLocaleString()} đ</h4>
                          <span className="badge bg-secondary-subtle text-white small rounded-pill mt-1">
                            {leaderboard[2].correct_count}/{leaderboard[2].total_questions}c · ⏱{leaderboard[2].time_spent}s
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BẢNG TOP DANH SÁCH */}
                  <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle mb-0" style={{ background: "transparent" }}>
                      <thead>
                        <tr className="text-white-50 border-bottom border-white border-opacity-15">
                          <th style={{ width: 60 }}>Hạng</th>
                          <th>Học viên</th>
                          <th className="text-center">Số câu đúng</th>
                          <th className="text-center">Chuỗi 🔥</th>
                          <th className="text-center">Thời gian</th>
                          <th className="text-end">Điểm Kỷ Lục</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((item) => (
                          <tr key={item.id}>
                            <td>{item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : `#${item.rank}`}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="user-avatar-circle" style={{ width: 26, height: 26, fontSize: "0.75rem" }}>
                                  {item.player_name[0].toUpperCase()}
                                </div>
                                <span className="fw-semibold text-white">{item.player_name}</span>
                              </div>
                            </td>
                            <td className="text-center">
                              <span className="badge bg-white bg-opacity-10 text-white rounded-pill">
                                {item.correct_count}/{item.total_questions}
                              </span>
                            </td>
                            <td className="text-center text-warning fw-bold">{item.streak_max > 1 ? `x${item.streak_max}` : "-"}</td>
                            <td className="text-center text-white-50 small">{item.time_spent}s</td>
                            <td className="text-end fw-bold text-warning fs-6">{item.score.toLocaleString()} đ</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. TAB ĐẤU ĐƠN PHÁ KỶ LỤC (SOLO MODE) */}
          {/* ======================================================== */}
          {activeTab === "solo" && gameState === "lobby" && (
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="card quiz-card-dark p-4 p-md-5 text-center">
                  <div className="mb-3">
                    <span className="quiz-glow-pill">
                      ⚡ THỬ THÁCH ĐẤU ĐƠN: 1.000 ĐIỂM / CÂU
                    </span>
                  </div>

                  <h2 className="fw-bold display-6 text-white mb-2" style={{ letterSpacing: "-0.5px" }}>
                    ĐẤU ĐƠN PHÁ KỶ LỤC
                  </h2>
                  <p className="text-white-50 mb-4" style={{ maxWidth: 540, margin: "0 auto", fontSize: "0.95rem" }}>
                    Mỗi câu hỏi có giá trị <b>1.000 điểm</b>. Thời gian suy nghĩ càng nhanh thì điểm nhận được càng cao!
                    Hãy chinh phục 10 câu để xác lập kỷ lục mới toàn server.
                  </p>

                  {/* THẺ VINH DANH NGƯỜI ĐANG NẮM GIỮ KỶ LỤC CAO NHẤT */}
                  {recordHolder && recordHolder.score > 0 && (
                    <div className="quiz-record-banner p-3.5 p-md-4 mb-4 text-start">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: 52,
                              height: 52,
                              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.35), rgba(217, 119, 6, 0.45))",
                              border: "1.5px solid #fbbf24",
                              boxShadow: "0 0 20px rgba(245, 158, 11, 0.45)",
                            }}
                          >
                            <span className="fs-2">👑</span>
                          </div>
                          <div>
                            <div className="text-warning small text-uppercase fw-bold" style={{ letterSpacing: "0.5px" }}>
                              KỶ LỤC TOÀN SERVER ĐANG THỐNG TRỊ
                            </div>
                            <div className="fw-bold text-white fs-5">{recordHolder.player_name}</div>
                            <div className="text-white-50 small mt-0.5">
                              🎯 Đúng: <b className="text-white">{recordHolder.correct_count}/{recordHolder.total_questions}</b> câu · ⏱ Thời gian: <b className="text-white">{recordHolder.time_spent}s</b>
                            </div>
                          </div>
                        </div>

                        <div className="text-end ms-auto ms-sm-0">
                          <div className="text-white-50 small text-uppercase fw-semibold" style={{ fontSize: "0.75rem" }}>Điểm Kỷ Lục</div>
                          <div className="quiz-record-score">{recordHolder.score.toLocaleString()} đ</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* THẺ HỌC VIÊN HIỆN TẠI */}
                  <div className="quiz-user-card mb-4 mx-auto text-start" style={{ maxWidth: 480 }}>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="user-avatar-circle" style={{ width: 42, height: 42, fontSize: "1.1rem" }}>
                          {(myName[0] || "H").toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold text-white fs-6">{myName}</div>
                          <div className="text-white-50 small">
                            {user ? `Học viên: ${user.email}` : "Chơi ở chế độ khách (Chưa đăng nhập)"}
                          </div>
                        </div>
                      </div>

                      {!user ? (
                        <Link to="/login?redirect=/quiz" className="btn btn-warning btn-sm fw-bold rounded-pill px-3 shadow-sm text-dark">
                          Đăng nhập
                        </Link>
                      ) : (
                        <span className="badge bg-success bg-opacity-20 text-success border border-success rounded-pill px-2.5 py-1 small">
                          ● Đã sẵn sàng
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CHỌN CHỦ ĐỀ CÂU HỎI */}
                  <div className="text-start mb-4" style={{ maxWidth: 480, margin: "0 auto" }}>
                    <label className="fw-bold text-white small mb-2 d-block" style={{ letterSpacing: "0.3px" }}>
                      Chọn Chủ Đề Câu Hỏi:
                    </label>
                    <div className="row g-2">
                      <div className="col-4">
                        <button
                          type="button"
                          className={`quiz-mode-pill ${quizMode === "all" ? "active" : ""}`}
                          onClick={() => setQuizMode("all")}
                        >
                          <span>🌟</span>
                          <span>Tổng Hợp</span>
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className={`quiz-mode-pill ${quizMode === "vocab" ? "active" : ""}`}
                          onClick={() => setQuizMode("vocab")}
                        >
                          <span>🧠</span>
                          <span>Từ Vựng</span>
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          type="button"
                          className={`quiz-mode-pill ${quizMode === "grammar" ? "active" : ""}`}
                          onClick={() => setQuizMode("grammar")}
                        >
                          <span>📖</span>
                          <span>Ngữ Pháp</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CÔNG THỨC TÍNH ĐIỂM RÕ RÀNG */}
                  <div className="quiz-explainer-box mb-4 mx-auto text-start" style={{ maxWidth: 480 }}>
                    <div className="d-flex align-items-start gap-2">
                      <span className="fs-5">💡</span>
                      <div>
                        <b>Quy tắc tính điểm tốc độ:</b> Mỗi câu tối đa <b>1.000 điểm</b>. Trả lời càng nhanh càng ít bị trừ điểm thời gian. Đúng liên tiếp được cộng thêm điểm chuỗi combo!
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      className="quiz-cta-btn"
                      onClick={startSoloGame}
                      disabled={loadingQuestions}
                    >
                      <span>🚀</span>
                      <span>{loadingQuestions ? "Đang chuẩn bị đề thi..." : "VÀO THI ĐẤU PHÁ KỶ LỤC"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. TAB PHÒNG THÁCH ĐẤU NHIỀU NGƯỜI (2 - 3 NGƯỜI TRỞ LÊN) */}
          {/* ======================================================== */}
          {activeTab === "room" && gameState === "lobby" && (
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="card quiz-card-dark p-4 p-md-5">
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <span className="quiz-glow-pill" style={{ borderColor: "rgba(239, 68, 68, 0.6)", background: "linear-gradient(90deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.15))", color: "#f87171" }}>
                        ⚔️ CHẾ ĐỘ THÁCH ĐẤU ĐỐI ĐẦU
                      </span>
                    </div>
                    <h2 className="fw-bold text-white mb-2" style={{ letterSpacing: "-0.5px" }}>PHÒNG THÁCH ĐẤU TRỰC TIẾP</h2>
                    <p className="text-white-50 small mb-0" style={{ maxWidth: 500, margin: "0 auto" }}>
                      Yêu cầu <b>từ 2 đến 3 người chơi trở lên</b> cùng tham gia giải chung 1 bộ đề để tranh chức vô địch!
                    </p>
                  </div>

                  {roomState === "menu" && (
                    <div className="row g-4 justify-content-center">
                      {/* TẠO PHÒNG MỚI */}
                      <div className="col-md-6">
                        <div className="p-4 rounded-4 text-center h-100 d-flex flex-column justify-content-between" style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.12)", transition: "all 0.25s ease" }}>
                          <div>
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 56, height: 56, background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.4)" }}>
                              <span className="fs-2">👑</span>
                            </div>
                            <h4 className="fw-bold text-white mb-2">Tạo Phòng Mới</h4>
                            <p className="text-white-50 small mb-4">
                              Tạo phòng với mã PIN 6 số và mời từ 2 - 3 bạn bè cùng tham gia so tài phản xạ.
                            </p>
                          </div>
                          <button
                            className="quiz-cta-btn w-100 py-3"
                            style={{ fontSize: "1rem" }}
                            onClick={createNewRoom}
                            disabled={roomLoading}
                          >
                            <span>👑</span>
                            <span>{roomLoading ? "Đang tạo phòng..." : "Tạo Phòng Thi Đấu"}</span>
                          </button>
                        </div>
                      </div>

                      {/* VÀO PHÒNG BẰNG MÃ PIN */}
                      <div className="col-md-6">
                        <div className="p-4 rounded-4 text-center h-100 d-flex flex-column justify-content-between" style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.12)", transition: "all 0.25s ease" }}>
                          <div>
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 56, height: 56, background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.4)" }}>
                              <span className="fs-2">🔑</span>
                            </div>
                            <h4 className="fw-bold text-white mb-2">Vào Phòng</h4>
                            <p className="text-white-50 small mb-3">
                              Nhập mã PIN 6 số do bạn bè gửi để vào phòng thách đấu.
                            </p>
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="Nhập mã PIN (VD: 849201)"
                              className="form-control text-center fw-bold fs-4 mb-3 bg-dark text-warning border-secondary"
                              style={{ letterSpacing: "4px", borderRadius: 14 }}
                              value={roomCodeInput}
                              onChange={(e) => setRoomCodeInput(e.target.value)}
                            />
                          </div>
                          <button
                            className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-lg"
                            style={{ background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)", border: 0, fontSize: "1rem" }}
                            onClick={() => joinExistingRoom()}
                            disabled={roomLoading}
                          >
                            <span>🔑</span>
                            <span className="ms-2">{roomLoading ? "Đang vào..." : "Tham Gia Phòng"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PHÒNG CHỜ (WAITING ROOM) */}
                  {roomState === "waiting" && currentRoom && (
                    <div className="text-center">
                      <div className="p-4 rounded-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)", border: "1.5px solid #f59e0b", boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.2)" }}>
                        <div className="text-warning small text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>MÃ PIN PHÒNG THÁCH ĐẤU</div>
                        <h1 className="fw-bold display-3 text-warning my-2" style={{ letterSpacing: "6px", fontFamily: "monospace", textShadow: "0 0 25px rgba(245, 158, 11, 0.5)" }}>
                          {currentRoom.roomCode}
                        </h1>
                        <p className="text-white-50 small mb-0">Chia sẻ mã PIN này cho bạn bè để cùng vào phòng!</p>
                      </div>

                      <div className="mb-4 text-start">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold text-white small">
                            Danh Sách Người Chơi ({currentRoom.players?.length || 1} người):
                          </span>
                          <span className={`badge rounded-pill ${((currentRoom.players?.length || 1) >= 2) ? "bg-success" : "bg-danger"}`}>
                            {((currentRoom.players?.length || 1) >= 2) ? "✓ Đủ điều kiện bắt đầu" : "Cần tối thiểu 2-3 người"}
                          </span>
                        </div>

                        <div className="row g-2 mb-3">
                          {currentRoom.players?.map((p, idx) => (
                            <div className="col-12 col-sm-6" key={idx}>
                              <div className="p-2.5 rounded-3 d-flex align-items-center gap-2.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                                <div className="user-avatar-circle" style={{ width: 34, height: 34, fontSize: "0.85rem" }}>
                                  {(p.player_name[0] || "U").toUpperCase()}
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <div className="fw-bold text-white small text-truncate">
                                    {p.player_name} {p.player_name === myName && "(Bạn)"}
                                  </div>
                                  <div className="text-success small" style={{ fontSize: "0.72rem" }}>
                                    ● Sẵn sàng thi đấu
                                  </div>
                                </div>
                                {idx === 0 && <span className="badge bg-warning text-dark small">Chủ phòng</span>}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* ĐIỀU KIỆN 2 - 3 NGƯỜI CHƠI TRỞ LÊN */}
                        {((currentRoom.players?.length || 1) < 2) && (
                          <div className="alert alert-warning border-0 rounded-3 small py-2.5 d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <span>
                              🔒 <b>Quy định thách đấu:</b> Cần <b>từ 2 đến 3 người trở lên</b> mới có thể bắt đầu trận đấu.
                            </span>
                            <button className="btn btn-outline-dark btn-sm py-1 px-3 fw-bold rounded-pill" onClick={handleAddBot}>
                              🤖 Mời bạn chơi thử (Bot)
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="d-flex gap-3 justify-content-center align-items-center flex-wrap">
                        {currentRoom.isHost ? (
                          <button
                            className="quiz-cta-btn"
                            onClick={handleStartBattle}
                            disabled={(currentRoom.players?.length || 1) < 2}
                          >
                            <span>⚔️</span>
                            <span>BẮT ĐẦU TRANH TÀI NGAY</span>
                          </button>
                        ) : (
                          <div className="text-white-50 small p-3 rounded-pill border border-white border-opacity-15">
                            ⏳ Đang chờ chủ phòng ({currentRoom.hostName}) bấm bắt đầu trận đấu...
                          </div>
                        )}

                        <button className="btn btn-outline-light px-4 py-3 rounded-pill text-white fw-bold" onClick={() => setRoomState("menu")}>
                          Rời Phòng
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. MÀN HÌNH ĐANG LÀM BÀI (PLAYING - ÁP DỤNG CHO CẢ 2 CHẾ ĐỘ) */}
          {/* ======================================================== */}
          {gameState === "playing" && currentQ && (
            <div className="row justify-content-center">
              <div className="col-lg-9 col-md-11">
                {/* THANH ĐIỂM SỐ, THỜI GIAN & CHUỖI */}
                <div className="d-flex justify-content-between align-items-center mb-2.5 text-white">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary px-3 py-1.5 rounded-pill fw-bold">
                      Câu {currentIndex + 1} / {questions.length}
                    </span>
                    <span className="badge bg-secondary-subtle text-white px-2.5 py-1.5 rounded-pill small">
                      {currentQ.badge}
                    </span>
                  </div>

                  {streak >= 2 && (
                    <div className="badge bg-danger px-3 py-1.5 rounded-pill fw-bold">
                      🔥 Chuỗi x{streak} (+{streak >= 5 ? 200 : streak >= 3 ? 100 : 50}đ)
                    </div>
                  )}

                  <div className="text-end">
                    <span className="text-white-50 small">Điểm tích lũy: </span>
                    <b className="fs-5 text-warning">{score.toLocaleString()} đ</b>
                  </div>
                </div>

                {/* THANH ĐẾM NGƯỢC 15s */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="progress flex-grow-1 rounded-pill" style={{ height: 12, background: "rgba(255,255,255,0.15)" }}>
                    <div
                      className="progress-bar rounded-pill"
                      style={{
                        width: `${timePercent}%`,
                        transition: "width 1s linear",
                        background: timeLeft <= 4 ? "#ef4444" : timeLeft <= 8 ? "#f59e0b" : "#3b82f6",
                      }}
                    ></div>
                  </div>
                  <span className="fw-bold small text-white text-nowrap">⏱ {timeLeft}s</span>
                </div>

                {/* KHUNG CÂU HỎI */}
                <div className="card quiz-card-dark rounded-4 p-4 p-md-5 mb-4 text-center">
                  <div className="text-white-50 small mb-2 fw-semibold">{currentQ.topic}</div>
                  <h3 className="fw-bold text-white mb-2" style={{ lineHeight: 1.45 }}>
                    {currentQ.prompt}
                  </h3>
                  {currentQ.subPrompt && (
                    <p className="text-warning small mb-0 fw-semibold">{currentQ.subPrompt}</p>
                  )}
                </div>

                {/* 4 ĐÁP ÁN QUIZIZZ MÀU SẮC */}
                <div className="row g-3 mb-4">
                  {currentQ.options.map((opt, idx) => {
                    const theme = optionTheme[idx % optionTheme.length];
                    const isSelected = selectedOption === opt.key;
                    const isCorrect = opt.key === currentQ.correctKey;

                    let btnStyle = {
                      background: theme.bg,
                      border: `2px solid ${theme.border}`,
                      color: "#ffffff",
                      minHeight: 78,
                    };

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = {
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          border: "3px solid #34d399",
                          color: "#ffffff",
                          transform: "scale(1.02)",
                          boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
                          minHeight: 78,
                        };
                      } else if (isSelected) {
                        btnStyle = {
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                          border: "3px solid #f87171",
                          color: "#ffffff",
                          opacity: 0.8,
                          minHeight: 78,
                        };
                      } else {
                        btnStyle = {
                          background: "rgba(30, 41, 59, 0.5)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.4)",
                          minHeight: 78,
                        };
                      }
                    }

                    return (
                      <div className="col-12 col-md-6" key={opt.key}>
                        <button
                          type="button"
                          className="btn w-100 p-3 rounded-4 d-flex align-items-center gap-3 text-start position-relative shadow"
                          style={btnStyle}
                          onClick={() => handleSelectOption(opt.key)}
                          disabled={isAnswered}
                        >
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                            style={{ width: 36, height: 36, background: "rgba(0,0,0,0.25)", fontSize: "1rem", flexShrink: 0 }}
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

                {/* GIẢI THÍCH & CHUYỂN CÂU */}
                {isAnswered && (
                  <div className="p-3.5 rounded-4 mb-3 d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <div className="flex-grow-1 text-white">
                      <div className="fw-bold mb-1">
                        {selectedOption === currentQ.correctKey ? (
                          <span className="text-success">🎉 Chính xác! (+{Math.max(100, 1000 - Math.round(((QUESTION_MAX_TIME - timeLeft) * 55)))} điểm)</span>
                        ) : selectedOption === "__TIMEOUT__" ? (
                          <span className="text-warning">⏰ Đã hết thời gian (0 điểm)</span>
                        ) : (
                          <span className="text-danger">❌ Chưa chính xác! (0 điểm)</span>
                        )}
                      </div>
                      <div className="text-white-50 small">{currentQ.explanation}</div>
                    </div>

                    <button className="btn btn-warning px-4 py-2.5 rounded-pill fw-bold text-dark text-nowrap" onClick={handleNextQuestion}>
                      {currentIndex + 1 < questions.length ? "Câu Kế Tiếp ➜" : "Xem Bảng Điểm 🏆"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. MÀN HÌNH TỔNG KẾT & KỶ LỤC MỚI (COMPLETED) */}
          {/* ======================================================== */}
          {gameState === "completed" && (
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-9">
                <div className="card quiz-card-dark rounded-4 p-4 p-md-5 text-center">
                  {isNewRecord ? (
                    <div className="mb-3">
                      <span className="fs-1 d-block mb-1">👑</span>
                      <h2 className="fw-bold text-warning mb-1">KỶ LỤC MỚI ĐÃ ĐƯỢC XÁC LẬP!</h2>
                      <p className="text-white-50 small">Chúc mừng bạn đã xuất sắc vượt qua kỷ lục điểm số toàn hệ thống!</p>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <span className="fs-1 d-block mb-1">🎉</span>
                      <h2 className="fw-bold text-warning mb-1">HOÀN THÀNH TRẬN ĐẤU!</h2>
                      <p className="text-white-50 small">Bạn đã hoàn thành 10 câu hỏi thử thách phản xạ tốc độ</p>
                    </div>
                  )}

                  {/* THẺ TỔNG ĐIỂM */}
                  <div className="p-4 rounded-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(245, 158, 11, 0.25) 100%)", border: "2px solid #f59e0b" }}>
                    <div className="text-white-50 small text-uppercase fw-semibold mb-1">TỔNG ĐIỂM GHI ĐƯỢC</div>
                    <h1 className="fw-bold display-3 text-warning mb-2">{score.toLocaleString()}</h1>
                    <div className="d-flex justify-content-center gap-3 text-white small flex-wrap">
                      <span>🎯 Đúng: <b>{correctCount}/10 câu</b></span>
                      <span>•</span>
                      <span>🔥 Chuỗi đúng cao nhất: <b>x{maxStreak}</b></span>
                      <span>•</span>
                      <span>⏱ Thời gian: <b>{totalTimeSpent}s</b></span>
                    </div>
                  </div>

                  {/* BẢNG ĐỐI ĐẦU PHÒNG THÁCH ĐẤU (NẾU ĐANG CHƠI PHÒNG) */}
                  {currentRoom && roomRankings.length > 0 && (
                    <div className="mb-4 text-start">
                      <h5 className="fw-bold text-white mb-2 text-center">⚔️ Kết Quả Thách Đấu Trực Tiếp</h5>
                      <div className="table-responsive">
                        <table className="table table-dark table-hover align-middle mb-0" style={{ background: "transparent" }}>
                          <thead>
                            <tr className="text-white-50 small">
                              <th>Hạng</th>
                              <th>Đấu thủ</th>
                              <th className="text-center">Đúng</th>
                              <th className="text-center">Thời gian</th>
                              <th className="text-end">Điểm</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roomRankings.map((r, idx) => (
                              <tr key={idx} className={r.player_name === myName ? "table-active border-warning" : ""}>
                                <td>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}</td>
                                <td className="fw-bold text-white">{r.player_name}</td>
                                <td className="text-center">{r.correct_count}/10</td>
                                <td className="text-center text-white-50 small">{r.time_spent}s</td>
                                <td className="text-end fw-bold text-warning">{r.score.toLocaleString()} đ</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {savingResult && (
                    <div className="text-center text-white-50 small mb-3">
                      <div className="spinner-border spinner-border-sm text-warning me-2"></div>
                      Đang đồng bộ kết quả lên Bảng Kỷ Lục Clever Cloud...
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-warning py-3 rounded-pill fw-bold text-dark"
                      onClick={() => {
                        if (currentRoom) {
                          setActiveTab("room");
                          setRoomState("menu");
                        } else {
                          startSoloGame();
                        }
                      }}
                    >
                      🔄 Chơi Lại Trận Mới
                    </button>
                    <button
                      className="btn btn-outline-light py-2.5 rounded-pill fw-semibold text-white"
                      onClick={() => {
                        setActiveTab("leaderboard");
                        setGameState("lobby");
                        fetchLeaderboard();
                      }}
                    >
                      🏆 Xem Bảng Kỷ Lục Toàn Server
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
      </main>

      <Footer />
    </div>
  );
}
