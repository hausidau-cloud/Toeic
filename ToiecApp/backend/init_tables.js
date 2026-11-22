const pool = require("./config/mysql");

(async () => {
  try {
    // 1. Tạo bảng vocabularies
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`vocabularies\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`word_or_phrase\` VARCHAR(150) NOT NULL,
        \`phonetic\` VARCHAR(100) NULL,
        \`word_type\` VARCHAR(50) DEFAULT 'collocation',
        \`meaning\` TEXT NOT NULL,
        \`example_sentence\` TEXT NULL,
        \`example_meaning\` TEXT NULL,
        \`category\` VARCHAR(100) DEFAULT 'Cụm từ TOEIC ăn điểm',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("Table vocabularies created/verified.");

    // 2. Tạo bảng grammar_topics
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`grammar_topics\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`summary\` TEXT NULL,
        \`theory\` LONGTEXT NOT NULL,
        \`tips\` TEXT NULL,
        \`examples\` TEXT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("Table grammar_topics created/verified.");

    // 3. Tạo bảng grammar_questions
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`grammar_questions\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`topic_id\` INT NOT NULL,
        \`question_text\` TEXT NOT NULL,
        \`option_a\` VARCHAR(255) NOT NULL,
        \`option_b\` VARCHAR(255) NOT NULL,
        \`option_c\` VARCHAR(255) NOT NULL,
        \`option_d\` VARCHAR(255) NOT NULL,
        \`correct_answer\` VARCHAR(5) NOT NULL,
        \`explanation\` TEXT NULL,
        FOREIGN KEY (\`topic_id\`) REFERENCES \`grammar_topics\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("Table grammar_questions created/verified.");

    // Kiểm tra số lượng vocabularies
    const [vocabRows] = await pool.query("SELECT COUNT(*) as cnt FROM vocabularies");
    console.log("Current vocabularies count in DB:", vocabRows[0].cnt);
    if (vocabRows[0].cnt === 0) {
      const vocabData = require("./data/vocabularyData.js");
      console.log("Seeding", vocabData.length, "vocabularies into MySQL...");
      for (const v of vocabData) {
        await pool.query(
          "INSERT INTO vocabularies (word_or_phrase, phonetic, word_type, meaning, example_sentence, example_meaning, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [v.word_or_phrase, v.phonetic, v.word_type, v.meaning, v.example_sentence, v.example_meaning, v.category]
        );
      }
      console.log("Seeded vocabularies successfully!");
    }

    // Kiểm tra số lượng grammar_topics
    const [grammarRows] = await pool.query("SELECT COUNT(*) as cnt FROM grammar_topics");
    console.log("Current grammar_topics count in DB:", grammarRows[0].cnt);
    if (grammarRows[0].cnt === 0) {
      const grammarData = require("./data/grammarData.js");
      console.log("Seeding", grammarData.length, "grammar topics into MySQL...");
      for (const g of grammarData) {
        const [res] = await pool.query(
          "INSERT INTO grammar_topics (title, summary, theory, tips, examples) VALUES (?, ?, ?, ?, ?)",
          [g.title, g.summary, g.theory, JSON.stringify(g.tips || []), JSON.stringify(g.examples || [])]
        );
        const topicId = res.insertId;
        if (g.practice_questions && g.practice_questions.length > 0) {
          for (const q of g.practice_questions) {
            await pool.query(
              "INSERT INTO grammar_questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [topicId, q.question, q.options[0], q.options[1], q.options[2], q.options[3], q.correctAnswer, q.explanation]
            );
          }
        }
      }
      console.log("Seeded grammar topics and questions successfully!");
    }

    console.log("All tables and seed data in MySQL are ready!");
  } catch (err) {
    console.error("Error during init:", err);
  } finally {
    process.exit(0);
  }
})();
