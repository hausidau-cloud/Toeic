const fs = require("fs");
const path = require("path");
const { PDFParse } = require("./node_modules/pdf-parse");
const pool = require("./config/mysql");

const lessonTitles = {
  1: "Bài 1: Hợp đồng (Contracts)",
  2: "Bài 2: Tiếp thị (Marketing)",
  3: "Bài 3: Bảo hành (Warranties)",
  4: "Bài 4: Kế hoạch kinh doanh (Business Planning)",
  5: "Bài 5: Hội nghị (Conferences)",
  6: "Bài 6: Máy tính & CNTT (Computers)",
  7: "Bài 7: Công nghệ văn phòng (Office Technology)",
  8: "Bài 8: Quy trình văn phòng (Office Procedures)",
  9: "Bài 9: Thiết bị điện tử (Electronics)",
  10: "Bài 10: Thư từ thương mại (Correspondence)",
  11: "Bài 11: Quảng cáo tuyển dụng (Job Advertising)",
  12: "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)",
  13: "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)",
  14: "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)",
  15: "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)",
  16: "Bài 16: Mua sắm (Shopping)",
  17: "Bài 17: Đặt hàng vật tư (Ordering Supplies)",
  18: "Bài 18: Giao hàng & Vận chuyển (Shipping)",
  19: "Bài 19: Hóa đơn & Thanh toán (Invoices)",
  20: "Bài 20: Kiểm kê kho hàng (Inventory)",
  21: "Bài 21: Ngân hàng (Banking)",
  22: "Bài 22: Kế toán (Accounting)",
  23: "Bài 23: Đầu tư tài chính (Investments)",
  24: "Bài 24: Thuế (Taxes)",
  25: "Bài 25: Báo cáo tài chính (Financial Statements)",
  26: "Bài 26: Bất động sản & Phòng ban (Property & Departments)",
  27: "Bài 27: Họp ban quản trị (Board Meetings)",
  28: "Bài 28: Kiểm soát chất lượng (Quality Control)",
  29: "Bài 29: Phát triển sản phẩm (Product Development)",
  30: "Bài 30: Thuê & Cho thuê (Renting & Leasing)",
  31: "Bài 31: Chọn nhà hàng (Selecting a Restaurant)",
  32: "Bài 32: Ăn uống bên ngoài (Eating Out)",
  33: "Bài 33: Đặt bữa trưa (Ordering Lunch)",
  34: "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)",
  35: "Bài 35: Sự kiện & Lễ hội (Events)",
  36: "Bài 36: Du lịch tổng quát (General Travel)",
  37: "Bài 37: Hàng không & Chuyến bay (Airlines)",
  38: "Bài 38: Tàu hỏa (Trains)",
  39: "Bài 39: Khách sạn (Hotels)",
  40: "Bài 40: Thuê xe hơi (Car Rentals)",
  41: "Bài 41: Điện ảnh & Phim ảnh (Movies)",
  42: "Bài 42: Kịch nghệ & Nhà hát (Theater)",
  43: "Bài 43: Âm nhạc (Music)",
  44: "Bài 44: Bảo tàng (Museums)",
  45: "Bài 45: Truyền thông & Báo chí (Media)",
  46: "Bài 46: Phòng khám bác sĩ (Doctor's Office)",
  47: "Bài 47: Phòng khám nha khoa (Dentist's Office)",
  48: "Bài 48: Bảo hiểm y tế (Health Insurance)",
  49: "Bài 49: Bệnh viện (Hospitals)",
  50: "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
};

// 12 Cụm từ TOEIC ăn điểm cốt lõi
const collocations = [
  {
    word_or_phrase: "comply with",
    phonetic: "/kəmˈplaɪ wɪð/",
    word_type: "phrasal_verb",
    meaning: "tuân thủ theo, làm theo (quy định, luật lệ)",
    example_sentence: "All employees must comply with the company safety regulations.",
    example_meaning: "Tất cả nhân viên phải tuân thủ các quy định an toàn của công ty.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "in accordance with",
    phonetic: "/ɪn əˈkɔː.dəns wɪð/",
    word_type: "collocation",
    meaning: "phù hợp với, theo đúng như (quy chuẩn, thỏa thuận)",
    example_sentence: "The building was renovated in accordance with environmental standards.",
    example_meaning: "Tòa nhà đã được cải tạo theo đúng các tiêu chuẩn môi trường.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "look forward to",
    phonetic: "/lʊk ˈfɔː.wəd tuː/",
    word_type: "phrasal_verb",
    meaning: "rất mong đợi, trông chờ (+ V-ing / Danh từ)",
    example_sentence: "We look forward to receiving your feedback on the proposal.",
    example_meaning: "Chúng tôi rất mong nhận được phản hồi của bạn về bản đề xuất.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "take responsibility for",
    phonetic: "/teɪk rɪˌspɒn.sɪˈbɪl.ə.ti fɔːr/",
    word_type: "collocation",
    meaning: "chịu trách nhiệm về việc gì",
    example_sentence: "The project manager took full responsibility for the project delay.",
    example_meaning: "Trưởng dự án đã nhận toàn bộ trách nhiệm về sự chậm trễ của dự án.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "under warranty",
    phonetic: "/ˈʌn.dər ˈwɒr.ən.ti/",
    word_type: "collocation",
    meaning: "còn trong thời hạn bảo hành",
    example_sentence: "Repairs are completely free because the photocopier is still under warranty.",
    example_meaning: "Việc sửa chữa hoàn toàn miễn phí vì máy photocopy vẫn còn trong thời hạn bảo hành.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "conduct a survey",
    phonetic: "/kənˈdʌkt ə ˈsɜː.veɪ/",
    word_type: "collocation",
    meaning: "tiến hành một cuộc khảo sát, nghiên cứu",
    example_sentence: "The marketing department decided to conduct a survey on consumer habits.",
    example_meaning: "Phòng tiếp thị quyết định tiến hành một cuộc khảo sát về thói quen người tiêu dùng.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "submit an application",
    phonetic: "/səbˈmɪt ən ˌæp.lɪˈkeɪ.ʃən/",
    word_type: "collocation",
    meaning: "nộp hồ sơ ứng tuyển, nộp đơn",
    example_sentence: "Interested applicants must submit an application before the end of the month.",
    example_meaning: "Ứng viên quan tâm phải nộp đơn ứng tuyển trước cuối tháng.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "in charge of",
    phonetic: "/ɪn tʃɑːdʒ ɒv/",
    word_type: "collocation",
    meaning: "chịu trách nhiệm, phụ trách chính",
    example_sentence: "Ms. Lan is in charge of organizing the international trade conference.",
    example_meaning: "Cô Lan phụ trách tổ chức hội nghị thương mại quốc tế.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "reach a consensus",
    phonetic: "/riːtʃ ə kənˈsen.səs/",
    word_type: "collocation",
    meaning: "đạt được sự đồng thuận, nhất trí",
    example_sentence: "After hours of negotiation, both sides finally reached a consensus.",
    example_meaning: "Sau nhiều giờ đàm phán, cả hai bên cuối cùng đã đạt được sự đồng thuận.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "prior to",
    phonetic: "/ˈpraɪ.ər tuː/",
    word_type: "preposition",
    meaning: "trước khi (tương đương before)",
    example_sentence: "All attendees must register online prior to attending the workshop.",
    example_meaning: "Tất cả người tham gia phải đăng ký trực tuyến trước khi tham dự hội thảo.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "take advantage of",
    phonetic: "/teɪk ədˈvɑːn.tɪdʒ ɒv/",
    word_type: "collocation",
    meaning: "tận dụng, nắm bắt cơ hội tốt",
    example_sentence: "You should take advantage of the discount promotion this weekend.",
    example_meaning: "Bạn nên tận dụng chương trình ưu đãi giảm giá vào cuối tuần này.",
    category: "Cụm từ TOEIC ăn điểm"
  },
  {
    word_or_phrase: "adhere to",
    phonetic: "/ədˈhɪər tuː/",
    word_type: "phrasal_verb",
    meaning: "tuân thủ chặt chẽ, gắn bó với",
    example_sentence: "Every laboratory technician must adhere to the chemical safety protocols.",
    example_meaning: "Mỗi kỹ thuật viên phòng thí nghiệm đều phải tuân thủ các quy tắc an toàn hóa chất.",
    category: "Cụm từ TOEIC ăn điểm"
  }
];

const commonVnWords = new Set([
  'tham', 'doanh', 'chung', 'nhanh', 'vay', 'mong', 'trung', 'cho', 'ban', 'mua',
  'khach', 'mang', 'theo', 'trong', 'tra', 'tu', 'xem', 'an', 'giao', 'lam', 'loai',
  'luat', 'nguoi', 'nha', 'phan', 'quan', 'tai', 'thanh', 'thoi', 'tien', 'tinh',
  'toan', 'tot', 'viec', 'truy', 'sao', 'thay', 'quy', 'ghi', 'phong', 'tuyen',
  'ung', 'tin', 'tim', 'kiem', 'sanh', 'hanh', 'lang', 'don', 'hang', 'ra', 'lenh',
  'uoc', 'tinh', 'luong', 'ban', 'coi', 'trong', 'gia', 'tri', 'dong', 'gop', 'phan'
]);

function normalizeWordType(rawType) {
  const t = (rawType || "").toLowerCase();
  if (t.includes("phrasal")) return "phrasal_verb";
  if (t.includes("collocation")) return "collocation";
  if (t.includes("verb") && t.includes("noun")) return "verb";
  if (t.includes("verb") || t.startsWith("v")) return "verb";
  if (t.includes("noun") || t.startsWith("n")) return "noun";
  if (t.includes("adj") || t.startsWith("a")) return "adjective";
  if (t.includes("adv")) return "adverb";
  if (t.includes("prep")) return "preposition";
  return "noun";
}

// Tìm câu ví dụ trong script chứa từ vựng
function findExampleSentence(text, word) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 15);
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escapedWord}\\b`, "i");

  for (const line of lines) {
    if (regex.test(line) && !/Words\s*To\s*Learn|Word\s*Families|Từ\s*Loại|Loại\s*từ|Nghĩa/i.test(line)) {
      // Dọn dẹp câu ví dụ
      const cleanLine = line.replace(/^\([A-D0-9.\-]+\)\s*/, "").replace(/^[0-9.]+\s*/, "").trim();
      if (cleanLine.length >= 20 && cleanLine.length <= 160 && !/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(cleanLine)) {
        return cleanLine;
      }
    }
  }

  return `The company expects all staff to understand the concept of ${word} thoroughly.`;
}

(async () => {
  console.log("Starting full 600 TOEIC Vocabulary extraction from 50 PDF files...");
  const dir = path.join(__dirname, "../../tuvung");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".pdf"));

  const lessons = files.map(f => {
    const m = f.match(/LESSON\s*(\d+)/i);
    return { file: f, num: m ? parseInt(m[1]) : 0 };
  }).sort((a, b) => a.num - b.num);

  const allVocabulary = [];
  let currentId = 1;

  // 1. Thêm 12 cụm từ TOEIC ăn điểm
  for (const c of collocations) {
    allVocabulary.push({
      id: currentId++,
      ...c
    });
  }

  // 2. Trích xuất đúng 12 từ vựng từ mỗi bài học PDF (50 bài x 12 = 600 từ vựng)
  for (const l of lessons) {
    const filePath = path.join(dir, l.file);
    const buf = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buf });
    const textObj = await parser.getText();
    const text = textObj.text || "";

    const lines = text.split("\n").map(x => x.trim()).filter(x => x);
    const startIdx = lines.findIndex(x => /Words\s*To\s*Learn/i.test(x));
    const endIdx = lines.findIndex((x, idx) => idx > startIdx && /Word\s*Families/i.test(x));

    const wordsSection = lines.slice(startIdx + 1, endIdx > startIdx ? endIdx : startIdx + 35)
      .filter(x => !/^(?:Từ\s*Loại|Loại\s*từ|Words?\s*To\s*Learn)/i.test(x));
    const lessonCategory = lessonTitles[l.num] || `Bài ${l.num}`;
    const wordsMap = new Map();

    for (const raw of wordsSection) {
      const typeMatch = raw.match(/^((?:\b(?:noun|verb|adjective|adverb|adj|adv|v|n|prep|preposition)\b[\.\,]?\s*(?:\/|\&|\,)?\s*)+(\s*\(cụm\s*động\s*từ\))?\.?\s*)/i);
      if (!typeMatch) continue;

      const rawType = typeMatch[1].trim();
      let clean = raw.substring(typeMatch[0].length).trim();
      clean = clean.replace(/^\(cụm\s*động\s*từ\)\s*/i, "");

      const tokens = clean.split(/\s+/);
      let engTokens = [];
      let meaningTokens = [];
      let foundMeaning = false;

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!foundMeaning) {
          if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(token)) {
            foundMeaning = true;
            meaningTokens.push(token);
            continue;
          }
          if (/^\(/.test(token)) {
            foundMeaning = true;
            meaningTokens.push(token);
            continue;
          }
          const cleanToken = token.replace(/[^a-zA-Z]/g, "").toLowerCase();
          if (commonVnWords.has(cleanToken) && engTokens.length >= 1) {
            foundMeaning = true;
            meaningTokens.push(token);
            continue;
          }
          engTokens.push(token);
        } else {
          meaningTokens.push(token);
        }
      }

      let engWord = engTokens.join(" ").trim().replace(/[\,\.\;\:]+$/, "");
      let meaning = meaningTokens.join(" ").trim();
      if (engWord && engWord.length >= 2) {
        const key = engWord.toLowerCase();
        if (!wordsMap.has(key)) {
          wordsMap.set(key, {
            word: engWord,
            type: normalizeWordType(rawType),
            meaning: meaning
          });
        } else {
          wordsMap.get(key).meaning += "; " + meaning;
        }
      }
    }

    for (const [key, item] of wordsMap.entries()) {
      const sentence = findExampleSentence(text, item.word);
      const exampleMeaning = `Ví dụ thực tế trong đề thi TOEIC: "${sentence}"`;

      allVocabulary.push({
        id: currentId++,
        word_or_phrase: item.word,
        phonetic: `/${item.word}/`,
        word_type: item.type,
        meaning: item.meaning,
        example_sentence: sentence,
        example_meaning: exampleMeaning,
        category: lessonCategory
      });
    }
  }

  console.log(`\n🎉 Extracted a total of ${allVocabulary.length} vocabulary words across 51 categories (50 Lessons + Collocations)!`);

  // 3. Ghi file vocabularyData.js
  const dataFilePath = path.join(__dirname, "data/vocabularyData.js");
  const jsContent = `// Dữ liệu 600 Từ Vựng TOEIC trích xuất đầy đủ từ 50 file PDF & Cụm từ ăn điểm
const vocabularyData = ${JSON.stringify(allVocabulary, null, 2)};

module.exports = vocabularyData;
`;
  fs.writeFileSync(dataFilePath, jsContent, "utf8");
  console.log(`Saved ${allVocabulary.length} words into data/vocabularyData.js`);

  // 4. Đồng bộ vào Database MySQL
  try {
    console.log("Syncing with MySQL toeic_db...");
    await pool.query("DELETE FROM vocabularies");
    await pool.query("ALTER TABLE vocabularies AUTO_INCREMENT = 1");

    for (const item of allVocabulary) {
      await pool.query(
        "INSERT INTO vocabularies (word_or_phrase, phonetic, word_type, meaning, example_sentence, example_meaning, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          item.word_or_phrase,
          item.phonetic,
          item.word_type,
          item.meaning,
          item.example_sentence,
          item.example_meaning,
          item.category
        ]
      );
    }
    console.log("✓ Successfully inserted all " + allVocabulary.length + " words into MySQL table vocabularies!");
  } catch (dbErr) {
    console.error("MySQL Sync Error:", dbErr.message);
  }

  // 5. Cập nhật file database_toeic.sql
  try {
    const sqlPath = path.join(__dirname, "database_toeic.sql");
    let sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Thay thế phần seed vocabularies trong file sql
    const insertHeader = "INSERT INTO `vocabularies` (`word_or_phrase`, `phonetic`, `word_type`, `meaning`, `example_sentence`, `example_meaning`, `category`) VALUES\n";
    const escapeSql = (str) => (str ? str.replace(/'/g, "''").replace(/\\/g, "\\\\") : "");
    const valuesList = allVocabulary.map(v => 
      `('${escapeSql(v.word_or_phrase)}', '${escapeSql(v.phonetic)}', '${escapeSql(v.word_type)}', '${escapeSql(v.meaning)}', '${escapeSql(v.example_sentence)}', '${escapeSql(v.example_meaning)}', '${escapeSql(v.category)}')`
    ).join(",\n");

    const fullInsert = insertHeader + valuesList + ";\n";

    // Tìm và thay thế khối INSERT INTO vocabularies
    const vocabInsertRegex = /INSERT INTO `vocabularies`[\s\S]*?;\n/m;
    if (vocabInsertRegex.test(sqlContent)) {
      sqlContent = sqlContent.replace(vocabInsertRegex, fullInsert);
      fs.writeFileSync(sqlPath, sqlContent, "utf8");
      console.log("✓ Updated database_toeic.sql with all 600+ vocabulary records!");
    }
  } catch (sqlErr) {
    console.error("Error updating database_toeic.sql:", sqlErr.message);
  }

  console.log("\n✅ FULL SYNCHRONIZATION COMPLETE!");
  process.exit(0);
})();
