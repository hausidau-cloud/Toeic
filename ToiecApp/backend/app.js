const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const toeicRoutes = require("./routes/toeicRoutes");
const vocabularyRoutes = require("./routes/vocabularyRoutes");
const grammarRoutes = require("./routes/grammarRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "TOEIC App Backend API is running with MySQL database support!",
    endpoints: [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/me",
      "/api/auth/users",
      "/api/toeic/tests",
      "/api/toeic/tests/:id",
      "/api/toeic/submit",
      "/api/toeic/history/:userId",
      "/api/toeic/stats",
      "/api/vocabulary",
      "/api/vocabulary/categories",
      "/api/vocabulary/quiz",
      "/api/grammar",
      "/api/grammar/:id",
      "/api/grammar/:id/submit",
    ],
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/toeic", toeicRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/grammar", grammarRoutes);
app.use("/api/quiz", quizRoutes);

// Xử lý 404 route không tồn tại
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint không tồn tại" });
});

// Xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
