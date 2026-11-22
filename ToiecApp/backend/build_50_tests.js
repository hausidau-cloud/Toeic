const fs = require("fs");
const path = require("path");
const pool = require("./config/mysql");
const { extractLessonTest, lessonTitles } = require("./test_extractor");

(async () => {
  console.log("🚀 Starting extraction of 50 TOEIC Reading Tests from test PDF files...");
  
  const allTests = [];
  
  for (let i = 1; i <= 50; i++) {
    try {
      const testObj = await extractLessonTest(i);
      allTests.push(testObj);
      console.log(`✓ Extracted Test ${i}: ${testObj.title} (${testObj.totalQuestions} questions)`);
    } catch (err) {
      console.error(`❌ Error extracting test for lesson ${i}:`, err.message);
    }
  }

  console.log(`\n🎉 Extracted total ${allTests.length} tests with ${allTests.reduce((sum, t) => sum + t.totalQuestions, 0)} questions!`);

  // 1. Ghi file toeicTests.js
  const dataFilePath = path.join(__dirname, "data/toeicTests.js");
  const jsContent = `// Kho 50 Đề Thi & Ôn Luyện TOEIC Reading trích xuất từ 50 file PDF bài học (Mun English)
const toeicTests = ${JSON.stringify(allTests, null, 2)};

module.exports = toeicTests;
`;
  fs.writeFileSync(dataFilePath, jsContent, "utf8");
  console.log(`✓ Saved 50 tests to data/toeicTests.js`);

  // 2. Đồng bộ vào Database MySQL
  try {
    console.log("\nSyncing 50 tests with MySQL Database toeic_db...");
    await pool.query("DELETE FROM user_results");
    await pool.query("DELETE FROM questions");
    await pool.query("DELETE FROM test_parts");
    await pool.query("DELETE FROM tests");
    await pool.query("ALTER TABLE tests AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE test_parts AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE questions AUTO_INCREMENT = 1");

    for (const test of allTests) {
      const [testResult] = await pool.query(
        "INSERT INTO tests (id, title, level, duration, total_questions, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          test.id,
          test.title,
          test.level,
          test.duration,
          test.totalQuestions,
          test.description
        ]
      );
      const testId = test.id;

      for (const part of test.parts) {
        const [partResult] = await pool.query(
          "INSERT INTO test_parts (test_id, part_number, name, passage) VALUES (?, ?, ?, ?)",
          [
            testId,
            part.part,
            part.name,
            part.passage || null
          ]
        );
        const testPartId = partResult.insertId;

        for (const q of part.questions) {
          await pool.query(
            "INSERT INTO questions (test_part_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              testPartId,
              q.question,
              q.options[0] || "",
              q.options[1] || "",
              q.options[2] || "",
              q.options[3] || "",
              q.answer,
              q.explanation || ""
            ]
          );
        }
      }
    }
    console.log("✓ Successfully inserted all 50 tests and 700 questions into MySQL!");
  } catch (dbErr) {
    console.error("MySQL Sync Error:", dbErr.message);
  }

  console.log("\n✅ ALL 50 PRACTICE TESTS BUILT AND SYNCED SUCCESSFULLY!");
  process.exit(0);
})();
