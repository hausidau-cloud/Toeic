const pool = require("./config/mysql");

async function main() {
  const sql = `
  CREATE TABLE IF NOT EXISTS quiz_leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    player_name VARCHAR(100) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    correct_count INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL DEFAULT 10,
    time_spent INT NOT NULL DEFAULT 0,
    streak_max INT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_score (score DESC),
    INDEX idx_user (user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(sql);
  console.log("Created quiz_leaderboard table successfully!");

  const [countRows] = await pool.query("SELECT COUNT(*) as cnt FROM quiz_leaderboard");
  if (countRows[0].cnt === 0) {
    await pool.query(`
      INSERT INTO quiz_leaderboard (user_id, player_name, score, correct_count, total_questions, time_spent, streak_max)
      VALUES 
      (1, 'Admin Quản Trị', 1420, 10, 10, 42, 10),
      (2, 'Nguyễn Văn Học Viên', 1250, 9, 10, 55, 7),
      (4, 'hau', 980, 8, 10, 68, 5)
    `);
    console.log("Seeded initial leaderboard records!");
  }

  const [list] = await pool.query("SELECT * FROM quiz_leaderboard ORDER BY score DESC LIMIT 5");
  console.log("CURRENT LEADERBOARD:", list);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error creating table:", err.message);
  process.exit(1);
});
