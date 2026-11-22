const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "bcox5ftbn6sb5wcrh3n7-mysql.services.clever-cloud.com",
  user: process.env.DB_USER || "ujakkv66mbiaemau",
  password: process.env.DB_PASSWORD ?? "bNyvHyT7RWgLFcRLfJiU",
  database: process.env.DB_NAME || "bcox5ftbn6sb5wcrh3n7",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 4,
  queueLimit: 0,
});

// Kiểm tra kết nối khi khởi động
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database successfully!");
    connection.release();
  } catch (err) {
    console.error(" MySQL Connection Error:", err.message);
    console.log("-> Hãy đảm bảo MySQL/XAMPP đang chạy và file database_toeic.sql đã được import.");
  }
})();

module.exports = pool;
