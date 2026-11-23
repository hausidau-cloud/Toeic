import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000/api"
    : "https://toeic-kh2l.onrender.com/api");

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Gắn Bearer Token tự động vào header nếu user đã đăng nhập
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
  getUsers: () => api.get("/auth/users"),
  updateUserRole: (id, role) => api.put(`/auth/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/auth/users/${id}`),
};

export const toeicApi = {
  getTests: (params = {}) => api.get("/toeic/tests", { params }),
  getTestById: (id) => api.get(`/toeic/tests/${id}`),
  getPartQuestions: (part) => api.get(`/toeic/parts/${part}`),
  getStats: () => api.get("/toeic/stats"),
  submitResult: (data) => api.post("/toeic/submit", data),
  getUserHistory: (userId) => api.get(`/toeic/history/${userId}`),
  createTest: (data) => api.post("/toeic/tests", data),
  deleteTest: (id) => api.delete(`/toeic/tests/${id}`),
  getAllResults: () => api.get("/toeic/admin/results"),
};

export const vocabularyApi = {
  getAll: (params = {}) => api.get("/vocabulary", { params }),
  getCategories: () => api.get("/vocabulary/categories"),
  getQuiz: (params = {}) => api.get("/vocabulary/quiz", { params }),
  create: (data) => api.post("/vocabulary", data),
  delete: (id) => api.delete(`/vocabulary/${id}`),
};

export const grammarApi = {
  getAll: () => api.get("/grammar"),
  getById: (id) => api.get(`/grammar/${id}`),
  submitQuiz: (id, answers) => api.post(`/grammar/${id}/submit`, { answers }),
  create: (data) => api.post("/grammar", data),
};

export const quizApi = {
  getQuestions: (params = {}) => api.get("/quiz/questions", { params }),
  getRecord: () => api.get("/quiz/record"),
  submitScore: (data) => api.post("/quiz/submit", data),
  getLeaderboard: (params = {}) => api.get("/quiz/leaderboard", { params }),
  createRoom: (data) => api.post("/quiz/room/create", data),
  joinRoom: (data) => api.post("/quiz/room/join", data),
  getRoom: (code) => api.get(`/quiz/room/${code}`),
  startRoom: (code) => api.post(`/quiz/room/${code}/start`),
  addBot: (code) => api.post(`/quiz/room/${code}/add-bot`),
  submitRoom: (code, data) => api.post(`/quiz/room/${code}/submit`, data),
};

export default api;
