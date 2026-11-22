import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
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

export default api;
