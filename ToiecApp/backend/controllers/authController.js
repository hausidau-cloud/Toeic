const express = require("express");
const bcrypt = require("bcrypt");
const { sql, pool } = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Mật khẩu nhập lại không khớp",
      });
    }

    const db = await pool;

    const checkEmail = await db
      .request()
      .input("Email", sql.NVarChar, email)
      .query("SELECT Id FROM Users WHERE Email = @Email");

    if (checkEmail.recordset.length > 0) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db
      .request()
      .input("FullName", sql.NVarChar, fullName)
      .input("Email", sql.NVarChar, email)
      .input("PasswordHash", sql.NVarChar, passwordHash)
      .input("Role", sql.NVarChar, "User").query(`
        INSERT INTO Users (FullName, Email, PasswordHash, Role)
        VALUES (@FullName, @Email, @PasswordHash, @Role)
      `);

    res.status(201).json({
      message: "Đăng ký thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
});

module.exports = router;
