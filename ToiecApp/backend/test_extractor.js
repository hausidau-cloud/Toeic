const fs = require('fs');
const { PDFParse } = require('./node_modules/pdf-parse');

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

const path = require('path');

function cleanText(t) {
  return t
    .replace(/--\s*\d+\s*of\s*\d+\s*--[^\n]*/gi, '')
    .replace(/Mun English[^\n]*/gi, '')
    .replace(/Follow kênh youtube[^\n]*/gi, '')
    .trim();
}

async function extractLessonTest(lessonNum) {
  const filePath = path.join(__dirname, `../../test/TOEIC READING - LESSON ${lessonNum}.pdf`);
  const buf = fs.readFileSync(filePath);
  const p = new PDFParse({ data: buf });
  const rawText = cleanText((await p.getText()).text);

  const dapAnIdx = rawText.search(/II\.\s*ĐÁP ÁN VÀ GIẢI THÍCH/i);
  const qSection = rawText.substring(0, dapAnIdx);
  const aSection = rawText.substring(dapAnIdx);

  // 1. Part 5 (Q10 - Q15)
  const p5Questions = [];
  for (let q = 10; q <= 15; q++) {
    const nextQ = q < 15 ? (q + 1) + '\\.' : 'Part 6';
    const qM = qSection.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + nextQ + '|$))', 'i'));
    const aM = aSection.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + (q + 1) + '\\.|Part 6|$))', 'i'));
    
    if (qM && aM) {
      const qBlock = qM[1];
      const aBlock = aM[1];

      // Question text: before (A)
      const qTextMatch = qBlock.match(/^([\s\S]*?)(?=\([A-D]\))/);
      const qText = qTextMatch ? qTextMatch[1].trim().replace(/\n/g, ' ') : `Question ${q}`;

      // Options (A), (B), (C), (D)
      const optA = (qBlock.match(/\(A\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optB = (qBlock.match(/\(B\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optC = (qBlock.match(/\(C\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optD = (qBlock.match(/\(D\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';

      // Answer letter
      const ansMatch = aBlock.match(/Answer:\s*\(([A-D])\)/i);
      const answer = ansMatch ? ansMatch[1].toUpperCase() : 'A';

      // Explanation & Translation
      const explMatch = aBlock.match(/Explanation:\s*([\s\S]*?)(?=(?:Translation:|$))/i);
      const transMatch = aBlock.match(/Translation:\s*([\s\S]*)/i);
      let explanation = explMatch ? explMatch[1].trim().replace(/\n/g, ' ') : '';
      if (transMatch) {
        explanation += ' Dịch nghĩa: ' + transMatch[1].trim().replace(/\n/g, ' ');
      }

      p5Questions.push({
        id: lessonNum * 100 + q,
        question: `${q}. ${qText}`,
        options: [optA, optB, optC, optD],
        answer,
        explanation
      });
    }
  }

  // 2. Part 6 (Q16 - Q18)
  const p6PassageMatch = qSection.match(/Part 6[^\n]*\n([\s\S]*?)(?=\n\s*16\.)/i);
  const p6Passage = p6PassageMatch ? p6PassageMatch[1].trim() : '';
  const p6Questions = [];

  for (let q = 16; q <= 18; q++) {
    const nextQ = q < 18 ? (q + 1) + '\\.' : 'Part 7';
    const qM = qSection.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + nextQ + '|$))', 'i'));
    const aM = aSection.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + (q + 1) + '\\.|Part 7|$))', 'i'));

    if (qM && aM) {
      const qBlock = qM[1];
      const aBlock = aM[1];

      const optA = (qBlock.match(/\(A\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optB = (qBlock.match(/\(B\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optC = (qBlock.match(/\(C\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optD = (qBlock.match(/\(D\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';

      const ansMatch = aBlock.match(/Answer:\s*\(([A-D])\)/i);
      const answer = ansMatch ? ansMatch[1].toUpperCase() : 'A';

      const explMatch = aBlock.match(/Explanation:\s*([\s\S]*?)(?=(?:Translation:|$))/i);
      const explanation = explMatch ? explMatch[1].trim().replace(/\n/g, ' ') : '';

      p6Questions.push({
        id: lessonNum * 100 + q,
        question: `Câu ${q}: Chọn từ hoặc cụm từ thích hợp nhất để điền vào vị trí [${q}] trong đoạn văn.`,
        options: [optA, optB, optC, optD],
        answer,
        explanation
      });
    }
  }

  // 3. Part 7 (Q19 - Q23)
  const p7PassageMatch = qSection.match(/Part 7[^\n]*\n([\s\S]*?)(?=\n\s*19\.)/i);
  const p7Passage = p7PassageMatch ? p7PassageMatch[1].trim() : '';
  const p7Questions = [];

  for (let q = 19; q <= 23; q++) {
    const nextQ = q < 23 ? (q + 1) + '\\.' : '$';
    const qM = qSection.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + nextQ + '|$))', 'i'));
    const aM = aSection.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + nextQ + '|$))', 'i'));

    if (qM && aM) {
      const qBlock = qM[1];
      const aBlock = aM[1];

      const qTextMatch = qBlock.match(/^([\s\S]*?)(?=\([A-D]\))/);
      const qText = qTextMatch ? qTextMatch[1].trim().replace(/\n/g, ' ') : `Question ${q}`;

      const optA = (qBlock.match(/\(A\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optB = (qBlock.match(/\(B\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optC = (qBlock.match(/\(C\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const optD = (qBlock.match(/\(D\)\s*([^(\n\r]+)/) || [])[1]?.trim() || '';
      const options = [optA, optB, optC, optD];

      // Deducing answer from aBlock
      let answer = 'A';
      const direct = aBlock.match(/Answer:\s*\(([A-D])\)/i);
      if (direct) {
        answer = direct[1].toUpperCase();
      } else {
        const explText = (aBlock.match(/Explanation:\s*([\s\S]+)/i) || [])[1] || aBlock;
        // Check which option is mentioned or best match
        let bestScore = -1;
        ['A', 'B', 'C', 'D'].forEach((l, idx) => {
          const opt = options[idx];
          if (!opt) return;
          const cleanOpt = opt.replace(/[\.\,\;\:\"]+/g, '').trim();
          let s = 0;
          if (cleanOpt.length >= 3 && new RegExp('\"' + cleanOpt + '\"', 'i').test(explText)) s += 20;
          const words = cleanOpt.toLowerCase().split(/\s+/).filter(w => w.length > 3);
          for (const w of words) {
            if (explText.toLowerCase().includes(w)) s += 2;
          }
          if (s > bestScore) {
            bestScore = s;
            answer = l;
          }
        });
      }

      const explMatch = aBlock.match(/Explanation:\s*([\s\S]+)/i);
      const explanation = explMatch ? explMatch[1].trim().replace(/\n/g, ' ') : '';

      p7Questions.push({
        id: lessonNum * 100 + q,
        question: `${q}. ${qText}`,
        options,
        answer,
        explanation
      });
    }
  }

  const rawTopic = lessonTitles[lessonNum] || `Bài ${lessonNum}`;
  const cleanTopic = rawTopic.replace(/^Bài\s*\d+\s*:\s*/i, "");
  const padNum = String(lessonNum).padStart(2, "0");

  return {
    id: lessonNum,
    title: `Đề ${padNum}: ${cleanTopic}`,
    level: "Trung bình",
    duration: 20,
    totalQuestions: p5Questions.length + p6Questions.length + p7Questions.length,
    description: `Đề ôn luyện đọc hiểu chủ đề ${cleanTopic} gồm Part 5 (6 câu), Part 6 (3 câu) và Part 7 (5 câu). Trích xuất chuẩn từ giáo trình 600 Từ Vựng TOEIC.`,
    parts: [
      {
        part: 5,
        name: "Part 5: Incomplete Sentences",
        questions: p5Questions
      },
      {
        part: 6,
        name: "Part 6: Text Completion",
        passage: p6Passage,
        questions: p6Questions
      },
      {
        part: 7,
        name: "Part 7: Reading Comprehension",
        passage: p7Passage,
        questions: p7Questions
      }
    ]
  };
}

module.exports = { extractLessonTest, lessonTitles };

if (require.main === module) {
  (async () => {
    const t1 = await extractLessonTest(1);
    console.log('Test 1 summary:');
    console.log('Title:', t1.title);
    console.log('Total questions:', t1.totalQuestions);
    console.log('P5 count:', t1.parts[0].questions.length);
    console.log('P6 count:', t1.parts[1].questions.length, 'Passage len:', t1.parts[1].passage.length);
    console.log('P7 count:', t1.parts[2].questions.length, 'Passage len:', t1.parts[2].passage.length);
    console.log('\nSample P5 Q10:', t1.parts[0].questions[0]);
    console.log('\nSample P6 Q16:', t1.parts[1].questions[0]);
    console.log('\nSample P7 Q19:', t1.parts[2].questions[0]);
  })();
}
