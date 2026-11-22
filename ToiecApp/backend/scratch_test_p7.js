const fs = require('fs');
const { PDFParse } = require('./node_modules/pdf-parse');

function cleanText(t) {
  return t
    .replace(/--\s*\d+\s*of\s*\d+\s*--[^\n]*/gi, '')
    .replace(/Mun English[^\n]*/gi, '')
    .replace(/Follow kênh youtube[^\n]*/gi, '')
    .trim();
}

async function testP7SmartMatch() {
  const files = fs.readdirSync('../../test').filter(f => f.endsWith('.pdf'));
  const lessons = files.map(f => {
    const m = f.match(/LESSON\s*(\d+)/i);
    return { file: f, num: m ? parseInt(m[1]) : 0 };
  }).sort((a,b) => a.num - b.num);

  const results = {};

  for (const l of lessons) {
    const buf = fs.readFileSync('../../test/' + l.file);
    const p = new PDFParse({ data: buf });
    const text = cleanText((await p.getText()).text);
    const dapAnIdx = text.search(/ĐÁP ÁN VÀ GIẢI THÍCH/i);
    const dapAn = text.substring(dapAnIdx);

    const lessonAnswers = [];

    for (let q = 19; q <= 23; q++) {
      const nextQ = q < 23 ? (q + 1) + '\\.' : '$';
      const m = dapAn.match(new RegExp('(?:^|\\n)\\s*' + q + '\\.\\s*([\\s\\S]*?)(?=(?:\\n\\s*' + nextQ + '|$))', 'i'));
      if (!m) {
        lessonAnswers.push({ q, ans: '?', confidence: 0 });
        continue;
      }
      const block = m[1];
      const direct = block.match(/Answer:\s*\(([A-D])\)/i);
      if (direct) {
        lessonAnswers.push({ q, ans: direct[1].toUpperCase(), confidence: 100 });
        continue;
      }

      // Extract options (A), (B), (C), (D)
      const optBlocks = [...block.matchAll(/\(([A-D])\)\s*([^(\n\r]+)/g)];
      const opts = { A: '', B: '', C: '', D: '' };
      const optsVn = { A: '', B: '', C: '', D: '' };
      for (const ob of optBlocks) {
        const letter = ob[1].toUpperCase();
        if (!opts[letter]) opts[letter] = ob[2].trim();
        else if (!optsVn[letter]) optsVn[letter] = ob[2].trim();
      }

      const expl = (block.match(/Explanation:\s*([\s\S]+)/i) || [])[1]?.trim() || '';

      // Score each option
      const scores = { A: 0, B: 0, C: 0, D: 0 };
      for (const [letter, optText] of Object.entries(opts)) {
        const vnText = optsVn[letter] || '';
        const combined = (optText + ' ' + vnText).toLowerCase();
        
        // Exact synonym match in quotes e.g. "Guarantee"
        const cleanOpt = optText.trim().replace(/[\.\,\;\:\"]+/g, '');
        if (cleanOpt.length >= 3 && new RegExp('\"' + cleanOpt + '\"', 'i').test(expl)) {
          scores[letter] += 20;
        }

        // Token matching
        const words = combined.replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, ' ')
          .split(/\s+/).filter(w => w.length >= 3 && !['đồng', 'nghĩa', 'trong', 'ngữ', 'cảnh', 'nghĩa', 'chính', 'xác', 'nhất', 'dòng', 'của'].includes(w));
        
        for (const w of words) {
          if (expl.toLowerCase().includes(w)) {
            scores[letter] += 1;
          }
        }
      }

      const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
      const topChoice = sorted[0];
      const runnerUp = sorted[1];
      const confidence = topChoice[1] > runnerUp[1] ? (topChoice[1] - runnerUp[1]) : 0;
      lessonAnswers.push({
        q,
        ans: topChoice[0],
        scores,
        confidence
      });
    }
    results[l.num] = lessonAnswers;
  }

  let totalLowConf = 0;
  for (let i = 1; i <= 50; i++) {
    const list = results[i] || [];
    const low = list.filter(x => x.confidence <= 0);
    if (low.length > 0) {
      totalLowConf += low.length;
      console.log('L' + i + ' low confidence in Qs:', low.map(x => x.q + '(' + JSON.stringify(x.scores) + ')').join(', '));
    }
  }
  console.log('Total questions needing disambiguation:', totalLowConf, '/ 250');
}
testP7SmartMatch();
