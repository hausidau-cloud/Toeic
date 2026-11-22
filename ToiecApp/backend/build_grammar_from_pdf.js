const fs = require('fs');
const path = require('path');
const pool = require('./config/mysql');

const grammarTopics = [
  {
    id: 1,
    title: "Bài 1: Câu Từ Loại (Word Forms - N, V, Adj, Adv)",
    slug: "tu-loai",
    level: "Trọng tâm Part 5 (30-40% đề thi)",
    summary: "Nhận biết chính xác Danh từ, Tính từ, Động từ, Trạng từ qua hậu tố và công thức vị trí vàng trong đề thi TOEIC.",
    tips: [
      "Không cần dịch hết câu: chỉ cần nhìn từ đứng ngay trước và ngay sau chỗ trống để xác định loại từ cần điền.",
      "Sau mạo từ (a/an/the), tính từ sở hữu (my/his/her...), từ hạn định (all/many/several) bắt buộc cần Danh từ.",
      "Công thức cụm danh từ kinh điển: (a/an/the) + ADV + ADJ + NOUN. Ví dụ: a really beautiful building.",
      "Cảnh giác danh từ tận cùng -ive và -al dễ nhầm với tính từ: representative (người đại diện), initiative (sáng kiến), alternative (phương án thay thế), proposal (đề xuất), approval (sự phê duyệt), renewal (sự gia hạn).",
      "Giữa 'to' và động từ nguyên mẫu V(bare) cần Trạng từ: to + ADV + V (ví dụ: to precisely regulate)."
    ],
    theory: `### 1. Dấu hiệu nhận biết loại từ qua hậu tố (Suffixes)
* **Danh từ (Noun):** Thường kết thúc bằng: \`-tion, -ment, -ness, -ence, -ance, -ty, -cy, -ure, -ism, -er, -or, -ant\`
  * *Ví dụ:* *development, happiness, confidence, quality, privacy, procedure, supervisor, applicant, attendance.*
* **Tính từ (Adjective):** Thường kết thúc bằng: \`-able, -ible, -ful, -ic, -al, -ent, -ant, -ive, -ous, -ed, -ing\`
  * *Ví dụ:* *reliable, successful, economic, commercial, independent, competitive, dangerous, excited, exciting.*
* **Trạng từ (Adverb):** Cấu tạo bằng: **ADV = ADJ + ly**
  * *Ví dụ:* *sincerely, precisely, regularly, significantly, completely, cautiously.*
* **Động từ (Verb):** Thường kết thúc bằng: \`-ize, -ise, -ate, -fy, -en\`
  * *Ví dụ:* *organize, evaluate, simplify, strengthen, regularize.*

---

### 2. Các công thức vị trí vàng trong Part 5
* **Adj + N:** *a professional seminar*
* **Adv + Adj + N:** *a highly competitive market*
* **N + N (Danh từ ghép):** *application form, expiration date, performance appraisal, assembly line*
* **To be / Linking verb + Adj:** *become financially secure, remain competitive, seem reasonable*
* **Cấu trúc Make / Find / Keep / Deem / Consider + O + Adj:** *We find this feature very useful.*
* **To + ADV + V(bare):** *guaranteed to precisely regulate the temperature.*
* **V + ADV hoặc ADV + V:** *regularly inspects the facility, answered clearly.*`,
    questions: [
      {
        id: 101,
        question: "Our ongoing -------- development seminars allow staff members to develop their skills in various directions.",
        options: { A: "Profession", B: "Professionally", C: "Professional", D: "Professionalism" },
        correct_answer: "C",
        explanation: "Trước cụm danh từ 'development seminars' cần một Tính từ để bổ nghĩa: professional development seminars (các buổi hội thảo phát triển chuyên môn)."
      },
      {
        id: 102,
        question: "Crawford Devices is guaranteed to -------- regulate the temperature of any commercial refrigerator.",
        options: { A: "Precisely", B: "Precise", C: "Precision", D: "Preciseness" },
        correct_answer: "A",
        explanation: "Giữa 'to' và động từ nguyên mẫu 'regulate' cần một Trạng từ (Precisely) để bổ nghĩa: to precisely regulate (điều chỉnh một cách chuẩn xác)."
      },
      {
        id: 103,
        question: "Please remember to review the -------- form before submitting your application for the sales position.",
        options: { A: "Attach", B: "Attached", C: "Attaching", D: "Attachment" },
        correct_answer: "B",
        explanation: "Trước danh từ 'form' cần tính từ/phân từ 'attached' mang nghĩa bị động: the attached form (mẫu đơn được đính kèm)."
      },
      {
        id: 104,
        question: "The hard work put in during his younger years made him become financially -------- in his later years.",
        options: { A: "Secure", B: "Securely", C: "Security", D: "Securing" },
        correct_answer: "A",
        explanation: "Sau linking verb 'become' + trạng từ 'financially' cần một Tính từ: become financially secure (trở nên an toàn/vững vàng về mặt tài chính)."
      },
      {
        id: 105,
        question: "To complete the transfer process, all students should send documents -------- from their previous school's administrative office.",
        options: { A: "Directed", B: "Director", C: "Direct", D: "Directly" },
        correct_answer: "D",
        explanation: "Cần một trạng từ 'Directly' để bổ nghĩa cho hành động 'send documents directly from...' (gửi tài liệu trực tiếp từ văn phòng quản lý)."
      },
      {
        id: 106,
        question: "Employees must reserve a time to copy by writing their names on the ------- on the lid of the photocopiers.",
        options: { A: "schedule", B: "scheduled", C: "schedules", D: "schedulers" },
        correct_answer: "A",
        explanation: "Sau mạo từ 'the' và trước giới từ 'on' cần một Danh từ số ít đếm được: on the schedule (trên bảng lịch trình)."
      },
      {
        id: 107,
        question: "Workshop participants were required to be ------- not to choose any reserved front-row seats.",
        options: { A: "caution", B: "cautious", C: "cautiously", D: "cautiousness" },
        correct_answer: "B",
        explanation: "Sau động từ to be 'were required to be' cần Tính từ 'cautious' (cẩn trọng, lưu ý): to be cautious not to..."
      },
      {
        id: 108,
        question: "Road and street signs must be ------- visible even in the distance in order for drivers to know where they are heading.",
        options: { A: "clearness", B: "clear", C: "clearly", D: "clearest" },
        correct_answer: "C",
        explanation: "Bổ nghĩa cho tính từ 'visible' (có thể nhìn thấy) cần một Trạng từ: clearly visible (có thể nhìn thấy rõ ràng)."
      },
      {
        id: 109,
        question: "This course provides students with the tools for thinking about ways to enhance ------- among ethnic groups.",
        options: { A: "collaborative", B: "collaborate", C: "collaborated", D: "collaboration" },
        correct_answer: "D",
        explanation: "Sau ngoại động từ 'enhance' cần một Danh từ làm tân ngữ: enhance collaboration (tăng cường sự hợp tác)."
      },
      {
        id: 110,
        question: "The bids must be reviewed by the engineers to make sure all engineering ------- for the project are met.",
        options: { A: "specific", B: "to specify", C: "specifically", D: "specifications" },
        correct_answer: "D",
        explanation: "Chủ ngữ của mệnh đề 'all engineering -------' trước động từ số nhiều 'are met' cần danh từ số nhiều: engineering specifications (các thông số kỹ thuật)."
      },
      {
        id: 111,
        question: "The new management recognized the importance of this decision and ------- reorganized operational procedures.",
        options: { A: "prompt", B: "promptness", C: "promptly", D: "prompter" },
        correct_answer: "C",
        explanation: "Đứng trước động từ 'reorganized' cần một Trạng từ để bổ nghĩa: promptly reorganized (nhanh chóng tổ chức lại)."
      },
      {
        id: 112,
        question: "It is common practice for a firm to seek a ------- advantage in order to maintain its position in the marketplace.",
        options: { A: "compete", B: "competition", C: "competitive", D: "competitively" },
        correct_answer: "C",
        explanation: "Đứng trước danh từ 'advantage' cần một Tính từ: a competitive advantage (một lợi thế cạnh tranh)."
      },
      {
        id: 113,
        question: "One ------- outcome of the current economic recession is that the growth of merger activity will slow down.",
        options: { A: "possibly", B: "possibility", C: "possibilities", D: "possible" },
        correct_answer: "D",
        explanation: "Trước danh từ 'outcome' cần một Tính từ để bổ nghĩa: one possible outcome (một kết quả khả thi/có thể xảy ra)."
      },
      {
        id: 114,
        question: "Marc Ecko is rumored to be ------- to signing a deal with the licensing firm Iconix.",
        options: { A: "closeness", B: "closing", C: "closely", D: "close" },
        correct_answer: "D",
        explanation: "Cụm tính từ cố định 'be close to + V-ing/N': cận kề, sắp sửa thực hiện điều gì: be close to signing a deal."
      },
      {
        id: 115,
        question: "Note that the hotel's pool and pool deck will be closed until ------- on them is completed later this month.",
        options: { A: "construction", B: "constructed", C: "constructs", D: "constructive" },
        correct_answer: "A",
        explanation: "Sau liên từ chỉ thời gian 'until' và trước vị ngữ 'is completed' cần một Danh từ làm chủ ngữ: until construction is completed."
      },
      {
        id: 116,
        question: "This apartment complex has an ------- exterior design and stylish interior furnishings.",
        options: { A: "attract", B: "attractive", C: "attracted", D: "attraction" },
        correct_answer: "B",
        explanation: "Sau mạo từ 'an' và trước danh từ 'exterior design' cần một Tính từ: an attractive exterior design (thiết kế ngoại thất lôi cuốn/bắt mắt)."
      },
      {
        id: 117,
        question: "He ------- delivers keynote speeches and holds workshops on customer satisfaction strategy.",
        options: { A: "regularize", B: "regularity", C: "regularities", D: "regularly" },
        correct_answer: "D",
        explanation: "Đứng giữa chủ ngữ 'He' và động từ 'delivers' cần một Trạng từ chỉ tần suất: He regularly delivers (Ông ấy thường xuyên thuyết trình)."
      },
      {
        id: 118,
        question: "Needs assessment can help you identify areas for improvement and ultimately help you realize your goals more -------.",
        options: { A: "efficient", B: "efficiency", C: "efficiencies", D: "efficiently" },
        correct_answer: "D",
        explanation: "Bổ nghĩa cho động từ 'realize your goals' cần một Trạng từ: realize goals more efficiently (hiện thực hóa mục tiêu một cách hiệu quả hơn)."
      },
      {
        id: 119,
        question: "The Lincoln museum has the largest ------- of dinosaur fossils in North America.",
        options: { A: "collection", B: "collectable", C: "collective", D: "collected" },
        correct_answer: "A",
        explanation: "Sau tính từ so sánh nhất 'the largest' cần Danh từ: collection of dinosaur fossils (bộ sưu tập hóa thạch khủng long)."
      },
      {
        id: 120,
        question: "Due to his impressive ------- and experience, Rajan was offered interviews with three of Australia's top food companies.",
        options: { A: "qualified", B: "qualifies", C: "qualifications", D: "qualifying" },
        correct_answer: "C",
        explanation: "Sau tính từ 'impressive' và liên từ 'and experience' cần Danh từ số nhiều: qualifications and experience (bằng cấp chuyên môn và kinh nghiệm)."
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2: Mệnh Đề Quan Hệ (Relative Clauses - Who, Whom, Which, That, Whose)",
    slug: "menh-de-quan-he",
    level: "Trọng tâm Part 5 & Part 6 (20-25% đề thi)",
    summary: "Nắm vững đại từ quan hệ (Who, Whom, Which, That, Whose) và cách rút gọn mệnh đề quan hệ chủ động (V-ing) / bị động (V-ed).",
    tips: [
      "WHO thay cho người làm Chủ ngữ: Who + Verb.",
      "WHOM thay cho người làm Tân ngữ: Whom + Subject + Verb.",
      "WHOSE chỉ sở hữu: Whose + Noun (không có mạo từ a/an/the trước Noun).",
      "THAT dùng được cho cả người và vật, nhưng KHÔNG đứng sau dấu phẩy và KHÔNG đứng sau giới từ.",
      "Mệnh đề quan hệ rút gọn: Chủ động dùng V-ing (+ Tân ngữ), Bị động dùng Ved/V3 (không có tân ngữ theo sau).",
      "Cụm 'Those who + V(số nhiều)': Những người mà..."
    ],
    theory: `### 1. Bảng đại từ quan hệ cơ bản
| Đại từ | Thay thế cho | Vai trò trong mệnh đề | Công thức nhận biết |
| :--- | :--- | :--- | :--- |
| **WHO** | Người | Chủ ngữ | \`... N(người) + WHO + Verb\` |
| **WHOM** | Người | Tân ngữ | \`... N(người) + WHOM + S + Verb\` |
| **WHICH** | Vật, sự việc | Chủ ngữ hoặc Tân ngữ | \`... N(vật) + WHICH + V / S+V\` |
| **THAT** | Người hoặc vật | Thay thế cho Who, Whom, Which | Không dùng sau dấu phẩy, không dùng sau giới từ |
| **WHOSE** | Sở hữu | Tính từ sở hữu | \`... N1 + WHOSE + N2\` (N2 thuộc về N1) |

---

### 2. Các quy tắc vàng với 'THAT' và 'THOSE'
* **Bắt buộc dùng THAT sau:** *the only, the first, the last, all, every, any, so sánh nhất (the most...)*
* **Cụm 'Those who':** Mang nghĩa là "Những người mà...". Động từ theo sau chia số nhiều.
  * *Ví dụ:* *Those who cannot attend the meeting must inform HR.*
* **What = the thing which:** *do what I want = do the thing which I want.*

---

### 3. Rút gọn Mệnh Đề Quan Hệ (MDQHRG)
* **Dạng Chủ Động ➔ Rút gọn thành V-ing:**
  * *The employee who works in Marketing ➔ The employee working in Marketing...*
* **Dạng Bị Động ➔ Rút gọn thành V-ed / V3:**
  * *The report that was submitted yesterday ➔ The report submitted yesterday...*
  * *The job fair which was held last week ➔ The job fair held last week...*`,
    questions: [
      {
        id: 201,
        question: "It is the only phone in the office ------- works during a power outage.",
        options: { A: "that", B: "which", C: "whom", D: "whose" },
        correct_answer: "A",
        explanation: "Sau cụm từ chỉ tính duy nhất 'the only + Noun', đại từ quan hệ ưu tiên bắt buộc dùng 'that'."
      },
      {
        id: 202,
        question: "You are the most dedicated employee ------- I have ever worked with in my entire career.",
        options: { A: "that", B: "whom", C: "who", D: "which" },
        correct_answer: "A",
        explanation: "Sau cấu trúc so sánh nhất 'the most dedicated employee', đại từ quan hệ chuẩn xác nhất là 'that'."
      },
      {
        id: 203,
        question: "Please meet Mr. Johnson, about ------- I told you during yesterday's department meeting.",
        options: { A: "whom", B: "who", C: "which", D: "that" },
        correct_answer: "A",
        explanation: "Đứng sau giới từ 'about' và thay thế cho người (Mr. Johnson) bắt buộc phải dùng 'whom' (không dùng who hoặc that sau giới từ)."
      },
      {
        id: 204,
        question: "------- who cannot attend the weekly staff meeting must inform their department managers immediately.",
        options: { A: "Those", B: "That", C: "These", D: "This" },
        correct_answer: "A",
        explanation: "Cấu trúc đại từ kinh điển trong Part 5 TOEIC: 'Those who + V(số nhiều)': Những người mà..."
      },
      {
        id: 205,
        question: "Hansen's Business Monthly is requesting that high-level executives complete a survey detailing ------- their daily tasks consist of.",
        options: { A: "what", B: "how", C: "when", D: "which" },
        correct_answer: "A",
        explanation: "'what' đóng vai trò tân ngữ của giới từ 'consist of' (consist of what = bao gồm những điều gì)."
      },
      {
        id: 206,
        question: "Amin and Sonya, both of ------- sculptures are currently on display in the Wedgewood Gallery, are Russell School students.",
        options: { A: "who", B: "their", C: "they", D: "whose" },
        correct_answer: "D",
        explanation: "Cấu trúc sở hữu sau lượng từ và giới từ: 'both of whose + Noun' (cả hai người mà các tác phẩm điêu khắc của họ...)."
      },
      {
        id: 207,
        question: "She is talking about the famous author ------- book is currently one of the best-sellers this year.",
        options: { A: "which", B: "whose", C: "that", D: "who" },
        correct_answer: "B",
        explanation: "Chỉ mối quan hệ sở hữu giữa 'author' và 'book' (cuốn sách của tác giả): N1 + whose + N2."
      },
      {
        id: 208,
        question: "He bought all the reference books ------- are needed for the upcoming engineering certification exam.",
        options: { A: "that", B: "what", C: "those", D: "who" },
        correct_answer: "A",
        explanation: "Sau từ chỉ lượng 'all the books', đại từ quan hệ dùng 'that' làm chủ ngữ thay cho danh từ chỉ vật."
      },
      {
        id: 209,
        question: "The children, ------- parents are distinguished university professors, are taught exceptionally well.",
        options: { A: "that", B: "whom", C: "whose", D: "their" },
        correct_answer: "C",
        explanation: "Chỉ sự sở hữu giữa 'children' và 'parents' (cha mẹ của những đứa trẻ): whose parents."
      },
      {
        id: 210,
        question: "Do you know the guest speaker ------- we met at the international marketing conference last week?",
        options: { A: "which", B: "whose", C: "where", D: "whom" },
        correct_answer: "D",
        explanation: "Thay thế cho tân ngữ chỉ người 'guest speaker' trong mệnh đề 'we met [him] last week' dùng 'whom' (hoặc who)."
      },
      {
        id: 211,
        question: "The practical exercises which we are currently doing in class ------- very helpful for the real exam.",
        options: { A: "is", B: "has been", C: "are", D: "was" },
        correct_answer: "C",
        explanation: "Chủ ngữ chính của câu là danh từ số nhiều 'The practical exercises' nên động từ to be chia ở số nhiều thì hiện tại: 'are'."
      },
      {
        id: 212,
        question: "The man ------- next to me kept talking during the presentation, which really annoyed the audience.",
        options: { A: "having sat", B: "sitting", C: "to sit", D: "sits" },
        correct_answer: "B",
        explanation: "Rút gọn mệnh đề quan hệ chủ động: 'The man who was sitting next to me' ➔ 'The man sitting next to me'."
      },
      {
        id: 213,
        question: "This is the corporate headquarters in ------- our executive board has worked for over two decades.",
        options: { A: "which", B: "that", C: "whom", D: "where" },
        correct_answer: "A",
        explanation: "Sau giới từ 'in' chỉ địa điểm dùng đại từ 'which' (in which = where; không được dùng that sau giới từ)."
      },
      {
        id: 214,
        question: "To order supplies by mail, fill out the form in your catalog and mail it in the envelope -------.",
        options: { A: "provide", B: "provided", C: "provides", D: "providing" },
        correct_answer: "B",
        explanation: "Rút gọn mệnh đề quan hệ mang nghĩa bị động: 'the envelope which was provided' ➔ 'the envelope provided' (phong bì được cung cấp)."
      },
      {
        id: 215,
        question: "Customers ------- purchase more than 500 dollars worth of items can request an HDTV cable box at no charge.",
        options: { A: "who", B: "whom", C: "whose", D: "which" },
        correct_answer: "A",
        explanation: "Đại từ quan hệ 'who' làm chủ ngữ thay thế cho danh từ chỉ người 'Customers' trước động từ 'purchase'."
      },
      {
        id: 216,
        question: "The recruitment advertising meeting that was scheduled for tomorrow morning has been -------.",
        options: { A: "abbreviated", B: "terminated", C: "postponed", D: "scheduled" },
        correct_answer: "C",
        explanation: "'that was scheduled' là mệnh đề quan hệ; động từ chính của câu là 'has been postponed' (đã bị hoãn lại)."
      },
      {
        id: 217,
        question: "All the senior accountants are required to compile an official report which ------- annual corporate spending.",
        options: { A: "corresponds", B: "expects", C: "details", D: "prepares" },
        correct_answer: "C",
        explanation: "Mệnh đề quan hệ 'which details...' mang nghĩa: bản báo cáo trong đó nêu chi tiết các khoản chi tiêu hàng năm."
      },
      {
        id: 218,
        question: "The job fair ------- in the City Center last week is considered the most successful event so far.",
        options: { A: "holding", B: "held", C: "holds", D: "was held" },
        correct_answer: "B",
        explanation: "Rút gọn mệnh đề quan hệ bị động: 'The job fair which was held...' ➔ 'The job fair held...' (hội chợ việc làm được tổ chức...)."
      }
    ]
  },
  {
    id: 3,
    title: "Bài 3: Tính Từ (Adjectives - V-ed vs V-ing & Tính từ gốc)",
    slug: "tinh-tu",
    level: "Trọng tâm Part 5 (15-20% đề thi)",
    summary: "Phân biệt tính từ đuôi -ed và -ing, các tính từ tận cùng đặc biệt, và trật tự vị trí tính từ trong bài thi TOEIC.",
    tips: [
      "Tính từ đuôi -ED: Mang nghĩa bị động, hoặc diễn tả cảm xúc của con người (interested: cảm thấy thích thú, satisfied: cảm thấy hài lòng).",
      "Tính từ đuôi -ING: Mang nghĩa chủ động, hoặc diễn tả bản chất, tính chất của sự vật/sự việc (interesting: thú vị, exciting: hào hứng).",
      "Trước Danh từ nếu có cả V-ed và Tính từ gốc, ưu tiên chọn Tính từ gốc (ví dụ: commercial success chứ không chọn commerced).",
      "Các tính từ đi kèm giới từ cố định: be interested in, be satisfied with, be aware of, be responsible for, be eligible for."
    ],
    theory: `### 1. Phân biệt Tính từ -ED và -ING
* **V-ed (Bị động / Cảm xúc):** Diễn tả cảm giác mà người hoặc vật nhận được.
  * *Ví dụ:* *an excited customer (vị khách đang hào hứng), the enclosed booklet (cuốn cẩm nang được đính kèm), estimated costs (chi phí được ước tính).*
* **V-ing (Chủ động / Bản chất):** Diễn tả tính chất vốn có của một sự việc hoặc sự vật tạo ra cảm giác đó.
  * *Ví dụ:* *an exciting career (một sự nghiệp đầy hào hứng), demanding schedule (lịch trình khắt khe), existing equipment (thiết bị hiện có).*

---

### 2. Vị trí vàng của Tính từ trong câu TOEIC
* **Trước danh từ để bổ nghĩa:** *an impressive resume, confidential documents*
* **Sau to be và linking verbs (become, seem, look, sound, remain, keep):**
  * *The new policy remains effective.*
* **Cấu trúc: Make / Find / Keep / Deem / Consider + O + ADJ:**
  * *Keep the workspace clean.*
  * *We find the instructions very confusing.*`,
    questions: [
      {
        id: 301,
        question: "Max complained to his boss that the office has not been ------- in 10 years and needs major improvements.",
        options: { A: "renovation", B: "renovate", C: "renovated", D: "renovating" },
        correct_answer: "C",
        explanation: "Sau 'has not been' cần tính từ/phân từ bị động 'renovated': văn phòng chưa từng được cải tạo lại trong 10 năm."
      },
      {
        id: 302,
        question: "The ------- booklet contains detailed information regarding cleaning services that are available.",
        options: { A: "enclose", B: "enclosed", C: "enclosure", D: "enclosing" },
        correct_answer: "B",
        explanation: "Trước danh từ 'booklet' cần tính từ bị động 'enclosed': cuốn cẩm nang được đính kèm."
      },
      {
        id: 303,
        question: "After 15 years as a fashion designer, Mr. Jacobs decided to pursue an ------- career in public relations.",
        options: { A: "excite", B: "excited", C: "exciting", D: "excitement" },
        correct_answer: "C",
        explanation: "Bổ nghĩa cho danh từ 'career' (nghề nghiệp) mang tính chất chủ động tạo ra sự hào hứng, cần tính từ đuôi -ing: an exciting career."
      },
      {
        id: 304,
        question: "We will make a final decision about changing the landscaping of the property after reviewing the ------- costs.",
        options: { A: "estimation", B: "estimate", C: "estimated", D: "estimating" },
        correct_answer: "C",
        explanation: "Trước danh từ 'costs' cần tính từ phân từ bị động 'estimated': estimated costs (các chi phí được ước tính)."
      },
      {
        id: 305,
        question: "The newly ------- electronic components do not meet the strict quality standards of Gem Associates.",
        options: { A: "manufacture", B: "manufactured", C: "manufacturing", D: "manufacturer" },
        correct_answer: "B",
        explanation: "Sau trạng từ 'newly' và trước danh từ 'electronic components' cần tính từ bị động: newly manufactured (được sản xuất mới đây)."
      }
    ]
  },
  {
    id: 4,
    title: "Bài 4: Động Từ (Verbs - Chia thì, To-V, V-ing, Modal Verbs)",
    slug: "dong-tu",
    level: "Trọng tâm Part 5 (20-25% đề thi)",
    summary: "Nắm chắc các thì hay ra trong TOEIC, dạng động từ nguyên mẫu có 'to' (To-V), danh động từ (V-ing) và động từ khiếm khuyết.",
    tips: [
      "Bước 1 làm bài chia động từ: Xác định câu đã có Động từ chính chưa (tránh chọn thừa động từ chính khi câu chỉ cần rút gọn).",
      "Bước 2: Xác định Chủ ngữ là số ít hay số nhiều để loại trừ các phương án sai hòa hợp.",
      "Bước 3: Nhìn dấu hiệu thời gian (yesterday, tomorrow, recently, since, for) để chọn thì chuẩn xác.",
      "Các động từ đi với To-V: plan, decide, agree, offer, promise, afford, refuse, hope, expect.",
      "Các động từ đi với V-ing: consider, suggest, recommend, avoid, postpone, delay, admit, finish."
    ],
    theory: `### 1. Dấu hiệu các thì trọng tâm trong TOEIC
* **Hiện tại hoàn thành (Have/Has + Ved/V3):** *since, for + khoảng thời gian, recently, already, just, yet, over the past few years.*
* **Quá khứ đơn (Ved / V2):** *yesterday, ago, last week, in 2020.*
* **Tương lai đơn (Will + V_bare):** *tomorrow, next week, upcoming, soon.*
* **Hiện tại đơn:** Diễn tả lịch trình, sự thật hiển nhiên: *always, regularly, frequently, every day.*

---

### 2. Bảng phân loại To-V và V-ing
* **Động từ + TO-V:** *agree to, decide to, refuse to, plan to, hope to, fail to, attempt to, offer to, afford to.*
* **Động từ + V-ING:** *consider + Ving, suggest + Ving, postpone + Ving, avoid + Ving, recommend + Ving.*
* **Giới từ + V-ING:** Mọi giới từ *(in, on, at, of, with, without, before, after...)* khi đi với động từ đều dùng **V-ing**.`,
    questions: [
      {
        id: 401,
        question: "Travel expenses should be ------- no later than 30 calendar days after returning from an official business trip.",
        options: { A: "submit", B: "submits", C: "submitted", D: "submission" },
        correct_answer: "C",
        explanation: "Sau động từ khiếm khuyết bị động 'should be' cần động từ ở dạng quá khứ phân từ Ved/V3: should be submitted (nên được nộp)."
      },
      {
        id: 402,
        question: "Many residents of Alston have expressed ------- to the construction of a new warehouse complex near the lake.",
        options: { A: "oppose", B: "opposing", C: "opposition", D: "opposed" },
        correct_answer: "C",
        explanation: "Sau ngoại động từ 'expressed' cần Danh từ làm tân ngữ: expressed opposition to (bày tỏ sự phản đối đối với...)."
      },
      {
        id: 403,
        question: "A gate agent at the airport announced a flight ------- caused by severe winter weather at the destination.",
        options: { A: "canceling", B: "cancels", C: "cancellation", D: "canceled" },
        correct_answer: "C",
        explanation: "Sau mạo từ 'a' và danh từ 'flight' cần danh từ để tạo thành cụm danh từ: a flight cancellation (sự hủy chuyến bay)."
      },
      {
        id: 404,
        question: "A shipment of plastic ------- has been ordered and will be delivered to the Soto factory tomorrow afternoon.",
        options: { A: "containers", B: "containing", C: "contained", D: "contain" },
        correct_answer: "A",
        explanation: "Sau danh từ chất liệu 'plastic' cần danh từ số nhiều: plastic containers (các thùng/hộp nhựa)."
      },
      {
        id: 405,
        question: "The director has decided ------- the annual company banquet to next month due to renovations.",
        options: { A: "postponing", B: "to postpone", C: "postpone", D: "postponed" },
        correct_answer: "B",
        explanation: "Động từ 'decide' luôn đi kèm động từ nguyên mẫu có to: decide to postpone (quyết định hoãn)."
      }
    ]
  },
  {
    id: 5,
    title: "Bài 5: So Sánh Hơn & So Sánh Nhất (Comparisons)",
    slug: "so-sanh",
    level: "Trọng tâm Part 5 (10-15% đề thi)",
    summary: "Cấu trúc so sánh bằng (as...as), so sánh hơn (-er / more...than) và so sánh nhất (the -est / the most) trong TOEIC.",
    tips: [
      "Có chữ 'than' trong câu ➔ Nghĩ ngay đến So sánh hơn: tính từ ngắn thêm -er (cheaper, higher), tính từ dài thêm 'more' (more affordable).",
      "Có mạo từ 'the' trước chỗ trống ➔ Nghĩ đến So sánh nhất: tính từ ngắn thêm -est (the fastest), tính từ dài dùng 'the most' (the most reliable).",
      "Các từ bổ nghĩa nhấn mạnh cho so sánh hơn: much, far, significantly, considerably, substantially (ví dụ: much cheaper, considerably higher)."
    ],
    theory: `### 1. Công thức So sánh hơn (Comparative)
* **Tính từ ngắn (1 âm tiết):** \`Adj + er + than\` *(faster than, cheaper than, higher than)*
* **Tính từ dài (từ 2 âm tiết trở lên):** \`More + Adj + than\` *(more expensive than, more competitive than)*
* **Từ nhấn mạnh so sánh hơn:** \`much / far / significantly / considerably + so sánh hơn\`

---

### 2. Công thức So sánh nhất (Superlative)
* **Tính từ ngắn:** \`The + Adj + est\` *(the cheapest, the fastest, the largest)*
* **Tính từ dài:** \`The most + Adj\` *(the most affordable, the most successful, the most popular)*`,
    questions: [
      {
        id: 501,
        question: "The senior technicians concluded that replacing the network system would be ------- than repairing it.",
        options: { A: "most cheaply", B: "cheapest", C: "more cheaply", D: "cheaper" },
        correct_answer: "D",
        explanation: "Sau động từ to be 'would be' và trước từ so sánh 'than' cần tính từ so sánh hơn: cheaper than (rẻ hơn so với)."
      },
      {
        id: 502,
        question: "Sales of domestically built cars dropped by 10.2 percent, reflecting a somewhat ------- demand than expected.",
        options: { A: "weaker", B: "weakly", C: "weakened", D: "more weakly" },
        correct_answer: "A",
        explanation: "Trước danh từ 'demand' và có liên từ 'than' cần tính từ so sánh hơn: a weaker demand than expected (nhu cầu yếu hơn so với dự kiến)."
      },
      {
        id: 503,
        question: "All journalists have a responsibility to double-check any facts presented in their articles to the ------- extent possible.",
        options: { A: "fuller", B: "more fully", C: "most fully", D: "fullest" },
        correct_answer: "D",
        explanation: "Sau 'the' và trước danh từ 'extent' cần tính từ so sánh nhất: to the fullest extent possible (đến mức tối đa có thể)."
      },
      {
        id: 504,
        question: "Sunny Valley Enclave has received several proposals from local businesses and will choose the ------- bid.",
        options: { A: "most affordable", B: "more affordable", C: "affordably", D: "affordability" },
        correct_answer: "A",
        explanation: "Sau mạo từ 'the' và trước danh từ 'bid' cần tính từ so sánh nhất: the most affordable bid (mức giá đấu thầu hợp lý/phải chăng nhất)."
      },
      {
        id: 505,
        question: "Patel Flooring's yearly revenue was substantially ------- than that of last year, largely due to a new product launch.",
        options: { A: "high", B: "highly", C: "higher", D: "highness" },
        correct_answer: "C",
        explanation: "Sau to be 'was', có từ nhấn mạnh 'substantially' và từ so sánh 'than' ➔ chọn tính từ so sánh hơn 'higher'."
      }
    ]
  },
  {
    id: 6,
    title: "Bài 6: Trạng Từ & Vị Trí Trọng Tâm (Adverbs in Part 5)",
    slug: "trang-tu",
    level: "Trọng tâm Part 5 (15-20% đề thi)",
    summary: "Nhận diện vị trí đắc địa của trạng từ và các trạng từ ăn điểm thường xuyên xuất hiện trong đề thi TOEIC.",
    tips: [
      "Trạng từ có thể bỏ đi mà câu vẫn hoàn chỉnh về mặt ngữ pháp: S + (ADV) + V + (ADV) + O + (ADV).",
      "Vị trí 1: Đứng trước động từ thường (He regularly visits).",
      "Vị trí 2: Đứng giữa trợ động từ và động từ chính: have + ADV + Ved (have significantly increased, has been promptly resolved).",
      "Vị trí 3: Đứng trước tính từ để bổ nghĩa mức độ: a really beautiful girl, widely regarded, highly recommended."
    ],
    theory: `### 1. Bốn vị trí kinh điển của Trạng từ trong Part 5
* **Giữa to be / trợ động từ và V3/Ved:** \`to be + ADV + Ved/V3\` *(is widely regarded, was answered clearly, has been noticeably improved)*
* **Giữa to và động từ nguyên mẫu:** \`to + ADV + V_bare\` *(to sincerely apologize, to promptly review)*
* **Đứng trước Tính từ:** \`ADV + ADJ + N\` *(an extremely reliable service)*
* **Đứng cuối câu bổ nghĩa cho cả hành động:** *answered the question clearly, realize your goals efficiently.*`,
    questions: [
      {
        id: 601,
        question: "We ------- apologize for our billing mistake and will credit your account immediately.",
        options: { A: "sincerely", B: "sincere", C: "serenity", D: "more sincere" },
        correct_answer: "A",
        explanation: "Đứng giữa chủ ngữ 'We' và động từ 'apologize' cần Trạng từ: We sincerely apologize (Chúng tôi chân thành xin lỗi)."
      },
      {
        id: 602,
        question: "Dr. James Hanser is ------- regarded as the leading climate change scientist in the country.",
        options: { A: "wider", B: "widely", C: "widened", D: "widening" },
        correct_answer: "B",
        explanation: "Đứng giữa 'is' và quá khứ phân từ 'regarded' cần trạng từ: is widely regarded as (được công nhận rộng rãi là)."
      },
      {
        id: 603,
        question: "Since we lengthened the company's lunch break by 30 minutes, workplace morale has ------- improved.",
        options: { A: "noticeable", B: "noticeably", C: "notice", D: "noticing" },
        correct_answer: "B",
        explanation: "Đứng giữa trợ động từ 'has' và động từ 'improved' cần Trạng từ: has noticeably improved (đã cải thiện một cách rõ rệt)."
      },
      {
        id: 604,
        question: "Audience members were impressed that the difficult question asked of the candidate was answered -------.",
        options: { A: "clearly", B: "clear", C: "cleared", D: "clearing" },
        correct_answer: "A",
        explanation: "Bổ nghĩa cho động từ bị động 'was answered' cần một Trạng từ: was answered clearly (đã được trả lời rõ ràng)."
      },
      {
        id: 605,
        question: "If you participate in online community forums and attend regional events -------, you will expand your professional network.",
        options: { A: "regularly", B: "regular", C: "regulars", D: "regularity" },
        correct_answer: "A",
        explanation: "Bổ nghĩa cho hành động 'attend regional events' cần trạng từ chỉ tần suất: attend regularly (tham dự đều đặn/thường xuyên)."
      }
    ]
  },
  {
    id: 7,
    title: "Bài 7: Câu Điều Kiện & Đảo Ngữ (Conditionals & Inversions)",
    slug: "cau-dieu-kien",
    level: "Trọng tâm Part 5 (10-15% đề thi)",
    summary: "Cấu trúc câu điều kiện loại 1, 2, 3 và đặc biệt là công thức đảo ngữ 'Should + S + V' thường xuyên xuất hiện ở câu khó TOEIC.",
    tips: [
      "Đảo ngữ câu điều kiện loại 1: Đứng đầu câu có chỗ trống, theo sau là Chủ ngữ + Động từ nguyên mẫu ➔ Chọn ngay 'SHOULD' (Should anyone have questions = If anyone has questions).",
      "Unless = If ... not (Trừ khi / Nếu không). Sau unless luôn là mệnh đề khẳng định.",
      "As long as / Provided that = Miễn là, Với điều kiện là."
    ],
    theory: `### 1. Ba loại câu điều kiện cơ bản
* **Loại 1 (Có thật ở hiện tại/tương lai):** \`If + S + V(hiện tại đơn), S + will / can + V_bare\`
* **Loại 2 (Không có thật ở hiện tại):** \`If + S + Ved / were, S + would / could + V_bare\`
* **Loại 3 (Không có thật trong quá khứ):** \`If + S + had + V3/Ved, S + would have + V3/Ved\`

---

### 2. Đảo ngữ câu điều kiện Part 5 TOEIC (Bẫy điểm cao)
* **Đảo ngữ loại 1:** \`Should + S + V(nguyên mẫu), S + will / can / please + V\`
  * *Ví dụ:* *Should anyone wish to access the system, please enter your password.*
* **Đảo ngữ loại 3:** \`Had + S + V3/Ved, S + would have + V3/Ved\`
  * *Ví dụ:* *Had we known about the delay, we would have informed you.*`,
    questions: [
      {
        id: 701,
        question: "------- anyone wish to access information regarding the status of an order, the user password must be entered.",
        options: { A: "If", B: "Should", C: "Whether", D: "As though" },
        correct_answer: "B",
        explanation: "Đảo ngữ câu điều kiện loại 1: 'Should + S + V(bare)'. Vì chủ ngữ 'anyone' là số ít nhưng động từ 'wish' ở dạng nguyên mẫu, chứng tỏ đây là đảo ngữ của 'If anyone wishes' ➔ chọn 'Should'."
      },
      {
        id: 702,
        question: "------- you require any further assistance with your flight booking, please do not hesitate to contact our customer support.",
        options: { A: "Should", B: "Unless", C: "Although", D: "Because" },
        correct_answer: "A",
        explanation: "Đảo ngữ loại 1: 'Should you require...' = 'If you require...' (Nếu bạn cần thêm sự hỗ trợ...)."
      },
      {
        id: 703,
        question: "The construction work on the new bridge will proceed on schedule ------- severe weather conditions interfere.",
        options: { A: "unless", B: "without", C: "in spite of", D: "because" },
        correct_answer: "A",
        explanation: "'unless' = if not: trừ khi / nếu không có thời tiết xấu can thiệp."
      },
      {
        id: 704,
        question: "------- the shipment arrive by Friday afternoon, the warehouse staff will prepare the delivery immediately.",
        options: { A: "Should", B: "Had", C: "Were", D: "If" },
        correct_answer: "A",
        explanation: "Chủ ngữ 'the shipment' số ít nhưng động từ 'arrive' nguyên mẫu không chia ➔ Đây là đảo ngữ loại 1 với 'Should'."
      },
      {
        id: 705,
        question: "Employees are eligible for travel reimbursement ------- that all original receipts are attached to the expense form.",
        options: { A: "provided", B: "regarding", C: "in order", D: "unless" },
        correct_answer: "A",
        explanation: "Cụm liên từ điều kiện 'provided that' = miễn là, với điều kiện là."
      }
    ]
  },
  {
    id: 8,
    title: "Bài 8: Câu Bị Động & Rút Gọn (Passive Voice)",
    slug: "bi-dong",
    level: "Trọng tâm Part 5 (20-25% đề thi)",
    summary: "Quy tắc nhận diện thể bị động, mẹo phân biệt chủ động vs bị động, và các cụm bị động cố định thường gặp trong TOEIC.",
    tips: [
      "Công thức cốt lõi của thể bị động: BE + V3/Ved.",
      "Mẹo làm bài nhanh: Nhìn phía sau động từ xem có Tân ngữ (O) hay không. Nếu không có tân ngữ theo sau ➔ Đa số chọn dạng Bị động (trừ nội động từ như happen, occur, arrive...).",
      "Các cụm từ bị động cố định ăn điểm Part 5: be satisfied with, be dedicated to, be exposed to, be equipped with, be involved in, be composed of."
    ],
    theory: `### 1. Công thức câu Bị Động các thì chính
* **Hiện tại đơn:** \`am / is / are + V3/Ved\`
* **Quá khứ đơn:** \`was / were + V3/Ved\`
* **Hiện tại hoàn thành:** \`have / has + been + V3/Ved\`
* **Tương lai đơn:** \`will be + V3/Ved\`
* **Động từ khuyết thiếu (Modal verbs):** \`can / must / should / may + be + V3/Ved\`

---

### 2. Các cụm từ Bị Động đề thi TOEIC hay gặp nhất
* **Be disappointed / surprised / shocked + AT**
* **Be engaged / interested / involved + IN**
* **Be composed / made / tired + OF**
* **Be pleased / satisfied / crowded / filled + WITH**
* **Be dedicated / committed / opposed + TO (V-ing / Noun)**`,
    questions: [
      {
        id: 801,
        question: "As a result of our network server recovery efforts, all outgoing email messages ------- yesterday afternoon.",
        options: { A: "have been deleted", B: "will be deleting", C: "were deleted", D: "to delete" },
        correct_answer: "C",
        explanation: "Dấu hiệu thời gian 'yesterday' chỉ quá khứ đơn; chủ ngữ 'email messages' bị xóa nên chia bị động: were deleted."
      },
      {
        id: 802,
        question: "The newly proposed safety regulations were unanimously ------- by the executive committee during the meeting.",
        options: { A: "approval", B: "approved", C: "approving", D: "approve" },
        correct_answer: "B",
        explanation: "Sau to be 'were' và trạng từ 'unanimously' cần quá khứ phân từ Ved/V3 để tạo thể bị động: were unanimously approved (được nhất trí thông qua)."
      },
      {
        id: 803,
        question: "All production staff members are strictly ------- to wear protective helmets and safety goggles in the workshop.",
        options: { A: "required", B: "requiring", C: "requirement", D: "requires" },
        correct_answer: "A",
        explanation: "Cấu trúc bị động: 'be required to do something': được yêu cầu làm điều gì."
      },
      {
        id: 804,
        question: "The meeting room is currently ------- with advanced videoconferencing equipment.",
        options: { A: "equip", B: "equipped", C: "equipping", D: "equipment" },
        correct_answer: "B",
        explanation: "Cụm bị động cố định: 'be equipped with': được trang bị cái gì."
      },
      {
        id: 805,
        question: "Our customer service representatives are deeply ------- to resolving client complaints within 24 hours.",
        options: { A: "committed", B: "committing", C: "commitment", D: "commit" },
        correct_answer: "A",
        explanation: "Cụm tính từ/bị động đi với giới từ 'to': 'be committed to + V-ing': tận tụy, cam kết thực hiện điều gì."
      }
    ]
  },
  {
    id: 9,
    title: "Bài 9: Đại Từ (Pronouns: S, O, Tính từ sở hữu, Phản thân)",
    slug: "dai-tu",
    level: "Trọng tâm Part 5 (15-20% đề thi)",
    summary: "Bảng đại từ nhân xưng, tân ngữ, tính từ sở hữu, đại từ sở hữu và đại từ phản thân trong bài thi TOEIC.",
    tips: [
      "Trước Danh từ: Bắt buộc dùng Tính từ sở hữu (my, his, her, their, our, its).",
      "Làm chủ ngữ đầu câu (trước động từ): Dùng Đại từ nhân xưng (He, She, They, We, It).",
      "Làm tân ngữ sau động từ hoặc giới từ: Dùng Đại từ tân ngữ (him, her, them, us, it).",
      "Nhấn mạnh tự mình làm điều gì: Dùng Đại từ phản thân (himself, herself, themselves, by oneself = on one's own)."
    ],
    theory: `### 1. Bảng tổng hợp Đại Từ TOEIC
| Đại từ chủ ngữ | Đại từ tân ngữ | Tính từ sở hữu (+N) | Đại từ sở hữu | Đại từ phản thân |
| :---: | :---: | :---: | :---: | :---: |
| **I** | me | **my** + N | mine | myself |
| **You** | you | **your** + N | yours | yourself |
| **He** | him | **his** + N | his | himself |
| **She** | her | **her** + N | hers | herself |
| **It** | it | **its** + N | its | itself |
| **We** | us | **our** + N | ours | ourselves |
| **They** | them | **their** + N | theirs | themselves |

---

### 2. Hai cấu trúc Đại từ phản thân ăn điểm
* **by + phản thân:** *by himself, by themselves* = **tự bản thân làm, không có sự trợ giúp**.
* **on + tính từ sở hữu + own:** *on his own, on their own* = *tự lập, tự thân.*`,
    questions: [
      {
        id: 901,
        question: "Mr. Henderson managed to complete the entire market research project all by ------- without any outside assistance.",
        options: { A: "he", B: "him", C: "himself", D: "his" },
        correct_answer: "C",
        explanation: "Cụm từ nhấn mạnh: 'by himself' (tự bản thân ông ấy làm, không cần trợ giúp)."
      },
      {
        id: 902,
        question: "Before signing the agreement, all prospective business partners are advised to review ------- terms thoroughly.",
        options: { A: "it", B: "its", C: "itself", D: "they" },
        correct_answer: "B",
        explanation: "Trước danh từ 'terms' (các điều khoản) cần Tính từ sở hữu 'its' (các điều khoản của bản hợp đồng)."
      },
      {
        id: 903,
        question: "The director commended the software development team for completing ------- project well ahead of schedule.",
        options: { A: "their", B: "theirs", C: "them", D: "themselves" },
        correct_answer: "A",
        explanation: "Đứng trước danh từ 'project' cần Tính từ sở hữu: 'their project' (dự án của họ)."
      },
      {
        id: 904,
        question: "Ms. Patel organized the client files and placed ------- on the supervisor's desk for final review.",
        options: { A: "they", B: "their", C: "them", D: "themselves" },
        correct_answer: "C",
        explanation: "Sau ngoại động từ 'placed' cần Đại từ tân ngữ thay thế cho danh từ số nhiều 'client files': placed them."
      },
      {
        id: 905,
        question: "Employees who work from home are responsible for keeping ------- computer software up to date.",
        options: { A: "their", B: "theirs", C: "them", D: "they" },
        correct_answer: "A",
        explanation: "Trước cụm danh từ 'computer software' cần Tính từ sở hữu 'their'."
      }
    ]
  },
  {
    id: 10,
    title: "Bài 10: Liên Từ & Giới Từ (Conjunctions & Prepositions)",
    slug: "lien-tu-gioi-tu",
    level: "Trọng tâm Part 5 (20-25% đề thi)",
    summary: "Phân biệt rạch ròi giữa Liên từ (đi với Mệnh đề S+V) và Giới từ (đi với Danh từ/V-ing), giải quyết các cặp bẫy kinh điển.",
    tips: [
      "Bước 1: Nhìn phía sau chỗ trống xem là MỆNH ĐỀ (có Chủ ngữ + Động từ chia thì) hay CỤM DANH TỪ / V-ING.",
      "Nếu phía sau là MỆNH ĐỀ (S + V) ➔ Chọn LIÊN TỪ: Although, Because, While, Since, Unless, Provided that.",
      "Nếu phía sau là CỤM N / V-ING ➔ Chọn GIỚI TỪ: Despite, In spite of, Because of, Due to, During, In addition to.",
      "Mẹo nhớ nhanh cặp đôi: Although = Despite / In spite of (Mặc dù); Because = Because of / Due to (Bởi vì); While = During (Trong khi)."
    ],
    theory: `### 1. Bảng đối chiếu Liên Từ vs Giới Từ
| Ý nghĩa | LIÊN TỪ (+ Mệnh đề S + V) | GIỚI TỪ (+ Cụm N / V-ing) |
| :--- | :--- | :--- |
| **Bởi vì** | Because, Since, As, Now that | Because of, Due to, Owing to |
| **Mặc dù** | Although, Even though, Though | Despite, In spite of |
| **Trong khi** | While, Whereas | During (+ N), While (+ V-ing) |
| **Để mà** | So that, In order that | In order to, So as to (+ V_bare) |
| **Bên cạnh đó** | Furthermore, Moreover (+ dấu phẩy) | In addition to, Besides (+ N) |

---

### 2. Các giới từ chỉ thời gian hay gặp trong TOEIC
* **Before / Prior to:** Trước khi
* **After / Following:** Sau khi
* **Within:** Trong vòng (khoảng thời gian)
* **Throughout:** Xuyên suốt (tháng, năm, sự nghiệp)`,
    questions: [
      {
        id: 1001,
        question: "------- relying on printed evaluations, the manager of the southern sector wanted to hear the district supervisor's opinions by phone.",
        options: { A: "Acceding to", B: "Further", C: "Instead of", D: "However" },
        correct_answer: "C",
        explanation: "Trước V-ing 'relying on...' mang nghĩa loại trừ phương án: 'Instead of + V-ing' (Thay vì dựa vào các bản đánh giá in sẵn...)."
      },
      {
        id: 1002,
        question: "------- reserve tickets for this special charity event, please fill in the online registration form below.",
        options: { A: "Furthermore", B: "In order to", C: "As a result of", D: "As to" },
        correct_answer: "B",
        explanation: "Cụm từ chỉ mục đích đi với động từ nguyên mẫu V(bare): 'In order to + V_bare' (Để đặt vé cho sự kiện này...)."
      },
      {
        id: 1003,
        question: "------- the weather is getting cooler, it is important to remember to conserve energy by reducing heating time.",
        options: { A: "However", B: "While", C: "Because of", D: "Now that" },
        correct_answer: "D",
        explanation: "Phía sau là mệnh đề 'the weather is getting cooler'; liên từ 'Now that' mang nghĩa 'Vì giờ đây / Giờ thì...' chỉ nguyên nhân ở hiện tại."
      },
      {
        id: 1004,
        question: "------- the design team is normally expected to work in the office, permission may be granted to work at home occasionally.",
        options: { A: "So that", B: "Although", C: "On behalf of", D: "Therefore" },
        correct_answer: "B",
        explanation: "Phía sau là mệnh đề chỉ sự tương phản đối lập: 'Although + S + V' (Mặc dù đội ngũ thiết kế thường làm việc tại văn phòng...)."
      },
      {
        id: 1005,
        question: "------- unexpected increases in airfares and hotel prices, most salespersons will exceed their travel allowance.",
        options: { A: "In fact", B: "Because of", C: "Since", D: "When" },
        correct_answer: "B",
        explanation: "Phía sau chỗ trống là Cụm danh từ 'unexpected increases in airfares...' nên phải dùng giới từ chỉ nguyên nhân: 'Because of + Noun'."
      },
      {
        id: 1006,
        question: "Hotel guests are kindly reminded to return all electronic room keys ------- checking out at the reception desk.",
        options: { A: "since", B: "around", C: "within", D: "before" },
        correct_answer: "D",
        explanation: "Giới từ chỉ thời gian đứng trước V-ing 'checking out': 'before checking out' (trước khi trả phòng)."
      }
    ]
  }
];

async function seedGrammar() {
  console.log("🚀 Starting seeding of Grammar Topics and Questions extracted from 0 GRAMMAR FOR TOEIC.pdf...");

  // 1. Write to data/grammarData.js
  const filePath = path.join(__dirname, "data/grammarData.js");
  const jsContent = `const grammarData = ${JSON.stringify(grammarTopics, null, 2)};\n\nmodule.exports = grammarData;\n`;
  fs.writeFileSync(filePath, jsContent, "utf8");
  console.log("✓ Saved updated grammar topics to data/grammarData.js");

  // 2. Sync with MySQL Database
  try {
    await pool.query("DELETE FROM grammar_questions");
    await pool.query("DELETE FROM grammar_topics");
    await pool.query("ALTER TABLE grammar_topics AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE grammar_questions AUTO_INCREMENT = 1");

    for (const t of grammarTopics) {
      await pool.query(
        "INSERT INTO grammar_topics (id, title, slug, level, summary, tips, theory) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          t.id,
          t.title,
          t.slug,
          t.level,
          t.summary,
          JSON.stringify(t.tips),
          t.theory
        ]
      );

      for (const q of t.questions) {
        await pool.query(
          "INSERT INTO grammar_questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            t.id,
            q.question,
            q.options.A,
            q.options.B,
            q.options.C,
            q.options.D,
            q.correct_answer,
            q.explanation
          ]
        );
      }
      console.log(`✓ Seeded ${t.title} with ${t.questions.length} questions to MySQL.`);
    }

    console.log("\n🎉 Finished seeding Grammar into MySQL successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MySQL Error during grammar seed:", err.message);
    process.exit(1);
  }
}

seedGrammar();
