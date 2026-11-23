const pool = require("./config/mysql");

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS quiz_rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_code VARCHAR(10) NOT NULL UNIQUE,
      host_user_id INT NOT NULL,
      host_name VARCHAR(100) NOT NULL,
      status VARCHAR(20) DEFAULT 'waiting',
      mode VARCHAR(20) DEFAULT 'all',
      questions_json LONGTEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS quiz_room_players (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_id INT NOT NULL,
      user_id INT DEFAULT 0,
      player_name VARCHAR(100) NOT NULL,
      score INT DEFAULT 0,
      correct_count INT DEFAULT 0,
      time_spent INT DEFAULT 0,
      streak_max INT DEFAULT 0,
      is_finished TINYINT(1) DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_room (room_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    UPDATE quiz_leaderboard SET score = 9450, time_spent = 18 WHERE id = 1;
  `);
  await pool.query(`
    UPDATE quiz_leaderboard SET score = 8620, time_spent = 24 WHERE id = 2;
  `);
  await pool.query(`
    UPDATE quiz_leaderboard SET score = 7890, time_spent = 31 WHERE id = 3;
  `);

  const [top] = await pool.query(`SELECT * FROM quiz_leaderboard ORDER BY score DESC LIMIT 1`);
  console.log("Current Record Holder:", top[0]?.player_name, top[0]?.score);
  console.log("quiz_rooms and quiz_room_players ready!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
