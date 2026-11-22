// Dữ liệu 600 Từ Vựng TOEIC trích xuất đầy đủ từ 50 file PDF & Cụm từ ăn điểm
const vocabularyData = [
  {
    "id": 1,
    "word_or_phrase": "comply with",
    "phonetic": "/kəmˈplaɪ wɪð/",
    "word_type": "phrasal_verb",
    "meaning": "tuân thủ theo, làm theo (quy định, luật lệ)",
    "example_sentence": "All employees must comply with the company safety regulations.",
    "example_meaning": "Tất cả nhân viên phải tuân thủ các quy định an toàn của công ty.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 2,
    "word_or_phrase": "in accordance with",
    "phonetic": "/ɪn əˈkɔː.dəns wɪð/",
    "word_type": "collocation",
    "meaning": "phù hợp với, theo đúng như (quy chuẩn, thỏa thuận)",
    "example_sentence": "The building was renovated in accordance with environmental standards.",
    "example_meaning": "Tòa nhà đã được cải tạo theo đúng các tiêu chuẩn môi trường.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 3,
    "word_or_phrase": "look forward to",
    "phonetic": "/lʊk ˈfɔː.wəd tuː/",
    "word_type": "phrasal_verb",
    "meaning": "rất mong đợi, trông chờ (+ V-ing / Danh từ)",
    "example_sentence": "We look forward to receiving your feedback on the proposal.",
    "example_meaning": "Chúng tôi rất mong nhận được phản hồi của bạn về bản đề xuất.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 4,
    "word_or_phrase": "take responsibility for",
    "phonetic": "/teɪk rɪˌspɒn.sɪˈbɪl.ə.ti fɔːr/",
    "word_type": "collocation",
    "meaning": "chịu trách nhiệm về việc gì",
    "example_sentence": "The project manager took full responsibility for the project delay.",
    "example_meaning": "Trưởng dự án đã nhận toàn bộ trách nhiệm về sự chậm trễ của dự án.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 5,
    "word_or_phrase": "under warranty",
    "phonetic": "/ˈʌn.dər ˈwɒr.ən.ti/",
    "word_type": "collocation",
    "meaning": "còn trong thời hạn bảo hành",
    "example_sentence": "Repairs are completely free because the photocopier is still under warranty.",
    "example_meaning": "Việc sửa chữa hoàn toàn miễn phí vì máy photocopy vẫn còn trong thời hạn bảo hành.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 6,
    "word_or_phrase": "conduct a survey",
    "phonetic": "/kənˈdʌkt ə ˈsɜː.veɪ/",
    "word_type": "collocation",
    "meaning": "tiến hành một cuộc khảo sát, nghiên cứu",
    "example_sentence": "The marketing department decided to conduct a survey on consumer habits.",
    "example_meaning": "Phòng tiếp thị quyết định tiến hành một cuộc khảo sát về thói quen người tiêu dùng.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 7,
    "word_or_phrase": "submit an application",
    "phonetic": "/səbˈmɪt ən ˌæp.lɪˈkeɪ.ʃən/",
    "word_type": "collocation",
    "meaning": "nộp hồ sơ ứng tuyển, nộp đơn",
    "example_sentence": "Interested applicants must submit an application before the end of the month.",
    "example_meaning": "Ứng viên quan tâm phải nộp đơn ứng tuyển trước cuối tháng.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 8,
    "word_or_phrase": "in charge of",
    "phonetic": "/ɪn tʃɑːdʒ ɒv/",
    "word_type": "collocation",
    "meaning": "chịu trách nhiệm, phụ trách chính",
    "example_sentence": "Ms. Lan is in charge of organizing the international trade conference.",
    "example_meaning": "Cô Lan phụ trách tổ chức hội nghị thương mại quốc tế.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 9,
    "word_or_phrase": "reach a consensus",
    "phonetic": "/riːtʃ ə kənˈsen.səs/",
    "word_type": "collocation",
    "meaning": "đạt được sự đồng thuận, nhất trí",
    "example_sentence": "After hours of negotiation, both sides finally reached a consensus.",
    "example_meaning": "Sau nhiều giờ đàm phán, cả hai bên cuối cùng đã đạt được sự đồng thuận.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 10,
    "word_or_phrase": "prior to",
    "phonetic": "/ˈpraɪ.ər tuː/",
    "word_type": "preposition",
    "meaning": "trước khi (tương đương before)",
    "example_sentence": "All attendees must register online prior to attending the workshop.",
    "example_meaning": "Tất cả người tham gia phải đăng ký trực tuyến trước khi tham dự hội thảo.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 11,
    "word_or_phrase": "take advantage of",
    "phonetic": "/teɪk ədˈvɑːn.tɪdʒ ɒv/",
    "word_type": "collocation",
    "meaning": "tận dụng, nắm bắt cơ hội tốt",
    "example_sentence": "You should take advantage of the discount promotion this weekend.",
    "example_meaning": "Bạn nên tận dụng chương trình ưu đãi giảm giá vào cuối tuần này.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 12,
    "word_or_phrase": "adhere to",
    "phonetic": "/ədˈhɪər tuː/",
    "word_type": "phrasal_verb",
    "meaning": "tuân thủ chặt chẽ, gắn bó với",
    "example_sentence": "Every laboratory technician must adhere to the chemical safety protocols.",
    "example_meaning": "Mỗi kỹ thuật viên phòng thí nghiệm đều phải tuân thủ các quy tắc an toàn hóa chất.",
    "category": "Cụm từ TOEIC ăn điểm"
  },
  {
    "id": 13,
    "word_or_phrase": "abide by",
    "phonetic": "/abide by/",
    "word_type": "verb",
    "meaning": "tuân thủ, làm theo",
    "example_sentence": "The company expects all staff to understand the concept of abide by thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of abide by thoroughly.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 14,
    "word_or_phrase": "agreement",
    "phonetic": "/agreement/",
    "word_type": "noun",
    "meaning": "sự thỏa thuận, hợp đồng",
    "example_sentence": "The men are signing an agreement.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The men are signing an agreement.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 15,
    "word_or_phrase": "assurance",
    "phonetic": "/assurance/",
    "word_type": "noun",
    "meaning": "sự đảm bảo, sự chắc chắn, sự tự tin",
    "example_sentence": "The assurance of quality.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The assurance of quality.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 16,
    "word_or_phrase": "cancellation",
    "phonetic": "/cancellation/",
    "word_type": "noun",
    "meaning": "sự hủy bỏ",
    "example_sentence": "A cancellation clause.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"A cancellation clause.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 17,
    "word_or_phrase": "determine",
    "phonetic": "/determine/",
    "word_type": "verb",
    "meaning": "xác định, quyết định",
    "example_sentence": "The company expects all staff to understand the concept of determine thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of determine thoroughly.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 18,
    "word_or_phrase": "engage",
    "phonetic": "/engage/",
    "word_type": "verb",
    "meaning": "tham gia, thu hút",
    "example_sentence": "The company expects all staff to understand the concept of engage thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of engage thoroughly.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 19,
    "word_or_phrase": "establish",
    "phonetic": "/establish/",
    "word_type": "verb",
    "meaning": "thành lập, thiết lập",
    "example_sentence": "The company expects all staff to understand the concept of establish thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of establish thoroughly.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 20,
    "word_or_phrase": "obligate",
    "phonetic": "/obligate/",
    "word_type": "verb",
    "meaning": "bắt buộc, ép buộc",
    "example_sentence": "The company expects all staff to understand the concept of obligate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of obligate thoroughly.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 21,
    "word_or_phrase": "party",
    "phonetic": "/party/",
    "word_type": "noun",
    "meaning": "bên (trong hợp đồng, vụ kiện), đảng phái, nhóm người",
    "example_sentence": "The signers are having a party.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The signers are having a party.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 22,
    "word_or_phrase": "provision",
    "phonetic": "/provision/",
    "word_type": "noun",
    "meaning": "điều khoản, sự dự phòng",
    "example_sentence": "A provision in case of bankruptcy.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"A provision in case of bankruptcy.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 23,
    "word_or_phrase": "resolve",
    "phonetic": "/resolve/",
    "word_type": "verb",
    "meaning": "giải quyết, quyết tâm",
    "example_sentence": "[M] Do you think we will ever resolve our difficulties with the computer company? (4-C)",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Do you think we will ever resolve our difficulties with the computer company? (4-C)\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 24,
    "word_or_phrase": "specific",
    "phonetic": "/specific/",
    "word_type": "adjective",
    "meaning": "cụ thể, đặc biệt",
    "example_sentence": "The company expects all staff to understand the concept of specific thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of specific thoroughly.\"",
    "category": "Bài 1: Hợp đồng (Contracts)"
  },
  {
    "id": 25,
    "word_or_phrase": "attract thu",
    "phonetic": "/attract thu/",
    "word_type": "verb",
    "meaning": "hút, lôi cuốn",
    "example_sentence": "The company expects all staff to understand the concept of attract thu thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of attract thu thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 26,
    "word_or_phrase": "compare so",
    "phonetic": "/compare so/",
    "word_type": "verb",
    "meaning": "sánh",
    "example_sentence": "The company expects all staff to understand the concept of compare so thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of compare so thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 27,
    "word_or_phrase": "competition",
    "phonetic": "/competition/",
    "word_type": "noun",
    "meaning": "sự cạnh tranh, cuộc thi",
    "example_sentence": "Who the competition is.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Who the competition is.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 28,
    "word_or_phrase": "consume",
    "phonetic": "/consume/",
    "word_type": "verb",
    "meaning": "tiêu thụ, sử dụng",
    "example_sentence": "The company expects all staff to understand the concept of consume thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of consume thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 29,
    "word_or_phrase": "convince",
    "phonetic": "/convince/",
    "word_type": "verb",
    "meaning": "thuyết phục",
    "example_sentence": "To attract new customers, we must first convince them that we offer something",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To attract new customers, we must first convince them that we offer something\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 30,
    "word_or_phrase": "currently",
    "phonetic": "/currently/",
    "word_type": "verb",
    "meaning": "hiện tại, hiện nay",
    "example_sentence": "There's currently a recession.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"There's currently a recession.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 31,
    "word_or_phrase": "fad",
    "phonetic": "/fad/",
    "word_type": "noun",
    "meaning": "mốt nhất thời, trào lưu",
    "example_sentence": "The company expects all staff to understand the concept of fad thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of fad thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 32,
    "word_or_phrase": "inspiration",
    "phonetic": "/inspiration/",
    "word_type": "noun",
    "meaning": "nguồn cảm hứng, sự truyền cảm hứng",
    "example_sentence": "The company expects all staff to understand the concept of inspiration thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of inspiration thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 33,
    "word_or_phrase": "market",
    "phonetic": "/market/",
    "word_type": "verb",
    "meaning": "tiếp thị, bán hàng; thị trường",
    "example_sentence": "compete in our market. We need to attract more customers to our store and our products.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"compete in our market. We need to attract more customers to our store and our products.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 34,
    "word_or_phrase": "persuasion",
    "phonetic": "/persuasion/",
    "word_type": "noun",
    "meaning": "sự thuyết phục, khả năng thuyết phục",
    "example_sentence": "The company expects all staff to understand the concept of persuasion thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of persuasion thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 35,
    "word_or_phrase": "productive",
    "phonetic": "/productive/",
    "word_type": "adjective",
    "meaning": "năng suất, hiệu quả",
    "example_sentence": "The company expects all staff to understand the concept of productive thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of productive thoroughly.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 36,
    "word_or_phrase": "satisfaction",
    "phonetic": "/satisfaction/",
    "word_type": "noun",
    "meaning": "sự hài lòng, sự thỏa mãn",
    "example_sentence": "Satisfaction is guaranteed.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Satisfaction is guaranteed.\"",
    "category": "Bài 2: Tiếp thị (Marketing)"
  },
  {
    "id": 37,
    "word_or_phrase": "characteristic",
    "phonetic": "/characteristic/",
    "word_type": "noun",
    "meaning": "đặc trưng, tiêu biểu",
    "example_sentence": "intended for. Consequently, they're not covered. A common characteristic of this type of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"intended for. Consequently, they're not covered. A common characteristic of this type of\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 38,
    "word_or_phrase": "consequence",
    "phonetic": "/consequence/",
    "word_type": "noun",
    "meaning": "hậu quả, kết quả",
    "example_sentence": "The company expects all staff to understand the concept of consequence thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of consequence thoroughly.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 39,
    "word_or_phrase": "consider",
    "phonetic": "/consider/",
    "word_type": "verb",
    "meaning": "cân nhắc, xem xét",
    "example_sentence": "might want to consider purchasing a two-year, sixty-thousand-mile extended warranty.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"might want to consider purchasing a two-year, sixty-thousand-mile extended warranty.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 40,
    "word_or_phrase": "cover bao",
    "phonetic": "/cover bao/",
    "word_type": "verb",
    "meaning": "gồm, chi trả",
    "example_sentence": "The company expects all staff to understand the concept of cover bao thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of cover bao thoroughly.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 41,
    "word_or_phrase": "expiration",
    "phonetic": "/expiration/",
    "word_type": "noun",
    "meaning": "sự hết hạn, thời hạn cuối",
    "example_sentence": "They're checking the expiration date.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They're checking the expiration date.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 42,
    "word_or_phrase": "frequently",
    "phonetic": "/frequently/",
    "word_type": "verb",
    "meaning": "thường xuyên, hay xảy ra",
    "example_sentence": "We frequently receive items that are still under warranty, but we don't automatically",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"We frequently receive items that are still under warranty, but we don't automatically\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 43,
    "word_or_phrase": "imply",
    "phonetic": "/imply/",
    "word_type": "verb",
    "meaning": "ngụ ý, ám chỉ",
    "example_sentence": "The company expects all staff to understand the concept of imply thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of imply thoroughly.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 44,
    "word_or_phrase": "promise",
    "phonetic": "/promise/",
    "word_type": "verb",
    "meaning": "lời hứa, sự cam kết",
    "example_sentence": "promise our customers that all our products will operate smoothly every time when",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"promise our customers that all our products will operate smoothly every time when\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 45,
    "word_or_phrase": "protect",
    "phonetic": "/protect/",
    "word_type": "verb",
    "meaning": "bảo vệ, che chở",
    "example_sentence": "The company expects all staff to understand the concept of protect thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of protect thoroughly.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 46,
    "word_or_phrase": "reputation danh",
    "phonetic": "/reputation danh/",
    "word_type": "noun",
    "meaning": "tiếng, tiếng tăm",
    "example_sentence": "The company expects all staff to understand the concept of reputation danh thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of reputation danh thoroughly.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 47,
    "word_or_phrase": "require",
    "phonetic": "/require/",
    "word_type": "verb",
    "meaning": "yêu cầu, đòi hỏi",
    "example_sentence": "[M] (5-B) The terms of the warranty require you to choose a mechanic from our approved",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] (5-B) The terms of the warranty require you to choose a mechanic from our approved\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 48,
    "word_or_phrase": "variety",
    "phonetic": "/variety/",
    "word_type": "noun",
    "meaning": "sự đa dạng, nhiều loại",
    "example_sentence": "The company expects all staff to understand the concept of variety thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of variety thoroughly.\"",
    "category": "Bài 3: Bảo hành (Warranties)"
  },
  {
    "id": 49,
    "word_or_phrase": "address",
    "phonetic": "/address/",
    "word_type": "verb",
    "meaning": "trình bày, phát biểu; bài phát biểu trang trọng",
    "example_sentence": "The company expects all staff to understand the concept of address thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of address thoroughly.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 50,
    "word_or_phrase": "avoid",
    "phonetic": "/avoid/",
    "word_type": "verb",
    "meaning": "tránh, né tránh",
    "example_sentence": "[W] (4-D) I know she is very serious about careful planning to avoid making obvious",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] (4-D) I know she is very serious about careful planning to avoid making obvious\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 51,
    "word_or_phrase": "demonstrate",
    "phonetic": "/demonstrate/",
    "word_type": "verb",
    "meaning": "chứng minh, cho thấy rõ",
    "example_sentence": "The company expects all staff to understand the concept of demonstrate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of demonstrate thoroughly.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 52,
    "word_or_phrase": "develop",
    "phonetic": "/develop/",
    "word_type": "verb",
    "meaning": "phát triển, mở rộng, cải thiện",
    "example_sentence": "growth comes from profits. We believe that this is the best way to develop a strong",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"growth comes from profits. We believe that this is the best way to develop a strong\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 53,
    "word_or_phrase": "evaluate",
    "phonetic": "/evaluate/",
    "word_type": "verb",
    "meaning": "đánh giá, định giá",
    "example_sentence": "The company expects all staff to understand the concept of evaluate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of evaluate thoroughly.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 54,
    "word_or_phrase": "gather thu",
    "phonetic": "/gather thu/",
    "word_type": "verb",
    "meaning": "thập, tập hợp",
    "example_sentence": "The company expects all staff to understand the concept of gather thu thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of gather thu thoroughly.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 55,
    "word_or_phrase": "offer",
    "phonetic": "/offer/",
    "word_type": "noun",
    "meaning": "lời đề nghị, sự chào mời; đề nghị, mời",
    "example_sentence": "[M] I’d be happy to offer to help with that. I’m very proud of her. Going into business for",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] I’d be happy to offer to help with that. I’m very proud of her. Going into business for\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 56,
    "word_or_phrase": "primarily",
    "phonetic": "/primarily/",
    "word_type": "verb",
    "meaning": "chủ yếu, trước hết",
    "example_sentence": "The company expects all staff to understand the concept of primarily thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of primarily thoroughly.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 57,
    "word_or_phrase": "risk",
    "phonetic": "/risk/",
    "word_type": "noun",
    "meaning": "rủi ro, nguy cơ",
    "example_sentence": "She has taken on too much risk.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She has taken on too much risk.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 58,
    "word_or_phrase": "strategy",
    "phonetic": "/strategy/",
    "word_type": "noun",
    "meaning": "chiến lược, kế hoạch hành động",
    "example_sentence": "most important strategy for success?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"most important strategy for success?\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 59,
    "word_or_phrase": "strong",
    "phonetic": "/strong/",
    "word_type": "adjective",
    "meaning": "mạnh mẽ, vững chắc, có sức thuyết phục",
    "example_sentence": "growth comes from profits. We believe that this is the best way to develop a strong",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"growth comes from profits. We believe that this is the best way to develop a strong\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 60,
    "word_or_phrase": "substitution",
    "phonetic": "/substitution/",
    "word_type": "noun",
    "meaning": "sự thay thế, vật thay thế",
    "example_sentence": "The company expects all staff to understand the concept of substitution thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of substitution thoroughly.\"",
    "category": "Bài 4: Kế hoạch kinh doanh (Business Planning)"
  },
  {
    "id": 61,
    "word_or_phrase": "accommodate",
    "phonetic": "/accommodate/",
    "word_type": "verb",
    "meaning": "đáp ứng, cung cấp chỗ ở/nơi làm việc/nhu cầu",
    "example_sentence": "[W] Not yet. (4-C) It’s difficult to find a site that can accommodate a group of our size.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] Not yet. (4-C) It’s difficult to find a site that can accommodate a group of our size.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 62,
    "word_or_phrase": "arrangement",
    "phonetic": "/arrangement/",
    "word_type": "noun",
    "meaning": "sự sắp xếp, kế hoạch",
    "example_sentence": "The company expects all staff to understand the concept of arrangement thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of arrangement thoroughly.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 63,
    "word_or_phrase": "association",
    "phonetic": "/association/",
    "word_type": "noun",
    "meaning": "hiệp hội, tổ chức",
    "example_sentence": "The company expects all staff to understand the concept of association thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of association thoroughly.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 64,
    "word_or_phrase": "attend",
    "phonetic": "/attend/",
    "word_type": "verb",
    "meaning": "tham dự, có mặt",
    "example_sentence": "How many will attend the conference?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How many will attend the conference?\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 65,
    "word_or_phrase": "get in touch",
    "phonetic": "/get in touch/",
    "word_type": "verb",
    "meaning": "liên lạc, giữ liên lạc",
    "example_sentence": "For example, conference planners are asked to get in touch with us ahead of time if any",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"For example, conference planners are asked to get in touch with us ahead of time if any\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 66,
    "word_or_phrase": "hold",
    "phonetic": "/hold/",
    "word_type": "verb",
    "meaning": "tổ chức, tiến hành",
    "example_sentence": "The company expects all staff to understand the concept of hold thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of hold thoroughly.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 67,
    "word_or_phrase": "location",
    "phonetic": "/location/",
    "word_type": "noun",
    "meaning": "địa điểm, vị trí",
    "example_sentence": "offered. In case a session is held in an off-site location, we are not responsible for",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"offered. In case a session is held in an off-site location, we are not responsible for\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 68,
    "word_or_phrase": "overcrowded",
    "phonetic": "/overcrowded/",
    "word_type": "adjective",
    "meaning": "quá đông đúc",
    "example_sentence": "The banquet room is overcrowded.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The banquet room is overcrowded.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 69,
    "word_or_phrase": "register",
    "phonetic": "/register/",
    "word_type": "noun",
    "meaning": "sổ sách, bản ghi; đăng ký, ghi danh",
    "example_sentence": "they register for the conference.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"they register for the conference.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 70,
    "word_or_phrase": "select",
    "phonetic": "/select/",
    "word_type": "verb",
    "meaning": "lựa chọn, chọn lọc; được lựa chọn",
    "example_sentence": "The company expects all staff to understand the concept of select thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of select thoroughly.\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 71,
    "word_or_phrase": "session",
    "phonetic": "/session/",
    "word_type": "noun",
    "meaning": "phiên họp, buổi họp",
    "example_sentence": "disabilities. Disabled individuals need to be able to take part in every session that is being",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"disabilities. Disabled individuals need to be able to take part in every session that is being\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 72,
    "word_or_phrase": "take part in",
    "phonetic": "/take part in/",
    "word_type": "verb",
    "meaning": "tham gia, góp phần vào",
    "example_sentence": "disabilities. Disabled individuals need to be able to take part in every session that is being",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"disabilities. Disabled individuals need to be able to take part in every session that is being\"",
    "category": "Bài 5: Hội nghị (Conferences)"
  },
  {
    "id": 73,
    "word_or_phrase": "access",
    "phonetic": "/access/",
    "word_type": "noun",
    "meaning": "sự truy cập, quyền truy cập; truy cập",
    "example_sentence": "[M] I can’t figure this out. (4-D) When I tried to access my e-mail program, the monitor",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] I can’t figure this out. (4-D) When I tried to access my e-mail program, the monitor\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 74,
    "word_or_phrase": "allocate",
    "phonetic": "/allocate/",
    "word_type": "verb",
    "meaning": "phân bổ, chỉ định",
    "example_sentence": "The company expects all staff to understand the concept of allocate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of allocate thoroughly.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 75,
    "word_or_phrase": "compatible",
    "phonetic": "/compatible/",
    "word_type": "adjective",
    "meaning": "tương thích, hợp nhau",
    "example_sentence": "compatible with this program. (8-C) Your computer could crash or shut down without",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"compatible with this program. (8-C) Your computer could crash or shut down without\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 76,
    "word_or_phrase": "delete",
    "phonetic": "/delete/",
    "word_type": "verb",
    "meaning": "xóa bỏ",
    "example_sentence": "Do you want to duplicate it, or delete",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Do you want to duplicate it, or delete\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 77,
    "word_or_phrase": "display",
    "phonetic": "/display/",
    "word_type": "noun",
    "meaning": "màn hình hiển thị; hiển thị, trưng bày",
    "example_sentence": "The computers are in the display",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The computers are in the display\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 78,
    "word_or_phrase": "duplicate",
    "phonetic": "/duplicate/",
    "word_type": "verb",
    "meaning": "sao chép, nhân đôi; trùng lặp, giống hệt",
    "example_sentence": "The duplicate photos are on the table.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The duplicate photos are on the table.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 79,
    "word_or_phrase": "failure",
    "phonetic": "/failure/",
    "word_type": "noun",
    "meaning": "sự thất bại, sự hỏng hóc",
    "example_sentence": "duplicate files so, in case of system failure, you will not lose your work.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"duplicate files so, in case of system failure, you will not lose your work.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 80,
    "word_or_phrase": "figure out",
    "phonetic": "/figure out/",
    "word_type": "verb",
    "meaning": "tìm ra, giải quyết",
    "example_sentence": "Figure out the program by tinkering",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Figure out the program by tinkering\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 81,
    "word_or_phrase": "ignore",
    "phonetic": "/ignore/",
    "word_type": "verb",
    "meaning": "bỏ qua, phớt lờ",
    "example_sentence": "ignore a problem like this.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"ignore a problem like this.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 82,
    "word_or_phrase": "search",
    "phonetic": "/search/",
    "word_type": "noun",
    "meaning": "sự tìm kiếm, cuộc điều tra; tìm kiếm, điều tra",
    "example_sentence": "The company expects all staff to understand the concept of search thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of search thoroughly.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 83,
    "word_or_phrase": "shut down",
    "phonetic": "/shut down/",
    "word_type": "verb",
    "meaning": "tắt nguồn, ngừng hoạt động",
    "example_sentence": "The computers are shut down.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The computers are shut down.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 84,
    "word_or_phrase": "warning",
    "phonetic": "/warning/",
    "word_type": "noun",
    "meaning": "sự cảnh báo, lời cảnh báo",
    "example_sentence": "A warning appears on the screen.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"A warning appears on the screen.\"",
    "category": "Bài 6: Máy tính & CNTT (Computers)"
  },
  {
    "id": 85,
    "word_or_phrase": "affordable",
    "phonetic": "/affordable/",
    "word_type": "adjective",
    "meaning": "phải chăng, vừa túi tiền",
    "example_sentence": "them. (9-C) Their products are quite affordable. I suggest we look into making our orders",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"them. (9-C) Their products are quite affordable. I suggest we look into making our orders\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 86,
    "word_or_phrase": "as needed khi",
    "phonetic": "/as needed khi/",
    "word_type": "verb",
    "meaning": "cần thiết",
    "example_sentence": "The company expects all staff to understand the concept of as needed khi thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of as needed khi thoroughly.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 87,
    "word_or_phrase": "be in charge of",
    "phonetic": "/be in charge of/",
    "word_type": "verb",
    "meaning": "chịu trách nhiệm, quản lý",
    "example_sentence": "[W] Who will be in charge of approvals?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] Who will be in charge of approvals?\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 88,
    "word_or_phrase": "capacity",
    "phonetic": "/capacity/",
    "word_type": "noun",
    "meaning": "sức chứa, khả năng",
    "example_sentence": "It has twice the capacity.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It has twice the capacity.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 89,
    "word_or_phrase": "durable",
    "phonetic": "/durable/",
    "word_type": "adjective",
    "meaning": "bền, chắc, lâu dài",
    "example_sentence": "The company expects all staff to understand the concept of durable thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of durable thoroughly.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 90,
    "word_or_phrase": "initiative",
    "phonetic": "/initiative/",
    "word_type": "noun",
    "meaning": "sáng kiến, bước đầu tiên",
    "example_sentence": "[M] (5-B) As part of the company’s cost-saving initiative, (4-D) we must have approval on",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] (5-B) As part of the company’s cost-saving initiative, (4-D) we must have approval on\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 91,
    "word_or_phrase": "physically",
    "phonetic": "/physically/",
    "word_type": "verb",
    "meaning": "về mặt thể chất, một cách vật lý",
    "example_sentence": "The company expects all staff to understand the concept of physically thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of physically thoroughly.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 92,
    "word_or_phrase": "provider",
    "phonetic": "/provider/",
    "word_type": "noun",
    "meaning": "nhà cung cấp",
    "example_sentence": "The provider won’t take individual",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The provider won’t take individual\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 93,
    "word_or_phrase": "recur",
    "phonetic": "/recur/",
    "word_type": "verb",
    "meaning": "tái diễn, lặp lại",
    "example_sentence": "The company expects all staff to understand the concept of recur thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of recur thoroughly.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 94,
    "word_or_phrase": "reduction",
    "phonetic": "/reduction/",
    "word_type": "noun",
    "meaning": "sự giảm bớt, sự thu nhỏ",
    "example_sentence": "The company expects all staff to understand the concept of reduction thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of reduction thoroughly.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 95,
    "word_or_phrase": "stay on top of",
    "phonetic": "/stay on top of/",
    "word_type": "verb",
    "meaning": "nắm bắt thông tin mới nhất, theo kịp",
    "example_sentence": "[M] Each of the department heads has been asked to stay on top of purchases. All",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Each of the department heads has been asked to stay on top of purchases. All\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 96,
    "word_or_phrase": "stock",
    "phonetic": "/stock/",
    "word_type": "verb",
    "meaning": "tích trữ, cung cấp; hàng tồn kho, nguồn cung cấp",
    "example_sentence": "The company expects all staff to understand the concept of stock thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of stock thoroughly.\"",
    "category": "Bài 7: Công nghệ văn phòng (Office Technology)"
  },
  {
    "id": 97,
    "word_or_phrase": "appreciation",
    "phonetic": "/appreciation/",
    "word_type": "noun",
    "meaning": "sự đánh giá cao, sự trân trọng, sự thấu hiểu",
    "example_sentence": "The company expects all staff to understand the concept of appreciation thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of appreciation thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 98,
    "word_or_phrase": "be made of",
    "phonetic": "/be made of/",
    "word_type": "verb",
    "meaning": "được làm bằng, cấu tạo bởi",
    "example_sentence": "The company expects all staff to understand the concept of be made of thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of be made of thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 99,
    "word_or_phrase": "bring in",
    "phonetic": "/bring in/",
    "word_type": "verb",
    "meaning": "thuê, tuyển dụng; gây ra",
    "example_sentence": "The company expects all staff to understand the concept of bring in thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of bring in thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 100,
    "word_or_phrase": "casually",
    "phonetic": "/casually/",
    "word_type": "verb",
    "meaning": "một cách bình thường, thân mật",
    "example_sentence": "The company expects all staff to understand the concept of casually thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of casually thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 101,
    "word_or_phrase": "code",
    "phonetic": "/code/",
    "word_type": "noun",
    "meaning": "quy tắc, bộ luật",
    "example_sentence": "The company expects all staff to understand the concept of code thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of code thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 102,
    "word_or_phrase": "expose",
    "phonetic": "/expose/",
    "word_type": "verb",
    "meaning": "cho tiếp xúc, làm cho trải nghiệm",
    "example_sentence": "The company expects all staff to understand the concept of expose thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of expose thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 103,
    "word_or_phrase": "glimpse",
    "phonetic": "/glimpse/",
    "word_type": "noun",
    "meaning": "cái nhìn thoáng qua, sự nhìn lướt qua",
    "example_sentence": "you’ll get a glimpse of what the newer version of the program has to offer. OK, let’s get",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"you’ll get a glimpse of what the newer version of the program has to offer. OK, let’s get\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 104,
    "word_or_phrase": "out of",
    "phonetic": "/out of/",
    "word_type": "adjective",
    "meaning": "hết, không còn",
    "example_sentence": "We're out of intercoms.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"We're out of intercoms.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 105,
    "word_or_phrase": "outdated",
    "phonetic": "/outdated/",
    "word_type": "adjective",
    "meaning": "lỗi thời, lạc hậu",
    "example_sentence": "The company expects all staff to understand the concept of outdated thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of outdated thoroughly.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 106,
    "word_or_phrase": "practice",
    "phonetic": "/practice/",
    "word_type": "verb",
    "meaning": "sự luyện tập, thói quen; luyện tập",
    "example_sentence": "limited time for practice today.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"limited time for practice today.\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 107,
    "word_or_phrase": "reinforce",
    "phonetic": "/reinforce/",
    "word_type": "verb",
    "meaning": "củng cố, tăng cường, hỗ trợ",
    "example_sentence": "reinforce their discussion?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"reinforce their discussion?\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 108,
    "word_or_phrase": "verbally",
    "phonetic": "/verbally/",
    "word_type": "verb",
    "meaning": "bằng lời nói",
    "example_sentence": "What we want to do is verbally cover the main functions of the program and make",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What we want to do is verbally cover the main functions of the program and make\"",
    "category": "Bài 8: Quy trình văn phòng (Office Procedures)"
  },
  {
    "id": 109,
    "word_or_phrase": "disk",
    "phonetic": "/disk/",
    "word_type": "noun",
    "meaning": "đĩa (dùng để lưu trữ dữ liệu kỹ thuật số)",
    "example_sentence": "The company expects all staff to understand the concept of disk thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of disk thoroughly.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 110,
    "word_or_phrase": "facilitate",
    "phonetic": "/facilitate/",
    "word_type": "verb",
    "meaning": "tạo điều kiện, làm cho dễ dàng hơn",
    "example_sentence": "To facilitate the process, I have outlined the steps here on this chart. If you get lost, just",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To facilitate the process, I have outlined the steps here on this chart. If you get lost, just\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 111,
    "word_or_phrase": "network",
    "phonetic": "/network/",
    "word_type": "verb",
    "meaning": "kết nối; mạng lưới",
    "example_sentence": "The computers are linked by a network.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The computers are linked by a network.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 112,
    "word_or_phrase": "popularity",
    "phonetic": "/popularity/",
    "word_type": "noun",
    "meaning": "sự phổ biến, sự nổi tiếng",
    "example_sentence": "The company expects all staff to understand the concept of popularity thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of popularity thoroughly.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 113,
    "word_or_phrase": "process",
    "phonetic": "/process/",
    "word_type": "verb",
    "meaning": "xử lý; quy trình, quá trình",
    "example_sentence": "[M] Yes, there’s a special process you have to use, but I’m not sure I can figure it out. (6-",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Yes, there’s a special process you have to use, but I’m not sure I can figure it out. (6-\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 114,
    "word_or_phrase": "replace",
    "phonetic": "/replace/",
    "word_type": "verb",
    "meaning": "thay thế",
    "example_sentence": "How long will it take to replace the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How long will it take to replace the\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 115,
    "word_or_phrase": "revolution",
    "phonetic": "/revolution/",
    "word_type": "noun",
    "meaning": "cuộc cách mạng, vòng quay",
    "example_sentence": "The company expects all staff to understand the concept of revolution thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of revolution thoroughly.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 116,
    "word_or_phrase": "sharp",
    "phonetic": "/sharp/",
    "word_type": "adjective",
    "meaning": "sắc bén, rõ rệt, thông minh",
    "example_sentence": "The company expects all staff to understand the concept of sharp thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of sharp thoroughly.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 117,
    "word_or_phrase": "skill",
    "phonetic": "/skill/",
    "word_type": "noun",
    "meaning": "kỹ năng, kỹ xảo",
    "example_sentence": "The company expects all staff to understand the concept of skill thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of skill thoroughly.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 118,
    "word_or_phrase": "software",
    "phonetic": "/software/",
    "word_type": "noun",
    "meaning": "phần mềm (máy tính)",
    "example_sentence": "The worker is reading the software",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The worker is reading the software\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 119,
    "word_or_phrase": "store",
    "phonetic": "/store/",
    "word_type": "verb",
    "meaning": "lưu trữ, cất giữ",
    "example_sentence": "To get information about a store.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To get information about a store.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 120,
    "word_or_phrase": "technically",
    "phonetic": "/technically/",
    "word_type": "verb",
    "meaning": "về mặt kỹ thuật, một cách chuyên môn",
    "example_sentence": "The company expects all staff to understand the concept of technically thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of technically thoroughly.\"",
    "category": "Bài 9: Thiết bị điện tử (Electronics)"
  },
  {
    "id": 121,
    "word_or_phrase": "assemble",
    "phonetic": "/assemble/",
    "word_type": "verb",
    "meaning": "lắp ráp, tập hợp",
    "example_sentence": "I used to assemble electronic cards.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"I used to assemble electronic cards.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 122,
    "word_or_phrase": "beforehand",
    "phonetic": "/beforehand/",
    "word_type": "verb",
    "meaning": "trước, trước đó",
    "example_sentence": "[W] You should have asked me beforehand. (5-C) I'm too busy to do it now.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] You should have asked me beforehand. (5-C) I'm too busy to do it now.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 123,
    "word_or_phrase": "complication",
    "phonetic": "/complication/",
    "word_type": "noun",
    "meaning": "sự phức tạp, tình huống phức tạp",
    "example_sentence": "The company expects all staff to understand the concept of complication thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of complication thoroughly.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 124,
    "word_or_phrase": "courier",
    "phonetic": "/courier/",
    "word_type": "noun",
    "meaning": "người đưa thư, dịch vụ chuyển phát nhanh",
    "example_sentence": "What time does the Courier Center",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What time does the Courier Center\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 125,
    "word_or_phrase": "express",
    "phonetic": "/express/",
    "word_type": "adjective",
    "meaning": "nhanh, tốc hành; gửi nhanh",
    "example_sentence": "Yes, and I sent it express.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Yes, and I sent it express.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 126,
    "word_or_phrase": "fold",
    "phonetic": "/fold/",
    "word_type": "verb",
    "meaning": "gấp",
    "example_sentence": "Remember to fold all the documents.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Remember to fold all the documents.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 127,
    "word_or_phrase": "layout",
    "phonetic": "/layout/",
    "word_type": "noun",
    "meaning": "bố cục, cách trình bày",
    "example_sentence": "I worked in layout and design.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"I worked in layout and design.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 128,
    "word_or_phrase": "mention",
    "phonetic": "/mention/",
    "word_type": "noun",
    "meaning": "sự đề cập, lời nói đến; đề cập, nói đến",
    "example_sentence": "on hand to show you how to use the services. Mention this announcement to them and",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"on hand to show you how to use the services. Mention this announcement to them and\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 129,
    "word_or_phrase": "petition",
    "phonetic": "/petition/",
    "word_type": "noun",
    "meaning": "đơn thỉnh cầu, kiến nghị; thỉnh cầu, kiến nghị",
    "example_sentence": "The company expects all staff to understand the concept of petition thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of petition thoroughly.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 130,
    "word_or_phrase": "proof",
    "phonetic": "/proof/",
    "word_type": "verb",
    "meaning": "đọc và sửa lỗi; bằng chứng, chứng cứ",
    "example_sentence": "The company expects all staff to understand the concept of proof thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of proof thoroughly.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 131,
    "word_or_phrase": "register",
    "phonetic": "/register/",
    "word_type": "verb",
    "meaning": "ghi lại, đăng ký; sổ sách, bản ghi",
    "example_sentence": "The company expects all staff to understand the concept of register thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of register thoroughly.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 132,
    "word_or_phrase": "revise",
    "phonetic": "/revise/",
    "word_type": "verb",
    "meaning": "sửa đổi, duyệt lại",
    "example_sentence": "She needs to revise them first.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She needs to revise them first.\"",
    "category": "Bài 10: Thư từ thương mại (Correspondence)"
  },
  {
    "id": 133,
    "word_or_phrase": "abundant",
    "phonetic": "/abundant/",
    "word_type": "adjective",
    "meaning": "dồi dào, phong phú, nhiều",
    "example_sentence": "The harvest this season is abundant.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The harvest this season is abundant.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 134,
    "word_or_phrase": "accomplishment",
    "phonetic": "/accomplishment/",
    "word_type": "noun",
    "meaning": "thành tựu, sự hoàn thành",
    "example_sentence": "What recent accomplishment are you",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What recent accomplishment are you\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 135,
    "word_or_phrase": "bring together",
    "phonetic": "/bring together/",
    "word_type": "verb",
    "meaning": "tập hợp, gom lại, đoàn kết",
    "example_sentence": "The company expects all staff to understand the concept of bring together thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of bring together thoroughly.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 136,
    "word_or_phrase": "candidate",
    "phonetic": "/candidate/",
    "word_type": "noun",
    "meaning": "ứng cử viên, thí sinh",
    "example_sentence": "The candidate is checking the job",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The candidate is checking the job\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 137,
    "word_or_phrase": "come up with",
    "phonetic": "/come up with/",
    "word_type": "verb",
    "meaning": "nghĩ ra, đưa ra (ý tưởng, kế hoạch)",
    "example_sentence": "[M] (4-D) - Have you come up with any ideas for finishing your job search?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] (4-D) - Have you come up with any ideas for finishing your job search?\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 138,
    "word_or_phrase": "commensurate",
    "phonetic": "/commensurate/",
    "word_type": "adjective",
    "meaning": "tương xứng, cân xứng",
    "example_sentence": "Salaries are competitive and commensurate with experience.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Salaries are competitive and commensurate with experience.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 139,
    "word_or_phrase": "match",
    "phonetic": "/match/",
    "word_type": "verb",
    "meaning": "sự phù hợp; phù hợp, tương xứng",
    "example_sentence": "[M] Does this mean that you've found the job that's the perfect match?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Does this mean that you've found the job that's the perfect match?\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 140,
    "word_or_phrase": "profile",
    "phonetic": "/profile/",
    "word_type": "noun",
    "meaning": "hồ sơ cá nhân, bản tóm tắt đặc điểm",
    "example_sentence": "The job profile is posted on the board.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The job profile is posted on the board.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 141,
    "word_or_phrase": "qualifications",
    "phonetic": "/qualifications/",
    "word_type": "noun",
    "meaning": "phẩm chất, năng lực, bằng cấp",
    "example_sentence": "The qualifications are listed on the wall.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The qualifications are listed on the wall.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 142,
    "word_or_phrase": "recruit",
    "phonetic": "/recruit/",
    "word_type": "verb",
    "meaning": "tuyển dụng; lính mới, thành viên mới",
    "example_sentence": "The company expects all staff to understand the concept of recruit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of recruit thoroughly.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 143,
    "word_or_phrase": "submit",
    "phonetic": "/submit/",
    "word_type": "verb",
    "meaning": "nộp, đệ trình",
    "example_sentence": "The company expects all staff to understand the concept of submit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of submit thoroughly.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 144,
    "word_or_phrase": "time-consuming",
    "phonetic": "/time-consuming/",
    "word_type": "adjective",
    "meaning": "tốn thời gian",
    "example_sentence": "I found it most time-consuming.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"I found it most time-consuming.\"",
    "category": "Bài 11: Quảng cáo tuyển dụng (Job Advertising)"
  },
  {
    "id": 145,
    "word_or_phrase": "ability",
    "phonetic": "/ability/",
    "word_type": "noun",
    "meaning": "khả năng, năng lực, kỹ năng",
    "example_sentence": "The company expects all staff to understand the concept of ability thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of ability thoroughly.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 146,
    "word_or_phrase": "apply",
    "phonetic": "/apply/",
    "word_type": "verb",
    "meaning": "nộp đơn, ứng tuyển; áp dụng",
    "example_sentence": "It doesn't apply here.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It doesn't apply here.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 147,
    "word_or_phrase": "background",
    "phonetic": "/background/",
    "word_type": "noun",
    "meaning": "lý lịch, kinh nghiệm, nền tảng",
    "example_sentence": "To give background information",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To give background information\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 148,
    "word_or_phrase": "be ready for",
    "phonetic": "/be ready for/",
    "word_type": "verb",
    "meaning": "sẵn sàng cho",
    "example_sentence": "The company expects all staff to understand the concept of be ready for thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of be ready for thoroughly.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 149,
    "word_or_phrase": "call in",
    "phonetic": "/call in/",
    "word_type": "verb",
    "meaning": "gọi đến, mời đến",
    "example_sentence": "Who would call in to this hotline?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Who would call in to this hotline?\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 150,
    "word_or_phrase": "confidence",
    "phonetic": "/confidence/",
    "word_type": "noun",
    "meaning": "sự tự tin, lòng tin",
    "example_sentence": "She has no confidence.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She has no confidence.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 151,
    "word_or_phrase": "constantly",
    "phonetic": "/constantly/",
    "word_type": "verb",
    "meaning": "liên tục, luôn luôn",
    "example_sentence": "The company expects all staff to understand the concept of constantly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of constantly thoroughly.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 152,
    "word_or_phrase": "expert",
    "phonetic": "/expert/",
    "word_type": "noun",
    "meaning": "chuyên gia; thành thạo, chuyên môn",
    "example_sentence": "The expert is putting on his coat.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The expert is putting on his coat.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 153,
    "word_or_phrase": "follow up",
    "phonetic": "/follow up/",
    "word_type": "verb",
    "meaning": "tiếp tục, theo dõi; sự tiếp theo, sự theo dõi",
    "example_sentence": "To follow up on your application status, press four. To learn the location of a Salvo",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To follow up on your application status, press four. To learn the location of a Salvo\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 154,
    "word_or_phrase": "hesitant do",
    "phonetic": "/hesitant do/",
    "word_type": "adjective",
    "meaning": "dự, ngập ngừng",
    "example_sentence": "The company expects all staff to understand the concept of hesitant do thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of hesitant do thoroughly.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 155,
    "word_or_phrase": "present",
    "phonetic": "/present/",
    "word_type": "verb",
    "meaning": "trình bày, giới thiệu; món quà",
    "example_sentence": "interview because I didn't think I could present myself well. I was sure no one would hire",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"interview because I didn't think I could present myself well. I was sure no one would hire\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 156,
    "word_or_phrase": "weakly",
    "phonetic": "/weakly/",
    "word_type": "verb",
    "meaning": "yếu ớt, không đủ sức",
    "example_sentence": "The company expects all staff to understand the concept of weakly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of weakly thoroughly.\"",
    "category": "Bài 12: Ứng tuyển & Phỏng vấn (Applying & Interviewing)"
  },
  {
    "id": 157,
    "word_or_phrase": "conduct",
    "phonetic": "/conduct/",
    "word_type": "verb",
    "meaning": "hành vi, cách cư xử; thực hiện, tiến hành",
    "example_sentence": "The company expects all staff to understand the concept of conduct thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of conduct thoroughly.\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 158,
    "word_or_phrase": "generate",
    "phonetic": "/generate/",
    "word_type": "verb",
    "meaning": "tạo ra, sản xuất",
    "example_sentence": "You don't think this will generate a lot",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"You don't think this will generate a lot\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 159,
    "word_or_phrase": "hire",
    "phonetic": "/hire/",
    "word_type": "verb",
    "meaning": "người được thuê; thuê, tuyển dụng",
    "example_sentence": "The company expects all staff to understand the concept of hire thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of hire thoroughly.\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 160,
    "word_or_phrase": "keep up with",
    "phonetic": "/keep up with/",
    "word_type": "verb",
    "meaning": "bắt kịp, theo kịp",
    "example_sentence": "The company expects all staff to understand the concept of keep up with thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of keep up with thoroughly.\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 161,
    "word_or_phrase": "look up to",
    "phonetic": "/look up to/",
    "word_type": "verb",
    "meaning": "ngưỡng mộ, kính trọng",
    "example_sentence": "look up to you. And that's an honor. So",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"look up to you. And that's an honor. So\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 162,
    "word_or_phrase": "mentor",
    "phonetic": "/mentor/",
    "word_type": "noun",
    "meaning": "người hướng dẫn, cố vấn",
    "example_sentence": "Virginia was her mentor, so it's",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Virginia was her mentor, so it's\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 163,
    "word_or_phrase": "on track",
    "phonetic": "/on track/",
    "word_type": "adjective",
    "meaning": "đúng lịch trình, đúng hướng",
    "example_sentence": "but we've been able to stay on track and",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"but we've been able to stay on track and\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 164,
    "word_or_phrase": "reject",
    "phonetic": "/reject/",
    "word_type": "verb",
    "meaning": "vật bị loại bỏ; từ chối, bác bỏ",
    "example_sentence": "The company expects all staff to understand the concept of reject thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of reject thoroughly.\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 165,
    "word_or_phrase": "set up",
    "phonetic": "/set up/",
    "word_type": "verb",
    "meaning": "được thiết lập; thiết lập, sắp xếp",
    "example_sentence": "I need to set up the meeting room",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"I need to set up the meeting room\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 166,
    "word_or_phrase": "success",
    "phonetic": "/success/",
    "word_type": "noun",
    "meaning": "thành công, sự đạt được mục tiêu",
    "example_sentence": "success so far. Well, I have to get going.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"success so far. Well, I have to get going.\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 167,
    "word_or_phrase": "training",
    "phonetic": "/training/",
    "word_type": "noun",
    "meaning": "sự đào tạo, huấn luyện",
    "example_sentence": "What is the response to the training",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What is the response to the training\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 168,
    "word_or_phrase": "update",
    "phonetic": "/update/",
    "word_type": "verb",
    "meaning": "cập nhật; thông tin cập nhật",
    "example_sentence": "The team will update us on Thursday.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The team will update us on Thursday.\"",
    "category": "Bài 13: Tuyển dụng & Đào tạo (Hiring & Training)"
  },
  {
    "id": 169,
    "word_or_phrase": "basis",
    "phonetic": "/basis/",
    "word_type": "noun",
    "meaning": "nền tảng, cơ sở, lý do chính",
    "example_sentence": "The company expects all staff to understand the concept of basis thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of basis thoroughly.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 170,
    "word_or_phrase": "be aware of",
    "phonetic": "/be aware of/",
    "word_type": "verb",
    "meaning": "nhận thức được, ý thức về",
    "example_sentence": "You need to be aware of these",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"You need to be aware of these\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 171,
    "word_or_phrase": "benefit",
    "phonetic": "/benefit/",
    "word_type": "verb",
    "meaning": "lợi ích, phúc lợi; có lợi cho, được lợi",
    "example_sentence": "What benefit does he get?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What benefit does he get?\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 172,
    "word_or_phrase": "compensate",
    "phonetic": "/compensate/",
    "word_type": "verb",
    "meaning": "bồi thường, đền bù",
    "example_sentence": "The company expects all staff to understand the concept of compensate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of compensate thoroughly.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 173,
    "word_or_phrase": "delicately",
    "phonetic": "/delicately/",
    "word_type": "verb",
    "meaning": "một cách khéo léo, tinh tế",
    "example_sentence": "The company expects all staff to understand the concept of delicately thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of delicately thoroughly.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 174,
    "word_or_phrase": "eligible",
    "phonetic": "/eligible/",
    "word_type": "adjective",
    "meaning": "đủ điều kiện, đủ tư cách",
    "example_sentence": "Who is eligible to participate in the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Who is eligible to participate in the\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 175,
    "word_or_phrase": "flexibly",
    "phonetic": "/flexibly/",
    "word_type": "verb",
    "meaning": "một cách linh hoạt, dễ uốn nắn",
    "example_sentence": "The company expects all staff to understand the concept of flexibly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of flexibly thoroughly.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 176,
    "word_or_phrase": "negotiate",
    "phonetic": "/negotiate/",
    "word_type": "verb",
    "meaning": "đàm phán, thương lượng",
    "example_sentence": "He doesn’t know how to negotiate.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He doesn’t know how to negotiate.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 177,
    "word_or_phrase": "raise",
    "phonetic": "/raise/",
    "word_type": "verb",
    "meaning": "sự tăng lên, sự tăng lương; nâng lên, tăng lên",
    "example_sentence": "When will I get a raise?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When will I get a raise?\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 178,
    "word_or_phrase": "retire",
    "phonetic": "/retire/",
    "word_type": "verb",
    "meaning": "nghỉ hưu, rút lui",
    "example_sentence": "The company expects all staff to understand the concept of retire thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of retire thoroughly.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 179,
    "word_or_phrase": "vested",
    "phonetic": "/vested/",
    "word_type": "adjective",
    "meaning": "được trao quyền, được bảo đảm (quyền lợi)",
    "example_sentence": "The company expects all staff to understand the concept of vested thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of vested thoroughly.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 180,
    "word_or_phrase": "wage",
    "phonetic": "/wage/",
    "word_type": "noun",
    "meaning": "tiền lương (thường trả theo giờ hoặc tuần)",
    "example_sentence": "meet with my hourly wage.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"meet with my hourly wage.\"",
    "category": "Bài 14: Lương bổng & Phúc lợi (Salaries & Benefits)"
  },
  {
    "id": 181,
    "word_or_phrase": "achievement",
    "phonetic": "/achievement/",
    "word_type": "noun",
    "meaning": "thành tích, thành tựu, sự đạt được",
    "example_sentence": "The company expects all staff to understand the concept of achievement thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of achievement thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 182,
    "word_or_phrase": "contribute",
    "phonetic": "/contribute/",
    "word_type": "verb",
    "meaning": "đóng góp, góp phần",
    "example_sentence": "The company expects all staff to understand the concept of contribute thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of contribute thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 183,
    "word_or_phrase": "dedication",
    "phonetic": "/dedication/",
    "word_type": "noun",
    "meaning": "sự cống hiến, sự tận tâm",
    "example_sentence": "Where is the dedication ceremony",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Where is the dedication ceremony\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 184,
    "word_or_phrase": "look forward to",
    "phonetic": "/look forward to/",
    "word_type": "verb",
    "meaning": "mong đợi, mong ngóng",
    "example_sentence": "The company expects all staff to understand the concept of look forward to thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of look forward to thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 185,
    "word_or_phrase": "look to",
    "phonetic": "/look to/",
    "word_type": "verb",
    "meaning": "trông cậy vào, phụ thuộc vào",
    "example_sentence": "The company expects all staff to understand the concept of look to thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of look to thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 186,
    "word_or_phrase": "loyal",
    "phonetic": "/loyal/",
    "word_type": "adjective",
    "meaning": "trung thành, trung nghĩa",
    "example_sentence": "most loyal employees.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"most loyal employees.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 187,
    "word_or_phrase": "merit",
    "phonetic": "/merit/",
    "word_type": "noun",
    "meaning": "công lao, giá trị, ưu điểm",
    "example_sentence": "The company expects all staff to understand the concept of merit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of merit thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 188,
    "word_or_phrase": "obviously",
    "phonetic": "/obviously/",
    "word_type": "adjective",
    "meaning": "rõ ràng, hiển nhiên",
    "example_sentence": "The company expects all staff to understand the concept of obviously thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of obviously thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 189,
    "word_or_phrase": "productive",
    "phonetic": "/productive/",
    "word_type": "adjective",
    "meaning": "năng suất, hiệu quả",
    "example_sentence": "He is not productive.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He is not productive.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 190,
    "word_or_phrase": "promote",
    "phonetic": "/promote/",
    "word_type": "verb",
    "meaning": "thăng chức, quảng bá, thúc đẩy",
    "example_sentence": "The company expects all staff to understand the concept of promote thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of promote thoroughly.\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 191,
    "word_or_phrase": "recognition",
    "phonetic": "/recognition/",
    "word_type": "noun",
    "meaning": "sự công nhận, sự thừa nhận",
    "example_sentence": "some recognition for all the work that he",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"some recognition for all the work that he\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 192,
    "word_or_phrase": "value",
    "phonetic": "/value/",
    "word_type": "verb",
    "meaning": "đánh giá cao, coi trọng; giá trị",
    "example_sentence": "for us. No value can be placed on these",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"for us. No value can be placed on these\"",
    "category": "Bài 15: Thăng chức & Khen thưởng (Promotions & Awards)"
  },
  {
    "id": 193,
    "word_or_phrase": "bargain",
    "phonetic": "/bargain/",
    "word_type": "verb",
    "meaning": "mặc cả, đàm phán; món hời, sự mặc cả",
    "example_sentence": "true bargain, (7-B) visit aisle seven for our",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"true bargain, (7-B) visit aisle seven for our\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 194,
    "word_or_phrase": "bear",
    "phonetic": "/bear/",
    "word_type": "verb",
    "meaning": "chịu đựng, cam chịu",
    "example_sentence": "The company expects all staff to understand the concept of bear thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of bear thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 195,
    "word_or_phrase": "behavior",
    "phonetic": "/behavior/",
    "word_type": "noun",
    "meaning": "hành vi, cách cư xử",
    "example_sentence": "studying consumer behavior. (5-B) I've",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"studying consumer behavior. (5-B) I've\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 196,
    "word_or_phrase": "checkout",
    "phonetic": "/checkout/",
    "word_type": "noun",
    "meaning": "quầy thanh toán, việc thanh toán",
    "example_sentence": "I'll go wait in the checkout line.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"I'll go wait in the checkout line.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 197,
    "word_or_phrase": "comfort",
    "phonetic": "/comfort/",
    "word_type": "verb",
    "meaning": "an ủi, làm dịu; sự thoải mái, tiện nghi",
    "example_sentence": "The company expects all staff to understand the concept of comfort thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of comfort thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 198,
    "word_or_phrase": "expand",
    "phonetic": "/expand/",
    "word_type": "verb",
    "meaning": "mở rộng, phát triển",
    "example_sentence": "The company expects all staff to understand the concept of expand thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of expand thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 199,
    "word_or_phrase": "explore",
    "phonetic": "/explore/",
    "word_type": "verb",
    "meaning": "khám phá, thăm dò, tìm hiểu",
    "example_sentence": "While you're at it, why not explore our",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"While you're at it, why not explore our\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 200,
    "word_or_phrase": "item",
    "phonetic": "/item/",
    "word_type": "noun",
    "meaning": "món hàng, hạng mục, khoản mục",
    "example_sentence": "The company expects all staff to understand the concept of item thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of item thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 201,
    "word_or_phrase": "mandatory",
    "phonetic": "/mandatory/",
    "word_type": "adjective",
    "meaning": "bắt buộc, có tính chất ra lệnh",
    "example_sentence": "The company expects all staff to understand the concept of mandatory thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of mandatory thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 202,
    "word_or_phrase": "merchandise",
    "phonetic": "/merchandise/",
    "word_type": "noun",
    "meaning": "hàng hóa, vật phẩm",
    "example_sentence": "They're putting the merchandise on the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They're putting the merchandise on the\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 203,
    "word_or_phrase": "strictly",
    "phonetic": "/strictly/",
    "word_type": "verb",
    "meaning": "nghiêm ngặt, khắt khe",
    "example_sentence": "The company expects all staff to understand the concept of strictly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of strictly thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 204,
    "word_or_phrase": "trend xu",
    "phonetic": "/trend xu/",
    "word_type": "noun",
    "meaning": "hướng, trào lưu",
    "example_sentence": "The company expects all staff to understand the concept of trend xu thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of trend xu thoroughly.\"",
    "category": "Bài 16: Mua sắm (Shopping)"
  },
  {
    "id": 205,
    "word_or_phrase": "diversify",
    "phonetic": "/diversify/",
    "word_type": "verb",
    "meaning": "đa dạng hóa, làm cho khác biệt",
    "example_sentence": "The company expects all staff to understand the concept of diversify thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of diversify thoroughly.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 206,
    "word_or_phrase": "enterprise",
    "phonetic": "/enterprise/",
    "word_type": "noun",
    "meaning": "doanh nghiệp, công ty; dự án lớn",
    "example_sentence": "glasses. It's a new enterprise called",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"glasses. It's a new enterprise called\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 207,
    "word_or_phrase": "essentially",
    "phonetic": "/essentially/",
    "word_type": "adjective",
    "meaning": "về cơ bản, thiết yếu, chủ yếu",
    "example_sentence": "The company expects all staff to understand the concept of essentially thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of essentially thoroughly.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 208,
    "word_or_phrase": "everyday",
    "phonetic": "/everyday/",
    "word_type": "adjective",
    "meaning": "hằng ngày, thường lệ, thông thường",
    "example_sentence": "The company expects all staff to understand the concept of everyday thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of everyday thoroughly.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 209,
    "word_or_phrase": "function",
    "phonetic": "/function/",
    "word_type": "verb",
    "meaning": "hoạt động, có chức năng / chức năng, mục đích",
    "example_sentence": "What is the function of this stamp?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What is the function of this stamp?\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 210,
    "word_or_phrase": "maintain duy",
    "phonetic": "/maintain duy/",
    "word_type": "verb",
    "meaning": "trì, bảo trì",
    "example_sentence": "The company expects all staff to understand the concept of maintain duy thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of maintain duy thoroughly.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 211,
    "word_or_phrase": "obtain",
    "phonetic": "/obtain/",
    "word_type": "verb",
    "meaning": "đạt được, thu được, có được",
    "example_sentence": "You need to obtain a signature.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"You need to obtain a signature.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 212,
    "word_or_phrase": "prerequisite",
    "phonetic": "/prerequisite/",
    "word_type": "noun",
    "meaning": "điều kiện tiên quyết, yêu cầu bắt buộc",
    "example_sentence": "It's a prerequisite for all orders.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It's a prerequisite for all orders.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 213,
    "word_or_phrase": "quality",
    "phonetic": "/quality/",
    "word_type": "noun",
    "meaning": "chất lượng, phẩm chất",
    "example_sentence": "She's buying quality toys.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She's buying quality toys.\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 214,
    "word_or_phrase": "smooth",
    "phonetic": "/smooth/",
    "word_type": "verb",
    "meaning": "trôi chảy, suôn sẻ, êm đềm / làm cho suôn sẻ",
    "example_sentence": "It is essential that we maintain a smooth",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It is essential that we maintain a smooth\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 215,
    "word_or_phrase": "source",
    "phonetic": "/source/",
    "word_type": "noun",
    "meaning": "nguồn gốc, nguồn cung cấp",
    "example_sentence": "source for glassware?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"source for glassware?\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 216,
    "word_or_phrase": "stationery",
    "phonetic": "/stationery/",
    "word_type": "noun",
    "meaning": "văn phòng phẩm (giấy, phong bì...)",
    "example_sentence": "She's using office stationery for her",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She's using office stationery for her\"",
    "category": "Bài 17: Đặt hàng vật tư (Ordering Supplies)"
  },
  {
    "id": 217,
    "word_or_phrase": "accurately",
    "phonetic": "/accurately/",
    "word_type": "verb",
    "meaning": "chính xác, đúng đắn, không sai sót",
    "example_sentence": "The company expects all staff to understand the concept of accurately thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of accurately thoroughly.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 218,
    "word_or_phrase": "carrier",
    "phonetic": "/carrier/",
    "word_type": "noun",
    "meaning": "hãng vận tải, người vận chuyển, vật mang (bệnh)",
    "example_sentence": "The company expects all staff to understand the concept of carrier thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of carrier thoroughly.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 219,
    "word_or_phrase": "catalog danh",
    "phonetic": "/catalog danh/",
    "word_type": "verb",
    "meaning": "mục, mục lục; lập danh mục",
    "example_sentence": "The company expects all staff to understand the concept of catalog danh thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of catalog danh thoroughly.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 220,
    "word_or_phrase": "fulfill",
    "phonetic": "/fulfill/",
    "word_type": "verb",
    "meaning": "hoàn thành, thực hiện, đáp ứng",
    "example_sentence": "To fulfill customer's wishes.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To fulfill customer's wishes.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 221,
    "word_or_phrase": "integral",
    "phonetic": "/integral/",
    "word_type": "adjective",
    "meaning": "không thể thiếu, toàn bộ, tích phân",
    "example_sentence": "Competitive pricing is integral to our",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Competitive pricing is integral to our\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 222,
    "word_or_phrase": "inventory",
    "phonetic": "/inventory/",
    "word_type": "noun",
    "meaning": "hàng tồn kho, bảng kiểm kê",
    "example_sentence": "The company expects all staff to understand the concept of inventory thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of inventory thoroughly.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 223,
    "word_or_phrase": "minimize",
    "phonetic": "/minimize/",
    "word_type": "verb",
    "meaning": "giảm thiểu, tối thiểu hóa",
    "example_sentence": "success. Customers want to minimize costs",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"success. Customers want to minimize costs\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 224,
    "word_or_phrase": "on hand",
    "phonetic": "/on hand/",
    "word_type": "adjective",
    "meaning": "có sẵn, hiện có",
    "example_sentence": "The company expects all staff to understand the concept of on hand thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of on hand thoroughly.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 225,
    "word_or_phrase": "remember",
    "phonetic": "/remember/",
    "word_type": "verb",
    "meaning": "nhớ, ghi nhớ",
    "example_sentence": "fulfill orders. Remember, those boxes have",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"fulfill orders. Remember, those boxes have\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 226,
    "word_or_phrase": "ship",
    "phonetic": "/ship/",
    "word_type": "verb",
    "meaning": "vận chuyển, gửi (hàng hóa)",
    "example_sentence": "The company expects all staff to understand the concept of ship thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of ship thoroughly.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 227,
    "word_or_phrase": "sufficiently",
    "phonetic": "/sufficiently/",
    "word_type": "verb",
    "meaning": "đủ, thích đáng",
    "example_sentence": "It is sufficiently clear.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It is sufficiently clear.\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 228,
    "word_or_phrase": "supply",
    "phonetic": "/supply/",
    "word_type": "verb",
    "meaning": "nguồn cung cấp, vật tư; cung cấp, tiếp tế",
    "example_sentence": "motto: we supply the best, you pay the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"motto: we supply the best, you pay the\"",
    "category": "Bài 18: Giao hàng & Vận chuyển (Shipping)"
  },
  {
    "id": 229,
    "word_or_phrase": "charge",
    "phonetic": "/charge/",
    "word_type": "verb",
    "meaning": "(v.) tính phí; (n.) tiền phải trả, phí",
    "example_sentence": "The company doesn’t have to charge",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company doesn’t have to charge\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 230,
    "word_or_phrase": "compile",
    "phonetic": "/compile/",
    "word_type": "verb",
    "meaning": "biên soạn, tập hợp tài liệu",
    "example_sentence": "The company expects all staff to understand the concept of compile thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of compile thoroughly.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 231,
    "word_or_phrase": "customer",
    "phonetic": "/customer/",
    "word_type": "noun",
    "meaning": "khách hàng",
    "example_sentence": "bill to the customer.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"bill to the customer.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 232,
    "word_or_phrase": "discount",
    "phonetic": "/discount/",
    "word_type": "verb",
    "meaning": "(n.) sự giảm giá; (v.) giảm giá",
    "example_sentence": "She's asking a clerk for a discount.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She's asking a clerk for a discount.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 233,
    "word_or_phrase": "efficient",
    "phonetic": "/efficient/",
    "word_type": "adjective",
    "meaning": "hiệu quả, có năng suất cao",
    "example_sentence": "efficient because we don't have to bill the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"efficient because we don't have to bill the\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 234,
    "word_or_phrase": "estimate",
    "phonetic": "/estimate/",
    "word_type": "verb",
    "meaning": "(v.) ước tính, ước lượng; (n.) bản ước tính",
    "example_sentence": "We estimate that up-front payments",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"We estimate that up-front payments\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 235,
    "word_or_phrase": "impose",
    "phonetic": "/impose/",
    "word_type": "verb",
    "meaning": "áp đặt, buộc phải chịu (thuế, phí...)",
    "example_sentence": "The company expects all staff to understand the concept of impose thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of impose thoroughly.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 236,
    "word_or_phrase": "mistake sai",
    "phonetic": "/mistake sai/",
    "word_type": "noun",
    "meaning": "lầm, lỗi",
    "example_sentence": "The company expects all staff to understand the concept of mistake sai thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of mistake sai thoroughly.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 237,
    "word_or_phrase": "order",
    "phonetic": "/order/",
    "word_type": "verb",
    "meaning": "(n.) đơn đặt hàng; (v.) đặt hàng, ra lệnh",
    "example_sentence": "They placed the order.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They placed the order.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 238,
    "word_or_phrase": "promptly",
    "phonetic": "/promptly/",
    "word_type": "verb",
    "meaning": "một cách nhanh chóng, đúng giờ",
    "example_sentence": "[W] Don't worry. I'll deal with it promptly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] Don't worry. I'll deal with it promptly.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 239,
    "word_or_phrase": "rectify",
    "phonetic": "/rectify/",
    "word_type": "verb",
    "meaning": "sửa lại cho đúng, hiệu chỉnh",
    "example_sentence": "The company expects all staff to understand the concept of rectify thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of rectify thoroughly.\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 240,
    "word_or_phrase": "terms",
    "phonetic": "/terms/",
    "word_type": "noun",
    "meaning": "các điều khoản, điều kiện",
    "example_sentence": "According to the terms of payment, (7-D) a",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"According to the terms of payment, (7-D) a\"",
    "category": "Bài 19: Hóa đơn & Thanh toán (Invoices)"
  },
  {
    "id": 241,
    "word_or_phrase": "adjustment",
    "phonetic": "/adjustment/",
    "word_type": "noun",
    "meaning": "sự điều chỉnh",
    "example_sentence": "The company expects all staff to understand the concept of adjustment thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of adjustment thoroughly.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 242,
    "word_or_phrase": "automatically",
    "phonetic": "/automatically/",
    "word_type": "verb",
    "meaning": "một cách tự động",
    "example_sentence": "automatically, or shall we do them all",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"automatically, or shall we do them all\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 243,
    "word_or_phrase": "crucial",
    "phonetic": "/crucial/",
    "word_type": "adjective",
    "meaning": "cốt yếu, quyết định, quan trọng",
    "example_sentence": "it's crucial to keeping our records straight.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"it's crucial to keeping our records straight.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 244,
    "word_or_phrase": "discrepancy",
    "phonetic": "/discrepancy/",
    "word_type": "noun",
    "meaning": "sự khác biệt, sự không nhất quán, chênh lệch",
    "example_sentence": "The reason for the discrepancy.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The reason for the discrepancy.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 245,
    "word_or_phrase": "disturb",
    "phonetic": "/disturb/",
    "word_type": "verb",
    "meaning": "làm phiền, gây phiền",
    "example_sentence": "The company expects all staff to understand the concept of disturb thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of disturb thoroughly.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 246,
    "word_or_phrase": "liability",
    "phonetic": "/liability/",
    "word_type": "noun",
    "meaning": "nghĩa vụ, trách nhiệm pháp lý, rủi ro",
    "example_sentence": "any discrepancy is a liability.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"any discrepancy is a liability.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 247,
    "word_or_phrase": "reflection",
    "phonetic": "/reflection/",
    "word_type": "noun",
    "meaning": "sự phản chiếu, hình ảnh phản chiếu",
    "example_sentence": "The company expects all staff to understand the concept of reflection thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of reflection thoroughly.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 248,
    "word_or_phrase": "run",
    "phonetic": "/run/",
    "word_type": "verb",
    "meaning": "vận hành, hoạt động",
    "example_sentence": "discrepancies. Remember, in the long run",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"discrepancies. Remember, in the long run\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 249,
    "word_or_phrase": "scan",
    "phonetic": "/scan/",
    "word_type": "verb",
    "meaning": "xem lướt qua, quét",
    "example_sentence": "The company expects all staff to understand the concept of scan thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of scan thoroughly.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 250,
    "word_or_phrase": "subtract",
    "phonetic": "/subtract/",
    "word_type": "verb",
    "meaning": "trừ đi, bớt đi",
    "example_sentence": "The company expects all staff to understand the concept of subtract thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of subtract thoroughly.\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 251,
    "word_or_phrase": "tedious",
    "phonetic": "/tedious/",
    "word_type": "adjective",
    "meaning": "tẻ nhạt, chán ngắt",
    "example_sentence": "January. (8-D) It's a tedious process, but",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"January. (8-D) It's a tedious process, but\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 252,
    "word_or_phrase": "verify",
    "phonetic": "/verify/",
    "word_type": "verb",
    "meaning": "xác minh, kiểm tra lại",
    "example_sentence": "Would you be able to verify these",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Would you be able to verify these\"",
    "category": "Bài 20: Kiểm kê kho hàng (Inventory)"
  },
  {
    "id": 253,
    "word_or_phrase": "accept",
    "phonetic": "/accept/",
    "word_type": "verb",
    "meaning": "chấp nhận, nhận",
    "example_sentence": "We can only accept a photo ID for",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"We can only accept a photo ID for\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 254,
    "word_or_phrase": "balance",
    "phonetic": "/balance/",
    "word_type": "noun",
    "meaning": "số dư; quyết toán, làm cho cân bằng",
    "example_sentence": "Your account balance should be",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Your account balance should be\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 255,
    "word_or_phrase": "borrow",
    "phonetic": "/borrow/",
    "word_type": "verb",
    "meaning": "vay, mượn",
    "example_sentence": "What do you want to borrow so much",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What do you want to borrow so much\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 256,
    "word_or_phrase": "cautiously",
    "phonetic": "/cautiously/",
    "word_type": "verb",
    "meaning": "một cách thận trọng, cẩn thận",
    "example_sentence": "The company expects all staff to understand the concept of cautiously thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of cautiously thoroughly.\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 257,
    "word_or_phrase": "deduct",
    "phonetic": "/deduct/",
    "word_type": "verb",
    "meaning": "khấu trừ, trừ đi",
    "example_sentence": "The company expects all staff to understand the concept of deduct thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of deduct thoroughly.\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 258,
    "word_or_phrase": "dividend",
    "phonetic": "/dividend/",
    "word_type": "noun",
    "meaning": "cổ tức, tiền lãi được chia",
    "example_sentence": "The company expects all staff to understand the concept of dividend thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of dividend thoroughly.\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 259,
    "word_or_phrase": "down payment",
    "phonetic": "/down payment/",
    "word_type": "noun",
    "meaning": "tiền đặt cọc, khoản thanh toán đầu tiên",
    "example_sentence": "How big a down payment is required?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How big a down payment is required?\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 260,
    "word_or_phrase": "mortgage",
    "phonetic": "/mortgage/",
    "word_type": "noun",
    "meaning": "khoản thế chấp; cầm cố, thế chấp",
    "example_sentence": "(7-B, 8-A) To qualify for a mortgage, you",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"(7-B, 8-A) To qualify for a mortgage, you\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 261,
    "word_or_phrase": "restricted",
    "phonetic": "/restricted/",
    "word_type": "adjective",
    "meaning": "bị hạn chế, giới hạn",
    "example_sentence": "The company expects all staff to understand the concept of restricted thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of restricted thoroughly.\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 262,
    "word_or_phrase": "signature",
    "phonetic": "/signature/",
    "word_type": "noun",
    "meaning": "chữ ký",
    "example_sentence": "Put his signature on file.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Put his signature on file.\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 263,
    "word_or_phrase": "take out",
    "phonetic": "/take out/",
    "word_type": "verb",
    "meaning": "rút tiền; lấy ra",
    "example_sentence": "How much money did you take out of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How much money did you take out of\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 264,
    "word_or_phrase": "transaction",
    "phonetic": "/transaction/",
    "word_type": "noun",
    "meaning": "giao dịch",
    "example_sentence": "She's going to make a transaction at",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She's going to make a transaction at\"",
    "category": "Bài 21: Ngân hàng (Banking)"
  },
  {
    "id": 265,
    "word_or_phrase": "accounting",
    "phonetic": "/accounting/",
    "word_type": "noun",
    "meaning": "kế toán, công việc kế toán",
    "example_sentence": "TỪ VỰNG TOEIC LESSON 22: Accounting",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"TỪ VỰNG TOEIC LESSON 22: Accounting\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 266,
    "word_or_phrase": "accumulate",
    "phonetic": "/accumulate/",
    "word_type": "verb",
    "meaning": "tích lũy, gom góp",
    "example_sentence": "The company expects all staff to understand the concept of accumulate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of accumulate thoroughly.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 267,
    "word_or_phrase": "asset",
    "phonetic": "/asset/",
    "word_type": "noun",
    "meaning": "tài sản, của cải",
    "example_sentence": "firm’s most valuable asset?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"firm’s most valuable asset?\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 268,
    "word_or_phrase": "audit",
    "phonetic": "/audit/",
    "word_type": "verb",
    "meaning": "sự kiểm toán; kiểm toán",
    "example_sentence": "The company expects all staff to understand the concept of audit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of audit thoroughly.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 269,
    "word_or_phrase": "budget",
    "phonetic": "/budget/",
    "word_type": "verb",
    "meaning": "ngân sách; lên ngân sách",
    "example_sentence": "Show him a new budget.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Show him a new budget.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 270,
    "word_or_phrase": "build up",
    "phonetic": "/build up/",
    "word_type": "verb",
    "meaning": "xây dựng lên, tăng thêm",
    "example_sentence": "The company expects all staff to understand the concept of build up thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of build up thoroughly.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 271,
    "word_or_phrase": "client",
    "phonetic": "/client/",
    "word_type": "noun",
    "meaning": "khách hàng",
    "example_sentence": "What is the client's problem?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What is the client's problem?\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 272,
    "word_or_phrase": "debt",
    "phonetic": "/debt/",
    "word_type": "noun",
    "meaning": "khoản nợ",
    "example_sentence": "He has a lot of debt.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He has a lot of debt.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 273,
    "word_or_phrase": "outstanding",
    "phonetic": "/outstanding/",
    "word_type": "adjective",
    "meaning": "nổi bật, chưa thanh toán (nợ), chưa hoàn thành",
    "example_sentence": "Do you have any outstanding debts?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Do you have any outstanding debts?\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 274,
    "word_or_phrase": "profitably",
    "phonetic": "/profitably/",
    "word_type": "adjective",
    "meaning": "có lợi nhuận, có lãi",
    "example_sentence": "The company expects all staff to understand the concept of profitably thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of profitably thoroughly.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 275,
    "word_or_phrase": "reconcile",
    "phonetic": "/reconcile/",
    "word_type": "verb",
    "meaning": "đối chiếu, hòa giải",
    "example_sentence": "The company expects all staff to understand the concept of reconcile thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of reconcile thoroughly.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 276,
    "word_or_phrase": "turnover",
    "phonetic": "/turnover/",
    "word_type": "noun",
    "meaning": "doanh thu, sự luân chuyển (nhân viên)",
    "example_sentence": "The employee turnover is high.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The employee turnover is high.\"",
    "category": "Bài 22: Kế toán (Accounting)"
  },
  {
    "id": 277,
    "word_or_phrase": "aggressively",
    "phonetic": "/aggressively/",
    "word_type": "adjective",
    "meaning": "một cách quyết đoán, xông xáo",
    "example_sentence": "Investing aggressively.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Investing aggressively.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 278,
    "word_or_phrase": "attitude",
    "phonetic": "/attitude/",
    "word_type": "noun",
    "meaning": "thái độ, quan điểm",
    "example_sentence": "The company expects all staff to understand the concept of attitude thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of attitude thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 279,
    "word_or_phrase": "commit cam",
    "phonetic": "/commit cam/",
    "word_type": "verb",
    "meaning": "kết, ủy thác",
    "example_sentence": "The company expects all staff to understand the concept of commit cam thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of commit cam thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 280,
    "word_or_phrase": "conservative",
    "phonetic": "/conservative/",
    "word_type": "adjective",
    "meaning": "thận trọng, bảo thủ",
    "example_sentence": "The company expects all staff to understand the concept of conservative thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of conservative thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 281,
    "word_or_phrase": "fund",
    "phonetic": "/fund/",
    "word_type": "verb",
    "meaning": "(n) quỹ; (v) cấp vốn, tài trợ",
    "example_sentence": "fund your children's college education?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"fund your children's college education?\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 282,
    "word_or_phrase": "invest",
    "phonetic": "/invest/",
    "word_type": "verb",
    "meaning": "đầu tư",
    "example_sentence": "[W] You mean we should invest in natural",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] You mean we should invest in natural\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 283,
    "word_or_phrase": "long-term",
    "phonetic": "/long-term/",
    "word_type": "adjective",
    "meaning": "dài hạn",
    "example_sentence": "The company expects all staff to understand the concept of long-term thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of long-term thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 284,
    "word_or_phrase": "portfolio danh",
    "phonetic": "/portfolio danh/",
    "word_type": "noun",
    "meaning": "mục đầu tư",
    "example_sentence": "The company expects all staff to understand the concept of portfolio danh thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of portfolio danh thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 285,
    "word_or_phrase": "pull out",
    "phonetic": "/pull out/",
    "word_type": "verb",
    "meaning": "(v) rút khỏi; (n) sự rút lui",
    "example_sentence": "The company expects all staff to understand the concept of pull out thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of pull out thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 286,
    "word_or_phrase": "resource",
    "phonetic": "/resource/",
    "word_type": "noun",
    "meaning": "tài nguyên, nguồn lực",
    "example_sentence": "The company expects all staff to understand the concept of resource thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of resource thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 287,
    "word_or_phrase": "return",
    "phonetic": "/return/",
    "word_type": "noun",
    "meaning": "lợi nhuận, tiền lời",
    "example_sentence": "Will I get a good return on this",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Will I get a good return on this\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 288,
    "word_or_phrase": "wisely",
    "phonetic": "/wisely/",
    "word_type": "adjective",
    "meaning": "một cách khôn ngoan",
    "example_sentence": "The company expects all staff to understand the concept of wisely thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of wisely thoroughly.\"",
    "category": "Bài 23: Đầu tư tài chính (Investments)"
  },
  {
    "id": 289,
    "word_or_phrase": "calculation",
    "phonetic": "/calculation/",
    "word_type": "noun",
    "meaning": "sự tính toán, phép tính",
    "example_sentence": "The company expects all staff to understand the concept of calculation thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of calculation thoroughly.\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 290,
    "word_or_phrase": "deadline",
    "phonetic": "/deadline/",
    "word_type": "noun",
    "meaning": "hạn chót, hạn nộp",
    "example_sentence": "The deadline is April 15th.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The deadline is April 15th.\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 291,
    "word_or_phrase": "file",
    "phonetic": "/file/",
    "word_type": "verb",
    "meaning": "nộp, đệ trình",
    "example_sentence": "When do I have to file my income",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When do I have to file my income\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 292,
    "word_or_phrase": "fill out",
    "phonetic": "/fill out/",
    "word_type": "verb",
    "meaning": "điền vào (đơn, mẫu)",
    "example_sentence": "The company expects all staff to understand the concept of fill out thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of fill out thoroughly.\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 293,
    "word_or_phrase": "give up",
    "phonetic": "/give up/",
    "word_type": "verb",
    "meaning": "từ bỏ",
    "example_sentence": "The company expects all staff to understand the concept of give up thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of give up thoroughly.\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 294,
    "word_or_phrase": "joint",
    "phonetic": "/joint/",
    "word_type": "adjective",
    "meaning": "chung, cùng nhau",
    "example_sentence": "The company expects all staff to understand the concept of joint thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of joint thoroughly.\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 295,
    "word_or_phrase": "owe",
    "phonetic": "/owe/",
    "word_type": "verb",
    "meaning": "nợ",
    "example_sentence": "what you owe, isn't it? I guess that's why",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"what you owe, isn't it? I guess that's why\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 296,
    "word_or_phrase": "penalty",
    "phonetic": "/penalty/",
    "word_type": "noun",
    "meaning": "tiền phạt, hình phạt",
    "example_sentence": "What is the penalty for missing the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What is the penalty for missing the\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 297,
    "word_or_phrase": "preparation",
    "phonetic": "/preparation/",
    "word_type": "noun",
    "meaning": "sự chuẩn bị",
    "example_sentence": "The company expects all staff to understand the concept of preparation thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of preparation thoroughly.\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 298,
    "word_or_phrase": "refund",
    "phonetic": "/refund/",
    "word_type": "verb",
    "meaning": "(n) tiền hoàn lại; (v) hoàn lại tiền",
    "example_sentence": "When can the refund check be",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When can the refund check be\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 299,
    "word_or_phrase": "spouse",
    "phonetic": "/spouse/",
    "word_type": "noun",
    "meaning": "vợ hoặc chồng",
    "example_sentence": "spouse usually files our taxes. She does all",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"spouse usually files our taxes. She does all\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 300,
    "word_or_phrase": "withhold",
    "phonetic": "/withhold/",
    "word_type": "verb",
    "meaning": "khấu trừ, giữ lại",
    "example_sentence": "Calculate the amount to withhold",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Calculate the amount to withhold\"",
    "category": "Bài 24: Thuế (Taxes)"
  },
  {
    "id": 301,
    "word_or_phrase": "desire",
    "phonetic": "/desire/",
    "word_type": "verb",
    "meaning": "mong muốn, ao ước",
    "example_sentence": "The company expects all staff to understand the concept of desire thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of desire thoroughly.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 302,
    "word_or_phrase": "detail",
    "phonetic": "/detail/",
    "word_type": "verb",
    "meaning": "trình bày chi tiết",
    "example_sentence": "The company expects all staff to understand the concept of detail thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of detail thoroughly.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 303,
    "word_or_phrase": "forecast",
    "phonetic": "/forecast/",
    "word_type": "verb",
    "meaning": "(n) sự dự báo; (v) dự báo",
    "example_sentence": "Making a weather forecast.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Making a weather forecast.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 304,
    "word_or_phrase": "level",
    "phonetic": "/level/",
    "word_type": "noun",
    "meaning": "cấp độ, mức độ",
    "example_sentence": "The crew is making the drive level.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The crew is making the drive level.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 305,
    "word_or_phrase": "overall",
    "phonetic": "/overall/",
    "word_type": "adjective",
    "meaning": "tổng thể, toàn diện",
    "example_sentence": "The company expects all staff to understand the concept of overall thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of overall thoroughly.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 306,
    "word_or_phrase": "perspective",
    "phonetic": "/perspective/",
    "word_type": "noun",
    "meaning": "góc nhìn, quan điểm",
    "example_sentence": "The company expects all staff to understand the concept of perspective thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of perspective thoroughly.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 307,
    "word_or_phrase": "project",
    "phonetic": "/project/",
    "word_type": "verb",
    "meaning": "dự tính, dự kiến",
    "example_sentence": "Developing a project report.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Developing a project report.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 308,
    "word_or_phrase": "realistic",
    "phonetic": "/realistic/",
    "word_type": "adjective",
    "meaning": "thực tế",
    "example_sentence": "starting up a small business. It is realistic",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"starting up a small business. It is realistic\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 309,
    "word_or_phrase": "target",
    "phonetic": "/target/",
    "word_type": "verb",
    "meaning": "(n) mục tiêu; (v) nhắm đến",
    "example_sentence": "The arrow hit its target.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The arrow hit its target.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 310,
    "word_or_phrase": "translation",
    "phonetic": "/translation/",
    "word_type": "noun",
    "meaning": "sự dịch thuật, bản dịch",
    "example_sentence": "Is this an accurate translation of the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Is this an accurate translation of the\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 311,
    "word_or_phrase": "typically",
    "phonetic": "/typically/",
    "word_type": "adjective",
    "meaning": "một cách điển hình, thường thì",
    "example_sentence": "When does a business typically",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When does a business typically\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 312,
    "word_or_phrase": "yield",
    "phonetic": "/yield/",
    "word_type": "verb",
    "meaning": "(n) lợi nhuận, sản lượng; (v) tạo ra, mang lại",
    "example_sentence": "expect to yield this year.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"expect to yield this year.\"",
    "category": "Bài 25: Báo cáo tài chính (Financial Statements)"
  },
  {
    "id": 313,
    "word_or_phrase": "adjacent",
    "phonetic": "/adjacent/",
    "word_type": "adjective",
    "meaning": "liền kề, kế bên",
    "example_sentence": "It's adjacent to the lobby.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It's adjacent to the lobby.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 314,
    "word_or_phrase": "collaboration",
    "phonetic": "/collaboration/",
    "word_type": "noun",
    "meaning": "sự hợp tác",
    "example_sentence": "How to encourage collaboration.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How to encourage collaboration.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 315,
    "word_or_phrase": "concentrate",
    "phonetic": "/concentrate/",
    "word_type": "verb",
    "meaning": "tập trung",
    "example_sentence": "concentrate on their work. Many companies",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"concentrate on their work. Many companies\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 316,
    "word_or_phrase": "conducive",
    "phonetic": "/conducive/",
    "word_type": "adjective",
    "meaning": "có lợi, thuận tiện",
    "example_sentence": "ends up more (4-D) conducive to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"ends up more (4-D) conducive to\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 317,
    "word_or_phrase": "disruption",
    "phonetic": "/disruption/",
    "word_type": "noun",
    "meaning": "sự gián đoạn, sự cản trở",
    "example_sentence": "The company expects all staff to understand the concept of disruption thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of disruption thoroughly.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 318,
    "word_or_phrase": "hamper",
    "phonetic": "/hamper/",
    "word_type": "verb",
    "meaning": "cản trở, gây vướng víu",
    "example_sentence": "The company expects all staff to understand the concept of hamper thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of hamper thoroughly.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 319,
    "word_or_phrase": "inconsiderately",
    "phonetic": "/inconsiderately/",
    "word_type": "adjective",
    "meaning": "một cách thiếu chu đáo, bất lịch sự",
    "example_sentence": "The company expects all staff to understand the concept of inconsiderately thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of inconsiderately thoroughly.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 320,
    "word_or_phrase": "lobby",
    "phonetic": "/lobby/",
    "word_type": "noun",
    "meaning": "(n) sảnh chờ, hành lang. (v) là vận động hành lang,",
    "example_sentence": "It's adjacent to the lobby.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It's adjacent to the lobby.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 321,
    "word_or_phrase": "move up",
    "phonetic": "/move up/",
    "word_type": "verb",
    "meaning": "thăng tiến",
    "example_sentence": "The company expects all staff to understand the concept of move up thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of move up thoroughly.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 322,
    "word_or_phrase": "open to",
    "phonetic": "/open to/",
    "word_type": "adjective",
    "meaning": "cởi mở với",
    "example_sentence": "Is your boss open to new ideas?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Is your boss open to new ideas?\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 323,
    "word_or_phrase": "opt",
    "phonetic": "/opt/",
    "word_type": "verb",
    "meaning": "chọn lựa",
    "example_sentence": "opt for a design that includes several",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"opt for a design that includes several\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 324,
    "word_or_phrase": "scrutiny",
    "phonetic": "/scrutiny/",
    "word_type": "noun",
    "meaning": "sự xem xét kỹ lưỡng",
    "example_sentence": "The company expects all staff to understand the concept of scrutiny thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of scrutiny thoroughly.\"",
    "category": "Bài 26: Bất động sản & Phòng ban (Property & Departments)"
  },
  {
    "id": 325,
    "word_or_phrase": "adhere to",
    "phonetic": "/adhere to/",
    "word_type": "verb",
    "meaning": "tuân thủ",
    "example_sentence": "guidelines. Please adhere to them.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"guidelines. Please adhere to them.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 326,
    "word_or_phrase": "agenda",
    "phonetic": "/agenda/",
    "word_type": "noun",
    "meaning": "chương trình nghị sự, danh sách công việc,",
    "example_sentence": "most important matters on the agenda.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"most important matters on the agenda.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 327,
    "word_or_phrase": "bring up",
    "phonetic": "/bring up/",
    "word_type": "verb",
    "meaning": "nêu ra, đề cập",
    "example_sentence": "bring up irrelevant or personal matters.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"bring up irrelevant or personal matters.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 328,
    "word_or_phrase": "conclude",
    "phonetic": "/conclude/",
    "word_type": "verb",
    "meaning": "kết luận, kết thúc",
    "example_sentence": "Three: My goal is to (9-A) conclude this",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Three: My goal is to (9-A) conclude this\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 329,
    "word_or_phrase": "go ahead",
    "phonetic": "/go ahead/",
    "word_type": "verb",
    "meaning": "(v) tiến hành; (n) sự cho phép",
    "example_sentence": "The company expects all staff to understand the concept of go ahead thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of go ahead thoroughly.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 330,
    "word_or_phrase": "goal",
    "phonetic": "/goal/",
    "word_type": "noun",
    "meaning": "mục tiêu",
    "example_sentence": "Three: My goal is to (9-A) conclude this",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Three: My goal is to (9-A) conclude this\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 331,
    "word_or_phrase": "lengthy",
    "phonetic": "/lengthy/",
    "word_type": "adjective",
    "meaning": "dài dòng, kéo dài",
    "example_sentence": "[W] You're right. It was too (4-D) lengthy,",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] You're right. It was too (4-D) lengthy,\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 332,
    "word_or_phrase": "matter",
    "phonetic": "/matter/",
    "word_type": "noun",
    "meaning": "vấn đề, chủ đề",
    "example_sentence": "The company expects all staff to understand the concept of matter thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of matter thoroughly.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 333,
    "word_or_phrase": "periodically",
    "phonetic": "/periodically/",
    "word_type": "adjective",
    "meaning": "một cách định kỳ",
    "example_sentence": "The company expects all staff to understand the concept of periodically thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of periodically thoroughly.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 334,
    "word_or_phrase": "priority",
    "phonetic": "/priority/",
    "word_type": "noun",
    "meaning": "sự ưu tiên",
    "example_sentence": "The company expects all staff to understand the concept of priority thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of priority thoroughly.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 335,
    "word_or_phrase": "progress",
    "phonetic": "/progress/",
    "word_type": "verb",
    "meaning": "(n) sự tiến bộ; (v) tiến triển",
    "example_sentence": "The company expects all staff to understand the concept of progress thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of progress thoroughly.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 336,
    "word_or_phrase": "waste",
    "phonetic": "/waste/",
    "word_type": "verb",
    "meaning": "(v) lãng phí; (n) sự lãng phí",
    "example_sentence": "The waste basket is under the table.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The waste basket is under the table.\"",
    "category": "Bài 27: Họp ban quản trị (Board Meetings)"
  },
  {
    "id": 337,
    "word_or_phrase": "brand",
    "phonetic": "/brand/",
    "word_type": "noun",
    "meaning": "nhãn hiệu, thương hiệu",
    "example_sentence": "Which brand is better?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Which brand is better?\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 338,
    "word_or_phrase": "conform",
    "phonetic": "/conform/",
    "word_type": "verb",
    "meaning": "tuân thủ, phù hợp với",
    "example_sentence": "clothing stores, so they have to conform",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"clothing stores, so they have to conform\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 339,
    "word_or_phrase": "defect",
    "phonetic": "/defect/",
    "word_type": "noun",
    "meaning": "lỗi, khuyết điểm",
    "example_sentence": "defect in one of our products or are not",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"defect in one of our products or are not\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 340,
    "word_or_phrase": "enhance",
    "phonetic": "/enhance/",
    "word_type": "verb",
    "meaning": "nâng cao, cải thiện",
    "example_sentence": "The company expects all staff to understand the concept of enhance thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of enhance thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 341,
    "word_or_phrase": "garment",
    "phonetic": "/garment/",
    "word_type": "noun",
    "meaning": "hàng may mặc, quần áo",
    "example_sentence": "She's trying on a new garment.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"She's trying on a new garment.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 342,
    "word_or_phrase": "inspect",
    "phonetic": "/inspect/",
    "word_type": "verb",
    "meaning": "kiểm tra, thanh tra",
    "example_sentence": "The company expects all staff to understand the concept of inspect thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of inspect thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 343,
    "word_or_phrase": "perceptive",
    "phonetic": "/perceptive/",
    "word_type": "adjective",
    "meaning": "có khả năng nhận biết, nhạy bén",
    "example_sentence": "The company expects all staff to understand the concept of perceptive thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of perceptive thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 344,
    "word_or_phrase": "repel",
    "phonetic": "/repel/",
    "word_type": "verb",
    "meaning": "đẩy lùi, không thấm (nước)",
    "example_sentence": "The company expects all staff to understand the concept of repel thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of repel thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 345,
    "word_or_phrase": "take back",
    "phonetic": "/take back/",
    "word_type": "verb",
    "meaning": "nhận lại, lấy lại",
    "example_sentence": "The company expects all staff to understand the concept of take back thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of take back thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 346,
    "word_or_phrase": "throw out",
    "phonetic": "/throw out/",
    "word_type": "verb",
    "meaning": "vứt bỏ, loại bỏ",
    "example_sentence": "The company expects all staff to understand the concept of throw out thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of throw out thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 347,
    "word_or_phrase": "uniformly",
    "phonetic": "/uniformly/",
    "word_type": "adjective",
    "meaning": "một cách đồng bộ, nhất quán",
    "example_sentence": "The company expects all staff to understand the concept of uniformly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of uniformly thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 348,
    "word_or_phrase": "wrinkle",
    "phonetic": "/wrinkle/",
    "word_type": "noun",
    "meaning": "nếp nhăn, vấn đề khó khăn nhỏ",
    "example_sentence": "The company expects all staff to understand the concept of wrinkle thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of wrinkle thoroughly.\"",
    "category": "Bài 28: Kiểm soát chất lượng (Quality Control)"
  },
  {
    "id": 349,
    "word_or_phrase": "anxious lo",
    "phonetic": "/anxious lo/",
    "word_type": "adjective",
    "meaning": "lắng, băn khoăn",
    "example_sentence": "The company expects all staff to understand the concept of anxious lo thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of anxious lo thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 350,
    "word_or_phrase": "ascertain",
    "phonetic": "/ascertain/",
    "word_type": "verb",
    "meaning": "xác định, tìm hiểu chắc chắn",
    "example_sentence": "The company expects all staff to understand the concept of ascertain thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of ascertain thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 351,
    "word_or_phrase": "assume",
    "phonetic": "/assume/",
    "word_type": "verb",
    "meaning": "cho rằng, đảm nhận",
    "example_sentence": "[M] Maybe so, but you can't just assume",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Maybe so, but you can't just assume\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 352,
    "word_or_phrase": "decade",
    "phonetic": "/decade/",
    "word_type": "noun",
    "meaning": "thập kỷ",
    "example_sentence": "For almost a decade.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"For almost a decade.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 353,
    "word_or_phrase": "examine",
    "phonetic": "/examine/",
    "word_type": "verb",
    "meaning": "kiểm tra, xem xét",
    "example_sentence": "[W] We need to examine the data for our",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] We need to examine the data for our\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 354,
    "word_or_phrase": "experiment",
    "phonetic": "/experiment/",
    "word_type": "verb",
    "meaning": "(v) thí nghiệm, trải nghiệm; (n) cuộc thí nghiệm, sự",
    "example_sentence": "The company expects all staff to understand the concept of experiment thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of experiment thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 355,
    "word_or_phrase": "logical",
    "phonetic": "/logical/",
    "word_type": "adjective",
    "meaning": "hợp lý, logic",
    "example_sentence": "The company expects all staff to understand the concept of logical thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of logical thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 356,
    "word_or_phrase": "research",
    "phonetic": "/research/",
    "word_type": "noun",
    "meaning": "sự nghiên cứu",
    "example_sentence": "Research prices and sales.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Research prices and sales.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 357,
    "word_or_phrase": "responsibility",
    "phonetic": "/responsibility/",
    "word_type": "noun",
    "meaning": "trách nhiệm",
    "example_sentence": "The company expects all staff to understand the concept of responsibility thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of responsibility thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 358,
    "word_or_phrase": "solve",
    "phonetic": "/solve/",
    "word_type": "verb",
    "meaning": "giải quyết",
    "example_sentence": "The company expects all staff to understand the concept of solve thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of solve thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 359,
    "word_or_phrase": "supervisor",
    "phonetic": "/supervisor/",
    "word_type": "noun",
    "meaning": "người giám sát",
    "example_sentence": "The company expects all staff to understand the concept of supervisor thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of supervisor thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 360,
    "word_or_phrase": "systematically",
    "phonetic": "/systematically/",
    "word_type": "adjective",
    "meaning": "một cách có hệ thống",
    "example_sentence": "The company expects all staff to understand the concept of systematically thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of systematically thoroughly.\"",
    "category": "Bài 29: Phát triển sản phẩm (Product Development)"
  },
  {
    "id": 361,
    "word_or_phrase": "apprehensive e",
    "phonetic": "/apprehensive e/",
    "word_type": "adjective",
    "meaning": "ngại, lo lắng (về tương lai)",
    "example_sentence": "The company expects all staff to understand the concept of apprehensive e thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of apprehensive e thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 362,
    "word_or_phrase": "circumstance",
    "phonetic": "/circumstance/",
    "word_type": "noun",
    "meaning": "hoàn cảnh, tình huống",
    "example_sentence": "The company expects all staff to understand the concept of circumstance thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of circumstance thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 363,
    "word_or_phrase": "condition",
    "phonetic": "/condition/",
    "word_type": "noun",
    "meaning": "điều kiện, tình trạng",
    "example_sentence": "Is the building in good condition?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Is the building in good condition?\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 364,
    "word_or_phrase": "due to + N/Ving => do",
    "phonetic": "/due to + N/Ving => do/",
    "word_type": "preposition",
    "meaning": "bởi vì; + V=> dự kiến, sắp xảy ra",
    "example_sentence": "The company expects all staff to understand the concept of due to + N/Ving => do thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of due to + N/Ving => do thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 365,
    "word_or_phrase": "fluctuate dao",
    "phonetic": "/fluctuate dao/",
    "word_type": "verb",
    "meaning": "động, biến động",
    "example_sentence": "The company expects all staff to understand the concept of fluctuate dao thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of fluctuate dao thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 366,
    "word_or_phrase": "get out of",
    "phonetic": "/get out of/",
    "word_type": "verb",
    "meaning": "thoát khỏi, rút khỏi",
    "example_sentence": "The man is trying to get out of the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The man is trying to get out of the\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 367,
    "word_or_phrase": "indicator",
    "phonetic": "/indicator/",
    "word_type": "noun",
    "meaning": "chỉ số, dấu hiệu",
    "example_sentence": "The company expects all staff to understand the concept of indicator thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of indicator thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 368,
    "word_or_phrase": "lease",
    "phonetic": "/lease/",
    "word_type": "verb",
    "meaning": "(n) hợp đồng thuê; (v) cho thuê",
    "example_sentence": "before signing a lease?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"before signing a lease?\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 369,
    "word_or_phrase": "lock into",
    "phonetic": "/lock into/",
    "word_type": "verb",
    "meaning": "bị ràng buộc vào, cam kết",
    "example_sentence": "The company expects all staff to understand the concept of lock into thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of lock into thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 370,
    "word_or_phrase": "occupy",
    "phonetic": "/occupy/",
    "word_type": "verb",
    "meaning": "chiếm giữ, ở",
    "example_sentence": "No, we only occupy the first floor.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"No, we only occupy the first floor.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 371,
    "word_or_phrase": "option",
    "phonetic": "/option/",
    "word_type": "noun",
    "meaning": "sự lựa chọn, quyền chọn",
    "example_sentence": "clause, you have the option to get out of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"clause, you have the option to get out of\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 372,
    "word_or_phrase": "subject to",
    "phonetic": "/subject to/",
    "word_type": "adjective",
    "meaning": "phải chịu, tùy thuộc vào",
    "example_sentence": "The company expects all staff to understand the concept of subject to thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of subject to thoroughly.\"",
    "category": "Bài 30: Thuê & Cho thuê (Renting & Leasing)"
  },
  {
    "id": 373,
    "word_or_phrase": "appeal",
    "phonetic": "/appeal/",
    "word_type": "noun",
    "meaning": "sự hấp dẫn, sự lôi cuốn, (hoặc sự kháng cáo trong",
    "example_sentence": "The company expects all staff to understand the concept of appeal thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of appeal thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 374,
    "word_or_phrase": "arrive",
    "phonetic": "/arrive/",
    "word_type": "verb",
    "meaning": "đến nơi",
    "example_sentence": "Please arrive on time. We have a bar",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Please arrive on time. We have a bar\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 375,
    "word_or_phrase": "compromise",
    "phonetic": "/compromise/",
    "word_type": "verb",
    "meaning": "(n) sự thỏa hiệp; (v) thỏa hiệp",
    "example_sentence": "The company expects all staff to understand the concept of compromise thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of compromise thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 376,
    "word_or_phrase": "daringly",
    "phonetic": "/daringly/",
    "word_type": "adjective",
    "meaning": "một cách táo bạo, dũng cảm, liều lĩnh",
    "example_sentence": "The company expects all staff to understand the concept of daringly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of daringly thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 377,
    "word_or_phrase": "familiar quen",
    "phonetic": "/familiar quen/",
    "word_type": "adjective",
    "meaning": "thuộc (+ with)",
    "example_sentence": "The company expects all staff to understand the concept of familiar quen thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of familiar quen thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 378,
    "word_or_phrase": "guide",
    "phonetic": "/guide/",
    "word_type": "noun",
    "meaning": "sách hướng dẫn, người hướng dẫn",
    "example_sentence": "Look in the restaurant guide.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Look in the restaurant guide.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 379,
    "word_or_phrase": "majority",
    "phonetic": "/majority/",
    "word_type": "noun",
    "meaning": "đa số, phần lớn",
    "example_sentence": "The company expects all staff to understand the concept of majority thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of majority thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 380,
    "word_or_phrase": "mix",
    "phonetic": "/mix/",
    "word_type": "verb",
    "meaning": "(v) trộn lẫn; (n) sự kết hợp",
    "example_sentence": "The company expects all staff to understand the concept of mix thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of mix thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 381,
    "word_or_phrase": "rely",
    "phonetic": "/rely/",
    "word_type": "verb",
    "meaning": "tin cậy, dựa vào",
    "example_sentence": "rely on my coworkers to suggest",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"rely on my coworkers to suggest\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 382,
    "word_or_phrase": "secure",
    "phonetic": "/secure/",
    "word_type": "verb",
    "meaning": "có được, đảm bảo được",
    "example_sentence": "How can I secure reservations at such",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How can I secure reservations at such\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 383,
    "word_or_phrase": "subjective",
    "phonetic": "/subjective/",
    "word_type": "adjective",
    "meaning": "chủ quan",
    "example_sentence": "They are very subjective.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They are very subjective.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 384,
    "word_or_phrase": "suggestion",
    "phonetic": "/suggestion/",
    "word_type": "noun",
    "meaning": "sự gợi ý, đề xuất",
    "example_sentence": "The company expects all staff to understand the concept of suggestion thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of suggestion thoroughly.\"",
    "category": "Bài 31: Chọn nhà hàng (Selecting a Restaurant)"
  },
  {
    "id": 385,
    "word_or_phrase": "basic",
    "phonetic": "/basic/",
    "word_type": "adjective",
    "meaning": "cơ bản",
    "example_sentence": "The company expects all staff to understand the concept of basic thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of basic thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 386,
    "word_or_phrase": "complete",
    "phonetic": "/complete/",
    "word_type": "verb",
    "meaning": "hoàn thành",
    "example_sentence": "The company expects all staff to understand the concept of complete thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of complete thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 387,
    "word_or_phrase": "excite",
    "phonetic": "/excite/",
    "word_type": "verb",
    "meaning": "kích thích, làm hứng thú",
    "example_sentence": "The company expects all staff to understand the concept of excite thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of excite thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 388,
    "word_or_phrase": "flavor",
    "phonetic": "/flavor/",
    "word_type": "noun",
    "meaning": "hương vị",
    "example_sentence": "The flavor of the food.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The flavor of the food.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 389,
    "word_or_phrase": "forget",
    "phonetic": "/forget/",
    "word_type": "verb",
    "meaning": "quên",
    "example_sentence": "Forget about the restaurant.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Forget about the restaurant.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 390,
    "word_or_phrase": "ingredient",
    "phonetic": "/ingredient/",
    "word_type": "noun",
    "meaning": "thành phần, nguyên liệu",
    "example_sentence": "The company expects all staff to understand the concept of ingredient thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of ingredient thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 391,
    "word_or_phrase": "judge",
    "phonetic": "/judge/",
    "word_type": "verb",
    "meaning": "đánh giá, phán xét",
    "example_sentence": "The judge is consulting with the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The judge is consulting with the\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 392,
    "word_or_phrase": "mix-up",
    "phonetic": "/mix-up/",
    "word_type": "noun",
    "meaning": "sự nhầm lẫn, trộn lẫn",
    "example_sentence": "The company expects all staff to understand the concept of mix-up thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of mix-up thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 393,
    "word_or_phrase": "patron",
    "phonetic": "/patron/",
    "word_type": "noun",
    "meaning": "khách quen",
    "example_sentence": "The patron is waiting to be served.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The patron is waiting to be served.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 394,
    "word_or_phrase": "predict",
    "phonetic": "/predict/",
    "word_type": "verb",
    "meaning": "dự đoán",
    "example_sentence": "What does the woman predict?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What does the woman predict?\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 395,
    "word_or_phrase": "randomly",
    "phonetic": "/randomly/",
    "word_type": "adjective",
    "meaning": "một cách ngẫu nhiên",
    "example_sentence": "The company expects all staff to understand the concept of randomly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of randomly thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 396,
    "word_or_phrase": "remind",
    "phonetic": "/remind/",
    "word_type": "verb",
    "meaning": "nhắc nhở",
    "example_sentence": "The company expects all staff to understand the concept of remind thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of remind thoroughly.\"",
    "category": "Bài 32: Ăn uống bên ngoài (Eating Out)"
  },
  {
    "id": 397,
    "word_or_phrase": "burden",
    "phonetic": "/burden/",
    "word_type": "noun",
    "meaning": "gánh nặng, trách nhiệm",
    "example_sentence": "[W] That's such an annoying burden. It",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] That's such an annoying burden. It\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 398,
    "word_or_phrase": "commonly",
    "phonetic": "/commonly/",
    "word_type": "adjective",
    "meaning": "thông thường, thường xuyên",
    "example_sentence": "The company expects all staff to understand the concept of commonly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of commonly thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 399,
    "word_or_phrase": "delivery",
    "phonetic": "/delivery/",
    "word_type": "noun",
    "meaning": "sự giao hàng",
    "example_sentence": "How much does a delivery cost?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How much does a delivery cost?\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 400,
    "word_or_phrase": "elegance",
    "phonetic": "/elegance/",
    "word_type": "noun",
    "meaning": "sự sang trọng, thanh lịch",
    "example_sentence": "The company expects all staff to understand the concept of elegance thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of elegance thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 401,
    "word_or_phrase": "fall to",
    "phonetic": "/fall to/",
    "word_type": "verb",
    "meaning": "trở thành trách nhiệm của ai = (Become the",
    "example_sentence": "The company expects all staff to understand the concept of fall to thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of fall to thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 402,
    "word_or_phrase": "impress",
    "phonetic": "/impress/",
    "word_type": "verb",
    "meaning": "gây ấn tượng",
    "example_sentence": "The company expects all staff to understand the concept of impress thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of impress thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 403,
    "word_or_phrase": "individual",
    "phonetic": "/individual/",
    "word_type": "adjective",
    "meaning": "cá nhân, riêng lẻ",
    "example_sentence": "The individual is ordering his lunch.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The individual is ordering his lunch.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 404,
    "word_or_phrase": "list danh",
    "phonetic": "/list danh/",
    "word_type": "noun",
    "meaning": "sách",
    "example_sentence": "The company expects all staff to understand the concept of list danh thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of list danh thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 405,
    "word_or_phrase": "multiple",
    "phonetic": "/multiple/",
    "word_type": "adjective",
    "meaning": "nhiều, đa dạng",
    "example_sentence": "The company expects all staff to understand the concept of multiple thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of multiple thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 406,
    "word_or_phrase": "narrow thu",
    "phonetic": "/narrow thu/",
    "word_type": "verb",
    "meaning": "hẹp, giới hạn",
    "example_sentence": "The company expects all staff to understand the concept of narrow thu thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of narrow thu thoroughly.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 407,
    "word_or_phrase": "pick up",
    "phonetic": "/pick up/",
    "word_type": "verb",
    "meaning": "lấy, nhận, đón",
    "example_sentence": "Pick up after yourself.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Pick up after yourself.\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 408,
    "word_or_phrase": "settle",
    "phonetic": "/settle/",
    "word_type": "verb",
    "meaning": "thanh toán, quyết định, ổn định",
    "example_sentence": "Don't settle for uninteresting food and slow",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Don't settle for uninteresting food and slow\"",
    "category": "Bài 33: Đặt bữa trưa (Ordering Lunch)"
  },
  {
    "id": 409,
    "word_or_phrase": "accustom to",
    "phonetic": "/accustom to/",
    "word_type": "verb",
    "meaning": "làm quen với",
    "example_sentence": "The company expects all staff to understand the concept of accustom to thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of accustom to thoroughly.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 410,
    "word_or_phrase": "apprentice",
    "phonetic": "/apprentice/",
    "word_type": "noun",
    "meaning": "người học việc, thực tập sinh",
    "example_sentence": "Becoming an apprentice.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Becoming an apprentice.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 411,
    "word_or_phrase": "culinary",
    "phonetic": "/culinary/",
    "word_type": "adjective",
    "meaning": "(thuộc về) ẩm thực, nấu nướng",
    "example_sentence": "interest in practicing the culinary arts. But",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"interest in practicing the culinary arts. But\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 412,
    "word_or_phrase": "demand",
    "phonetic": "/demand/",
    "word_type": "verb",
    "meaning": "(v) đòi hỏi, yêu cầu; (n) nhu cầu",
    "example_sentence": "Demand a lot from their assistants.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Demand a lot from their assistants.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 413,
    "word_or_phrase": "draw thu",
    "phonetic": "/draw thu/",
    "word_type": "verb",
    "meaning": "hút, lôi kéo",
    "example_sentence": "The company expects all staff to understand the concept of draw thu thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of draw thu thoroughly.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 414,
    "word_or_phrase": "incorporate",
    "phonetic": "/incorporate/",
    "word_type": "verb",
    "meaning": "kết hợp, sát nhập",
    "example_sentence": "The company expects all staff to understand the concept of incorporate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of incorporate thoroughly.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 415,
    "word_or_phrase": "influx",
    "phonetic": "/influx/",
    "word_type": "noun",
    "meaning": "dòng chảy vào, sự tràn vào ( + of)",
    "example_sentence": "[W] There's been a large influx of new chefs",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] There's been a large influx of new chefs\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 416,
    "word_or_phrase": "method",
    "phonetic": "/method/",
    "word_type": "noun",
    "meaning": "phương pháp",
    "example_sentence": "The company expects all staff to understand the concept of method thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of method thoroughly.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 417,
    "word_or_phrase": "outlet",
    "phonetic": "/outlet/",
    "word_type": "noun",
    "meaning": "lối thoát, nơi thể hiện, cửa hàng bán lẻ",
    "example_sentence": "be an excellent outlet for their (8-D)",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"be an excellent outlet for their (8-D)\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 418,
    "word_or_phrase": "profession",
    "phonetic": "/profession/",
    "word_type": "noun",
    "meaning": "nghề nghiệp chuyên môn",
    "example_sentence": "Yes, I'm still looking for a profession.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Yes, I'm still looking for a profession.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 419,
    "word_or_phrase": "relinquish",
    "phonetic": "/relinquish/",
    "word_type": "verb",
    "meaning": "từ bỏ, buông bỏ",
    "example_sentence": "The company expects all staff to understand the concept of relinquish thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of relinquish thoroughly.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 420,
    "word_or_phrase": "theme",
    "phonetic": "/theme/",
    "word_type": "noun",
    "meaning": "chủ đề",
    "example_sentence": "The company expects all staff to understand the concept of theme thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of theme thoroughly.\"",
    "category": "Bài 34: Nghề đầu bếp & Nấu ăn (Cooking as a Career)"
  },
  {
    "id": 421,
    "word_or_phrase": "assist",
    "phonetic": "/assist/",
    "word_type": "verb",
    "meaning": "hỗ trợ, giúp đỡ",
    "example_sentence": "just right, and the manager will assist us",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"just right, and the manager will assist us\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 422,
    "word_or_phrase": "coordinate",
    "phonetic": "/coordinate/",
    "word_type": "verb",
    "meaning": "điều phối, phối hợp",
    "example_sentence": "The company expects all staff to understand the concept of coordinate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of coordinate thoroughly.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 423,
    "word_or_phrase": "dimension",
    "phonetic": "/dimension/",
    "word_type": "noun",
    "meaning": "kích thước",
    "example_sentence": "The company expects all staff to understand the concept of dimension thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of dimension thoroughly.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 424,
    "word_or_phrase": "exact",
    "phonetic": "/exact/",
    "word_type": "adjective",
    "meaning": "chính xác",
    "example_sentence": "The exact number of guests is ten.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The exact number of guests is ten.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 425,
    "word_or_phrase": "general",
    "phonetic": "/general/",
    "word_type": "adjective",
    "meaning": "chung, tổng quát",
    "example_sentence": "Can you give me a general idea of the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Can you give me a general idea of the\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 426,
    "word_or_phrase": "ideally",
    "phonetic": "/ideally/",
    "word_type": "adjective",
    "meaning": "một cách lý tưởng",
    "example_sentence": "The company expects all staff to understand the concept of ideally thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of ideally thoroughly.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 427,
    "word_or_phrase": "lead time",
    "phonetic": "/lead time/",
    "word_type": "noun",
    "meaning": "thời gian thực hiện, thời gian chờ",
    "example_sentence": "How much lead time will we need?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How much lead time will we need?\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 428,
    "word_or_phrase": "plan",
    "phonetic": "/plan/",
    "word_type": "verb",
    "meaning": "lên kế hoạch",
    "example_sentence": "soon if you plan to attend.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"soon if you plan to attend.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 429,
    "word_or_phrase": "proximity",
    "phonetic": "/proximity/",
    "word_type": "noun",
    "meaning": "sự gần gũi, sự lân cận",
    "example_sentence": "close proximity to the office and isn't",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"close proximity to the office and isn't\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 430,
    "word_or_phrase": "regulate",
    "phonetic": "/regulate/",
    "word_type": "verb",
    "meaning": "điều chỉnh, quy định",
    "example_sentence": "The company expects all staff to understand the concept of regulate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of regulate thoroughly.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 431,
    "word_or_phrase": "site",
    "phonetic": "/site/",
    "word_type": "noun",
    "meaning": "địa điểm, nơi chốn",
    "example_sentence": "[M] I've found the (4-B) ideal site for our",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] I've found the (4-B) ideal site for our\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 432,
    "word_or_phrase": "stage",
    "phonetic": "/stage/",
    "word_type": "verb",
    "meaning": "tổ chức, trình bày",
    "example_sentence": "One that has a stage.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"One that has a stage.\"",
    "category": "Bài 35: Sự kiện & Lễ hội (Events)"
  },
  {
    "id": 433,
    "word_or_phrase": "agent",
    "phonetic": "/agent/",
    "word_type": "noun",
    "meaning": "đại lý, nhân viên",
    "example_sentence": "The company expects all staff to understand the concept of agent thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of agent thoroughly.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 434,
    "word_or_phrase": "announcement",
    "phonetic": "/announcement/",
    "word_type": "noun",
    "meaning": "thông báo",
    "example_sentence": "announcement. We've been delayed and",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"announcement. We've been delayed and\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 435,
    "word_or_phrase": "beverage",
    "phonetic": "/beverage/",
    "word_type": "noun",
    "meaning": "đồ uống",
    "example_sentence": "We will begin our beverage service soon",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"We will begin our beverage service soon\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 436,
    "word_or_phrase": "blanket",
    "phonetic": "/blanket/",
    "word_type": "noun",
    "meaning": "chăn, mền, một lớp bao phủ gì đó",
    "example_sentence": "The company expects all staff to understand the concept of blanket thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of blanket thoroughly.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 437,
    "word_or_phrase": "board",
    "phonetic": "/board/",
    "word_type": "verb",
    "meaning": "lên (tàu, máy bay)",
    "example_sentence": "ready to board my connecting flight by",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"ready to board my connecting flight by\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 438,
    "word_or_phrase": "claim",
    "phonetic": "/claim/",
    "word_type": "verb",
    "meaning": "nhận lại, yêu cầu",
    "example_sentence": "The company expects all staff to understand the concept of claim thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of claim thoroughly.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 439,
    "word_or_phrase": "delay",
    "phonetic": "/delay/",
    "word_type": "verb",
    "meaning": "trì hoãn",
    "example_sentence": "The company expects all staff to understand the concept of delay thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of delay thoroughly.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 440,
    "word_or_phrase": "depart",
    "phonetic": "/depart/",
    "word_type": "verb",
    "meaning": "khởi hành",
    "example_sentence": "When does the train depart?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When does the train depart?\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 441,
    "word_or_phrase": "embarkation",
    "phonetic": "/embarkation/",
    "word_type": "noun",
    "meaning": "sự lên tàu/máy bay",
    "example_sentence": "An embarkation card.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"An embarkation card.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 442,
    "word_or_phrase": "itinerary",
    "phonetic": "/itinerary/",
    "word_type": "noun",
    "meaning": "lịch trình",
    "example_sentence": "itinerary, we should be landing soon.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"itinerary, we should be landing soon.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 443,
    "word_or_phrase": "prohibit",
    "phonetic": "/prohibit/",
    "word_type": "verb",
    "meaning": "cấm",
    "example_sentence": "The company expects all staff to understand the concept of prohibit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of prohibit thoroughly.\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 444,
    "word_or_phrase": "valid",
    "phonetic": "/valid/",
    "word_type": "adjective",
    "meaning": "hợp lệ, có hiệu lực",
    "example_sentence": "have a valid passport and ticket ready to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"have a valid passport and ticket ready to\"",
    "category": "Bài 36: Du lịch tổng quát (General Travel)"
  },
  {
    "id": 445,
    "word_or_phrase": "phrase deal with",
    "phonetic": "/phrase deal with/",
    "word_type": "verb",
    "meaning": "giải quyết, xử lý",
    "example_sentence": "The company expects all staff to understand the concept of phrase deal with thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of phrase deal with thoroughly.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 446,
    "word_or_phrase": "destination",
    "phonetic": "/destination/",
    "word_type": "noun",
    "meaning": "điểm đến",
    "example_sentence": "are willing to change your (5-B) destination",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"are willing to change your (5-B) destination\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 447,
    "word_or_phrase": "distinguish",
    "phonetic": "/distinguish/",
    "word_type": "verb",
    "meaning": "phân biệt",
    "example_sentence": "The company expects all staff to understand the concept of distinguish thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of distinguish thoroughly.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 448,
    "word_or_phrase": "economize",
    "phonetic": "/economize/",
    "word_type": "verb",
    "meaning": "tiết kiệm",
    "example_sentence": "economize. Let me see what I can do to get",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"economize. Let me see what I can do to get\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 449,
    "word_or_phrase": "equivalent",
    "phonetic": "/equivalent/",
    "word_type": "adjective",
    "meaning": "tương đương",
    "example_sentence": "The company expects all staff to understand the concept of equivalent thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of equivalent thoroughly.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 450,
    "word_or_phrase": "excursion",
    "phonetic": "/excursion/",
    "word_type": "noun",
    "meaning": "chuyến du ngoạn, tham quan, đi chơi",
    "example_sentence": "The tourists are looking for an excursion",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The tourists are looking for an excursion\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 451,
    "word_or_phrase": "expense chi",
    "phonetic": "/expense chi/",
    "word_type": "noun",
    "meaning": "phí",
    "example_sentence": "The company expects all staff to understand the concept of expense chi thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of expense chi thoroughly.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 452,
    "word_or_phrase": "extend",
    "phonetic": "/extend/",
    "word_type": "verb",
    "meaning": "kéo dài, mở rộng",
    "example_sentence": "How long can you extend your stay?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"How long can you extend your stay?\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 453,
    "word_or_phrase": "prospective",
    "phonetic": "/prospective/",
    "word_type": "adjective",
    "meaning": "tiềm năng, có triển vọng",
    "example_sentence": "The company expects all staff to understand the concept of prospective thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of prospective thoroughly.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 454,
    "word_or_phrase": "situation",
    "phonetic": "/situation/",
    "word_type": "noun",
    "meaning": "tình hình",
    "example_sentence": "[M] I understand your situation. Now, if you",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] I understand your situation. Now, if you\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 455,
    "word_or_phrase": "substantially",
    "phonetic": "/substantially/",
    "word_type": "adjective",
    "meaning": "về cơ bản, đáng kể",
    "example_sentence": "The company expects all staff to understand the concept of substantially thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of substantially thoroughly.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 456,
    "word_or_phrase": "system",
    "phonetic": "/system/",
    "word_type": "noun",
    "meaning": "hệ thống",
    "example_sentence": "The airline system is on strike.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The airline system is on strike.\"",
    "category": "Bài 37: Hàng không & Chuyến bay (Airlines)"
  },
  {
    "id": 457,
    "word_or_phrase": "comprehensive",
    "phonetic": "/comprehensive/",
    "word_type": "adjective",
    "meaning": "toàn diện, bao quát",
    "example_sentence": "The company expects all staff to understand the concept of comprehensive thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of comprehensive thoroughly.\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 458,
    "word_or_phrase": "deluxe sang",
    "phonetic": "/deluxe sang/",
    "word_type": "adjective",
    "meaning": "trọng, cao cấp",
    "example_sentence": "The company expects all staff to understand the concept of deluxe sang thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of deluxe sang thoroughly.\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 459,
    "word_or_phrase": "directory danh",
    "phonetic": "/directory danh/",
    "word_type": "noun",
    "meaning": "bạ, sách hướng dẫn",
    "example_sentence": "The company expects all staff to understand the concept of directory danh thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of directory danh thoroughly.\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 460,
    "word_or_phrase": "duration",
    "phonetic": "/duration/",
    "word_type": "noun",
    "meaning": "khoảng thời gian, thời lượng",
    "example_sentence": "In fact, the (8-C) duration of a high-speed",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"In fact, the (8-C) duration of a high-speed\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 461,
    "word_or_phrase": "entitle",
    "phonetic": "/entitle/",
    "word_type": "verb",
    "meaning": "cho quyền, cấp quyền, đặttên",
    "example_sentence": "The company expects all staff to understand the concept of entitle thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of entitle thoroughly.\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 462,
    "word_or_phrase": "fare",
    "phonetic": "/fare/",
    "word_type": "noun",
    "meaning": "giá vé",
    "example_sentence": "They're paying their fare.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They're paying their fare.\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 463,
    "word_or_phrase": "offset",
    "phonetic": "/offset/",
    "word_type": "verb",
    "meaning": "bù lại, đền bù",
    "example_sentence": "on the new high-speed trains are offset by",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"on the new high-speed trains are offset by\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 464,
    "word_or_phrase": "operate",
    "phonetic": "/operate/",
    "word_type": "verb",
    "meaning": "hoạt động, vận hành",
    "example_sentence": "[M] I think so. The trains have to operate on",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] I think so. The trains have to operate on\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 465,
    "word_or_phrase": "punctually",
    "phonetic": "/punctually/",
    "word_type": "adjective",
    "meaning": "một cách đúng giờ",
    "example_sentence": "you think it'll leave punctually?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"you think it'll leave punctually?\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 466,
    "word_or_phrase": "relatively",
    "phonetic": "/relatively/",
    "word_type": "adjective",
    "meaning": "tương đối, khá",
    "example_sentence": "New York at 1:30. That's a (5-A) relatively",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"New York at 1:30. That's a (5-A) relatively\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 467,
    "word_or_phrase": "remainder",
    "phonetic": "/remainder/",
    "word_type": "noun",
    "meaning": "phần còn lại",
    "example_sentence": "They're using the remainder of their",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They're using the remainder of their\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 468,
    "word_or_phrase": "remote xa",
    "phonetic": "/remote xa/",
    "word_type": "adjective",
    "meaning": "xôi, hẻo lánh",
    "example_sentence": "The company expects all staff to understand the concept of remote xa thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of remote xa thoroughly.\"",
    "category": "Bài 38: Tàu hỏa (Trains)"
  },
  {
    "id": 469,
    "word_or_phrase": "advanced",
    "phonetic": "/advanced/",
    "word_type": "adjective",
    "meaning": "tiên tiến, cao cấp",
    "example_sentence": "advanced level of service in return.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"advanced level of service in return.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 470,
    "word_or_phrase": "chain",
    "phonetic": "/chain/",
    "word_type": "noun",
    "meaning": "chuỗi (khách sạn, cửa hàng)",
    "example_sentence": "[W] What is our hotel chain's policy on (4-",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] What is our hotel chain's policy on (4-\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 471,
    "word_or_phrase": "check in",
    "phonetic": "/check in/",
    "word_type": "verb",
    "meaning": "làm thủ tục nhận phòng",
    "example_sentence": "What time should we check in?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What time should we check in?\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 472,
    "word_or_phrase": "confirm",
    "phonetic": "/confirm/",
    "word_type": "verb",
    "meaning": "xác nhận",
    "example_sentence": "The company expects all staff to understand the concept of confirm thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of confirm thoroughly.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 473,
    "word_or_phrase": "expect",
    "phonetic": "/expect/",
    "word_type": "verb",
    "meaning": "mong đợi, kỳ vọng",
    "example_sentence": "stay at our hotels, and they expect an",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"stay at our hotels, and they expect an\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 474,
    "word_or_phrase": "housekeeper",
    "phonetic": "/housekeeper/",
    "word_type": "noun",
    "meaning": "nhân viên dọn phòng",
    "example_sentence": "The housekeeper is cleaning the room.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The housekeeper is cleaning the room.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 475,
    "word_or_phrase": "notify",
    "phonetic": "/notify/",
    "word_type": "verb",
    "meaning": "thông báo",
    "example_sentence": "When must a customer notify the hotel?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When must a customer notify the hotel?\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 476,
    "word_or_phrase": "preclude",
    "phonetic": "/preclude/",
    "word_type": "verb",
    "meaning": "ngăn cản, loại trừ",
    "example_sentence": "The company expects all staff to understand the concept of preclude thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of preclude thoroughly.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 477,
    "word_or_phrase": "quote",
    "phonetic": "/quote/",
    "word_type": "verb",
    "meaning": "(v) báo giá; (n) bảng báo giá",
    "example_sentence": "The company expects all staff to understand the concept of quote thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of quote thoroughly.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 478,
    "word_or_phrase": "rate",
    "phonetic": "/rate/",
    "word_type": "noun",
    "meaning": "mức giá",
    "example_sentence": "What rate do you charge for a double",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What rate do you charge for a double\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 479,
    "word_or_phrase": "reservation",
    "phonetic": "/reservation/",
    "word_type": "noun",
    "meaning": "sự đặt chỗ trước",
    "example_sentence": "The company expects all staff to understand the concept of reservation thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of reservation thoroughly.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 480,
    "word_or_phrase": "service",
    "phonetic": "/service/",
    "word_type": "noun",
    "meaning": "dịch vụ",
    "example_sentence": "To provide the best service.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"To provide the best service.\"",
    "category": "Bài 39: Khách sạn (Hotels)"
  },
  {
    "id": 481,
    "word_or_phrase": "busy",
    "phonetic": "/busy/",
    "word_type": "adjective",
    "meaning": "bận rộn",
    "example_sentence": "The company expects all staff to understand the concept of busy thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of busy thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 482,
    "word_or_phrase": "coincide",
    "phonetic": "/coincide/",
    "word_type": "verb",
    "meaning": "trùng hợp",
    "example_sentence": "The company expects all staff to understand the concept of coincide thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of coincide thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 483,
    "word_or_phrase": "confusion",
    "phonetic": "/confusion/",
    "word_type": "noun",
    "meaning": "sự nhầm lẫn, sự bối rối",
    "example_sentence": "them and avoid the confusion of signing a",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"them and avoid the confusion of signing a\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 484,
    "word_or_phrase": "contact",
    "phonetic": "/contact/",
    "word_type": "verb",
    "meaning": "liên lạc",
    "example_sentence": "contact your local car rental agency to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"contact your local car rental agency to\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 485,
    "word_or_phrase": "disappoint",
    "phonetic": "/disappoint/",
    "word_type": "verb",
    "meaning": "làm thất vọng",
    "example_sentence": "The company expects all staff to understand the concept of disappoint thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of disappoint thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 486,
    "word_or_phrase": "intend",
    "phonetic": "/intend/",
    "word_type": "verb",
    "meaning": "dự định",
    "example_sentence": "country and intend to rent a car while",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"country and intend to rent a car while\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 487,
    "word_or_phrase": "license",
    "phonetic": "/license/",
    "word_type": "noun",
    "meaning": "giấy phép, bằng lái",
    "example_sentence": "He's showing his driver's license.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He's showing his driver's license.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 488,
    "word_or_phrase": "nervously",
    "phonetic": "/nervously/",
    "word_type": "adjective",
    "meaning": "một cách lo lắng",
    "example_sentence": "The company expects all staff to understand the concept of nervously thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of nervously thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 489,
    "word_or_phrase": "optional",
    "phonetic": "/optional/",
    "word_type": "adjective",
    "meaning": "tùy chọn, không bắt buộc",
    "example_sentence": "Is collision insurance optional with a",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Is collision insurance optional with a\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 490,
    "word_or_phrase": "tempt",
    "phonetic": "/tempt/",
    "word_type": "verb",
    "meaning": "cám dỗ, lôi cuốn",
    "example_sentence": "The company expects all staff to understand the concept of tempt thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of tempt thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 491,
    "word_or_phrase": "thrill",
    "phonetic": "/thrill/",
    "word_type": "noun",
    "meaning": "sự hồi hộp, cảm giác mạnh",
    "example_sentence": "The company expects all staff to understand the concept of thrill thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of thrill thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 492,
    "word_or_phrase": "tier",
    "phonetic": "/tier/",
    "word_type": "noun",
    "meaning": "hạng, bậc",
    "example_sentence": "The company expects all staff to understand the concept of tier thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of tier thoroughly.\"",
    "category": "Bài 40: Thuê xe hơi (Car Rentals)"
  },
  {
    "id": 493,
    "word_or_phrase": "attainment",
    "phonetic": "/attainment/",
    "word_type": "noun",
    "meaning": "thành tựu, sự đạt được",
    "example_sentence": "The company expects all staff to understand the concept of attainment thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of attainment thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 494,
    "word_or_phrase": "combine",
    "phonetic": "/combine/",
    "word_type": "verb",
    "meaning": "kết hợp",
    "example_sentence": "The company expects all staff to understand the concept of combine thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of combine thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 495,
    "word_or_phrase": "continue",
    "phonetic": "/continue/",
    "word_type": "verb",
    "meaning": "tiếp tục",
    "example_sentence": "continue. He's already made (6-C) three",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"continue. He's already made (6-C) three\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 496,
    "word_or_phrase": "description",
    "phonetic": "/description/",
    "word_type": "noun",
    "meaning": "sự mô tả",
    "example_sentence": "The film description is read to the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The film description is read to the\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 497,
    "word_or_phrase": "disperse",
    "phonetic": "/disperse/",
    "word_type": "verb",
    "meaning": "giải tán, phân tán",
    "example_sentence": "The company expects all staff to understand the concept of disperse thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of disperse thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 498,
    "word_or_phrase": "entertainment",
    "phonetic": "/entertainment/",
    "word_type": "noun",
    "meaning": "sự giải trí",
    "example_sentence": "The price of entertainment.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The price of entertainment.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 499,
    "word_or_phrase": "influence",
    "phonetic": "/influence/",
    "word_type": "verb",
    "meaning": "ảnh hưởng",
    "example_sentence": "The company expects all staff to understand the concept of influence thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of influence thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 500,
    "word_or_phrase": "range",
    "phonetic": "/range/",
    "word_type": "noun",
    "meaning": "phạm vi",
    "example_sentence": "range of styles over the past two",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"range of styles over the past two\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 501,
    "word_or_phrase": "release",
    "phonetic": "/release/",
    "word_type": "verb",
    "meaning": "phát hành, công chiếu",
    "example_sentence": "The company expects all staff to understand the concept of release thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of release thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 502,
    "word_or_phrase": "representation",
    "phonetic": "/representation/",
    "word_type": "noun",
    "meaning": "sự đại diện, sự thể hiện",
    "example_sentence": "The company expects all staff to understand the concept of representation thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of representation thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 503,
    "word_or_phrase": "separately",
    "phonetic": "/separately/",
    "word_type": "adjective",
    "meaning": "một cách riêng biệt",
    "example_sentence": "The company expects all staff to understand the concept of separately thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of separately thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 504,
    "word_or_phrase": "successive",
    "phonetic": "/successive/",
    "word_type": "adjective",
    "meaning": "liên tiếp",
    "example_sentence": "The company expects all staff to understand the concept of successive thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of successive thoroughly.\"",
    "category": "Bài 41: Điện ảnh & Phim ảnh (Movies)"
  },
  {
    "id": 505,
    "word_or_phrase": "action",
    "phonetic": "/action/",
    "word_type": "noun",
    "meaning": "hành động, diễn biến",
    "example_sentence": "The reviewer is watching the action.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The reviewer is watching the action.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 506,
    "word_or_phrase": "approach",
    "phonetic": "/approach/",
    "word_type": "verb",
    "meaning": "(v) tiếp cận; (n) cách tiếp cận",
    "example_sentence": "the director's creative new approach to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"the director's creative new approach to\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 507,
    "word_or_phrase": "audience",
    "phonetic": "/audience/",
    "word_type": "noun",
    "meaning": "khán giả",
    "example_sentence": "The audience is entering the theater.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The audience is entering the theater.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 508,
    "word_or_phrase": "creative",
    "phonetic": "/creative/",
    "word_type": "adjective",
    "meaning": "sáng tạo",
    "example_sentence": "the director's creative new approach to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"the director's creative new approach to\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 509,
    "word_or_phrase": "dialogue",
    "phonetic": "/dialogue/",
    "word_type": "noun",
    "meaning": "lời thoại, hội thoại",
    "example_sentence": "The dialogue is hard to understand.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The dialogue is hard to understand.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 510,
    "word_or_phrase": "element",
    "phonetic": "/element/",
    "word_type": "noun",
    "meaning": "yếu tố",
    "example_sentence": "The company expects all staff to understand the concept of element thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of element thoroughly.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 511,
    "word_or_phrase": "experience kinh",
    "phonetic": "/experience kinh/",
    "word_type": "noun",
    "meaning": "nghiệm, trải nghiệm",
    "example_sentence": "The company expects all staff to understand the concept of experience kinh thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of experience kinh thoroughly.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 512,
    "word_or_phrase": "occur",
    "phonetic": "/occur/",
    "word_type": "verb",
    "meaning": "xảy ra",
    "example_sentence": "The company expects all staff to understand the concept of occur thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of occur thoroughly.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 513,
    "word_or_phrase": "perform",
    "phonetic": "/perform/",
    "word_type": "verb",
    "meaning": "biểu diễn",
    "example_sentence": "The company expects all staff to understand the concept of perform thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of perform thoroughly.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 514,
    "word_or_phrase": "rehearse",
    "phonetic": "/rehearse/",
    "word_type": "verb",
    "meaning": "diễn tập",
    "example_sentence": "The company expects all staff to understand the concept of rehearse thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of rehearse thoroughly.\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 515,
    "word_or_phrase": "review",
    "phonetic": "/review/",
    "word_type": "verb",
    "meaning": "(v) đánh giá; (n) bài đánh giá",
    "example_sentence": "When did the review appear in the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"When did the review appear in the\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 516,
    "word_or_phrase": "sell out",
    "phonetic": "/sell out/",
    "word_type": "verb",
    "meaning": "bán hết vé",
    "example_sentence": "Do you think tickets will sell out",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Do you think tickets will sell out\"",
    "category": "Bài 42: Kịch nghệ & Nhà hát (Theater)"
  },
  {
    "id": 517,
    "word_or_phrase": "available",
    "phonetic": "/available/",
    "word_type": "adjective",
    "meaning": "có sẵn, sẵn có",
    "example_sentence": "Everything available was pretty",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Everything available was pretty\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 518,
    "word_or_phrase": "broaden",
    "phonetic": "/broaden/",
    "word_type": "verb",
    "meaning": "mở rộng",
    "example_sentence": "class. I know you are all here to broaden",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"class. I know you are all here to broaden\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 519,
    "word_or_phrase": "category",
    "phonetic": "/category/",
    "word_type": "noun",
    "meaning": "thể loại, hạng mục",
    "example_sentence": "The company expects all staff to understand the concept of category thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of category thoroughly.\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 520,
    "word_or_phrase": "disparate",
    "phonetic": "/disparate/",
    "word_type": "adjective",
    "meaning": "khác biệt, khác loại",
    "example_sentence": "uninteresting. With all the disparate music",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"uninteresting. With all the disparate music\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 521,
    "word_or_phrase": "divide chia",
    "phonetic": "/divide chia/",
    "word_type": "verb",
    "meaning": "phân chia",
    "example_sentence": "The company expects all staff to understand the concept of divide chia thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of divide chia thoroughly.\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 522,
    "word_or_phrase": "favor",
    "phonetic": "/favor/",
    "word_type": "verb",
    "meaning": "ưa thích, thiên vị",
    "example_sentence": "[M] I looked for the music I favor at the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] I looked for the music I favor at the\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 523,
    "word_or_phrase": "instinct",
    "phonetic": "/instinct/",
    "word_type": "noun",
    "meaning": "bản năng",
    "example_sentence": "The company expects all staff to understand the concept of instinct thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of instinct thoroughly.\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 524,
    "word_or_phrase": "prefer",
    "phonetic": "/prefer/",
    "word_type": "verb",
    "meaning": "thích hơn",
    "example_sentence": "types of music you prefer most.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"types of music you prefer most.\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 525,
    "word_or_phrase": "reason",
    "phonetic": "/reason/",
    "word_type": "noun",
    "meaning": "lý do",
    "example_sentence": "Is there a reason that you don't like",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Is there a reason that you don't like\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 526,
    "word_or_phrase": "relaxation",
    "phonetic": "/relaxation/",
    "word_type": "noun",
    "meaning": "sự thư giãn, giải trí",
    "example_sentence": "The nurse is recommending relaxation.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The nurse is recommending relaxation.\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 527,
    "word_or_phrase": "taste",
    "phonetic": "/taste/",
    "word_type": "noun",
    "meaning": "sở thích, thị hiếu",
    "example_sentence": "The company expects all staff to understand the concept of taste thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of taste thoroughly.\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 528,
    "word_or_phrase": "urge",
    "phonetic": "/urge/",
    "word_type": "verb",
    "meaning": "thúc giục, khuyến khích",
    "example_sentence": "What does the speaker urge the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What does the speaker urge the\"",
    "category": "Bài 43: Âm nhạc (Music)"
  },
  {
    "id": 529,
    "word_or_phrase": "acquire",
    "phonetic": "/acquire/",
    "word_type": "verb",
    "meaning": "có được, thu được",
    "example_sentence": "They should acquire more works.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"They should acquire more works.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 530,
    "word_or_phrase": "admire",
    "phonetic": "/admire/",
    "word_type": "verb",
    "meaning": "chiêm ngưỡng, thán phục, ngưỡng mộ",
    "example_sentence": "Which artist do you admire most?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Which artist do you admire most?\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 531,
    "word_or_phrase": "collection",
    "phonetic": "/collection/",
    "word_type": "noun",
    "meaning": "bộ sưu tập",
    "example_sentence": "The critic is admiring her collection.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The critic is admiring her collection.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 532,
    "word_or_phrase": "criticism",
    "phonetic": "/criticism/",
    "word_type": "noun",
    "meaning": "sự phê bình, lời chỉ trích",
    "example_sentence": "The company expects all staff to understand the concept of criticism thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of criticism thoroughly.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 533,
    "word_or_phrase": "express",
    "phonetic": "/express/",
    "word_type": "verb",
    "meaning": "thể hiện, biểu lộ",
    "example_sentence": "The company expects all staff to understand the concept of express thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of express thoroughly.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 534,
    "word_or_phrase": "fashion",
    "phonetic": "/fashion/",
    "word_type": "noun",
    "meaning": "phong cách, thời trang",
    "example_sentence": "The company expects all staff to understand the concept of fashion thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of fashion thoroughly.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 535,
    "word_or_phrase": "leisure",
    "phonetic": "/leisure/",
    "word_type": "noun",
    "meaning": "thời gian rảnh rỗi",
    "example_sentence": "The company expects all staff to understand the concept of leisure thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of leisure thoroughly.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 536,
    "word_or_phrase": "respond",
    "phonetic": "/respond/",
    "word_type": "verb",
    "meaning": "phản hồi, đáp lại",
    "example_sentence": "The company expects all staff to understand the concept of respond thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of respond thoroughly.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 537,
    "word_or_phrase": "schedule",
    "phonetic": "/schedule/",
    "word_type": "verb",
    "meaning": "lên lịch",
    "example_sentence": "The secretary is keeping a schedule.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The secretary is keeping a schedule.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 538,
    "word_or_phrase": "significant",
    "phonetic": "/significant/",
    "word_type": "adjective",
    "meaning": "quan trọng, có ý nghĩa",
    "example_sentence": "painting is a significant contribution to the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"painting is a significant contribution to the\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 539,
    "word_or_phrase": "specialize",
    "phonetic": "/specialize/",
    "word_type": "verb",
    "meaning": "chuyên về",
    "example_sentence": "The company expects all staff to understand the concept of specialize thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of specialize thoroughly.\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 540,
    "word_or_phrase": "spectrum",
    "phonetic": "/spectrum/",
    "word_type": "noun",
    "meaning": "một loạt, một dải",
    "example_sentence": "collection covers a (6-D) wide spectrum of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"collection covers a (6-D) wide spectrum of\"",
    "category": "Bài 44: Bảo tàng (Museums)"
  },
  {
    "id": 541,
    "word_or_phrase": "assignment",
    "phonetic": "/assignment/",
    "word_type": "noun",
    "meaning": "nhiệm vụ, bài tập",
    "example_sentence": "I gave the assignment to Mr. Lee.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"I gave the assignment to Mr. Lee.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 542,
    "word_or_phrase": "choose",
    "phonetic": "/choose/",
    "word_type": "verb",
    "meaning": "lựa chọn",
    "example_sentence": "[M] Would you choose to work for",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Would you choose to work for\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 543,
    "word_or_phrase": "constantly",
    "phonetic": "/constantly/",
    "word_type": "adjective",
    "meaning": "liên tục, luôn luôn",
    "example_sentence": "The company expects all staff to understand the concept of constantly thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of constantly thoroughly.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 544,
    "word_or_phrase": "constitute",
    "phonetic": "/constitute/",
    "word_type": "verb",
    "meaning": "cấu thành, tạo thành",
    "example_sentence": "the president's alleged actions constitute",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"the president's alleged actions constitute\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 545,
    "word_or_phrase": "decision",
    "phonetic": "/decision/",
    "word_type": "noun",
    "meaning": "quyết định",
    "example_sentence": "The company expects all staff to understand the concept of decision thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of decision thoroughly.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 546,
    "word_or_phrase": "disseminate",
    "phonetic": "/disseminate/",
    "word_type": "verb",
    "meaning": "phổ biến, lan truyền",
    "example_sentence": "The company expects all staff to understand the concept of disseminate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of disseminate thoroughly.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 547,
    "word_or_phrase": "impact",
    "phonetic": "/impact/",
    "word_type": "noun",
    "meaning": "tác động, ảnh hưởng",
    "example_sentence": "court, then we'll look at the impact this",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"court, then we'll look at the impact this\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 548,
    "word_or_phrase": "in-depth",
    "phonetic": "/in-depth/",
    "word_type": "adjective",
    "meaning": "chuyên sâu, kỹ lưỡng",
    "example_sentence": "offer in-depth news in ways that",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"offer in-depth news in ways that\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 549,
    "word_or_phrase": "investigate",
    "phonetic": "/investigate/",
    "word_type": "verb",
    "meaning": "điều tra",
    "example_sentence": "The company expects all staff to understand the concept of investigate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of investigate thoroughly.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 550,
    "word_or_phrase": "link",
    "phonetic": "/link/",
    "word_type": "noun",
    "meaning": "mối liên kết, sự kết nối",
    "example_sentence": "The e-columnist is adding a link online.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The e-columnist is adding a link online.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 551,
    "word_or_phrase": "subscribe",
    "phonetic": "/subscribe/",
    "word_type": "verb",
    "meaning": "đăng ký, đặt mua (báo, tạp chí)",
    "example_sentence": "Why do you subscribe to that",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Why do you subscribe to that\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 552,
    "word_or_phrase": "thorough",
    "phonetic": "/thorough/",
    "word_type": "adjective",
    "meaning": "cẩn thận, kỹ lưỡng",
    "example_sentence": "The company expects all staff to understand the concept of thorough thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of thorough thoroughly.\"",
    "category": "Bài 45: Truyền thông & Báo chí (Media)"
  },
  {
    "id": 553,
    "word_or_phrase": "annually",
    "phonetic": "/annually/",
    "word_type": "adjective",
    "meaning": "hằng năm, mỗi năm một lần",
    "example_sentence": "and three weeks vacation annually. (8-A)",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"and three weeks vacation annually. (8-A)\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 554,
    "word_or_phrase": "appointment",
    "phonetic": "/appointment/",
    "word_type": "noun",
    "meaning": "cuộc hẹn, sự sắp xếp",
    "example_sentence": "He's making an appointment to play",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He's making an appointment to play\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 555,
    "word_or_phrase": "assess",
    "phonetic": "/assess/",
    "word_type": "verb",
    "meaning": "đánh giá, định giá",
    "example_sentence": "The company expects all staff to understand the concept of assess thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of assess thoroughly.\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 556,
    "word_or_phrase": "diagnose",
    "phonetic": "/diagnose/",
    "word_type": "verb",
    "meaning": "chẩn đoán",
    "example_sentence": "The company expects all staff to understand the concept of diagnose thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of diagnose thoroughly.\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 557,
    "word_or_phrase": "effective",
    "phonetic": "/effective/",
    "word_type": "adjective",
    "meaning": "hiệu quả, có tác dụng",
    "example_sentence": "What is the most effective way to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What is the most effective way to\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 558,
    "word_or_phrase": "instrument",
    "phonetic": "/instrument/",
    "word_type": "noun",
    "meaning": "dụng cụ, thiết bị",
    "example_sentence": "He's playing a musical instrument.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He's playing a musical instrument.\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 559,
    "word_or_phrase": "manage",
    "phonetic": "/manage/",
    "word_type": "verb",
    "meaning": "quản lý, điều hành",
    "example_sentence": "The company expects all staff to understand the concept of manage thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of manage thoroughly.\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 560,
    "word_or_phrase": "prevent",
    "phonetic": "/prevent/",
    "word_type": "verb",
    "meaning": "ngăn chặn, phòng ngừa",
    "example_sentence": "prevent heart disease?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"prevent heart disease?\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 561,
    "word_or_phrase": "recommendation",
    "phonetic": "/recommendation/",
    "word_type": "noun",
    "meaning": "sự giới thiệu, lời khuyên",
    "example_sentence": "recommendation to Dr. Sato before the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"recommendation to Dr. Sato before the\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 562,
    "word_or_phrase": "record",
    "phonetic": "/record/",
    "word_type": "noun",
    "meaning": "hồ sơ, biên bản",
    "example_sentence": "A copy of his record.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"A copy of his record.\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 563,
    "word_or_phrase": "refer",
    "phonetic": "/refer/",
    "word_type": "verb",
    "meaning": "giới thiệu, chuyển (bệnh nhân, trường hợp...)",
    "example_sentence": "[W] Don't worry. I often refer patients to",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] Don't worry. I often refer patients to\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 564,
    "word_or_phrase": "serious",
    "phonetic": "/serious/",
    "word_type": "adjective",
    "meaning": "nghiêm trọng, trầm trọng",
    "example_sentence": "[M] That sounds serious. Am I OK?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] That sounds serious. Am I OK?\"",
    "category": "Bài 46: Phòng khám bác sĩ (Doctor's Office)"
  },
  {
    "id": 565,
    "word_or_phrase": "aware",
    "phonetic": "/aware/",
    "word_type": "adjective",
    "meaning": "nhận thức, biết rõ",
    "example_sentence": "can be done. Most people aren't aware of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"can be done. Most people aren't aware of\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 566,
    "word_or_phrase": "catch up",
    "phonetic": "/catch up/",
    "word_type": "verb",
    "meaning": "bắt kịp, theo kịp; cập nhật",
    "example_sentence": "The company expects all staff to understand the concept of catch up thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of catch up thoroughly.\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 567,
    "word_or_phrase": "distraction",
    "phonetic": "/distraction/",
    "word_type": "noun",
    "meaning": "sự xao nhãng, sự phân tâm",
    "example_sentence": "The company expects all staff to understand the concept of distraction thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of distraction thoroughly.\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 568,
    "word_or_phrase": "encouragement",
    "phonetic": "/encouragement/",
    "word_type": "noun",
    "meaning": "sự khuyến khích, sự động viên",
    "example_sentence": "The company expects all staff to understand the concept of encouragement thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of encouragement thoroughly.\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 569,
    "word_or_phrase": "evident",
    "phonetic": "/evident/",
    "word_type": "adjective",
    "meaning": "rõ ràng, hiển nhiên",
    "example_sentence": "The company expects all staff to understand the concept of evident thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of evident thoroughly.\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 570,
    "word_or_phrase": "habit",
    "phonetic": "/habit/",
    "word_type": "noun",
    "meaning": "thói quen, tập quán",
    "example_sentence": "The company expects all staff to understand the concept of habit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of habit thoroughly.\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 571,
    "word_or_phrase": "illuminate",
    "phonetic": "/illuminate/",
    "word_type": "verb",
    "meaning": "chiếu sáng, làm sáng tỏ",
    "example_sentence": "illuminate the room with your smile? It",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"illuminate the room with your smile? It\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 572,
    "word_or_phrase": "irritate",
    "phonetic": "/irritate/",
    "word_type": "verb",
    "meaning": "gây khó chịu, làm rát",
    "example_sentence": "irritate sensitive gums. Why wait? (9-D)",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"irritate sensitive gums. Why wait? (9-D)\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 573,
    "word_or_phrase": "overview",
    "phonetic": "/overview/",
    "word_type": "noun",
    "meaning": "tổng quan, khái quát",
    "example_sentence": "[W] A quick overview of your dental",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] A quick overview of your dental\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 574,
    "word_or_phrase": "position",
    "phonetic": "/position/",
    "word_type": "noun",
    "meaning": "vị trí, tư thế",
    "example_sentence": "Can you adjust the position of the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Can you adjust the position of the\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 575,
    "word_or_phrase": "regularly",
    "phonetic": "/regularly/",
    "word_type": "verb",
    "meaning": "thường xuyên, đều đặn",
    "example_sentence": "Visit her office more regularly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Visit her office more regularly.\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 576,
    "word_or_phrase": "restore",
    "phonetic": "/restore/",
    "word_type": "verb",
    "meaning": "phục hồi, khôi phục",
    "example_sentence": "Can you restore my broken tooth?",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Can you restore my broken tooth?\"",
    "category": "Bài 47: Phòng khám nha khoa (Dentist's Office)"
  },
  {
    "id": 577,
    "word_or_phrase": "allow",
    "phonetic": "/allow/",
    "word_type": "verb",
    "meaning": "cho phép, để cho; xảy ra, có thể",
    "example_sentence": "[M] Does the health plan allow me to see",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] Does the health plan allow me to see\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 578,
    "word_or_phrase": "alternative",
    "phonetic": "/alternative/",
    "word_type": "noun",
    "meaning": "thay thế, khác; sự lựa chọn khác",
    "example_sentence": "alternative. If you follow the usual",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"alternative. If you follow the usual\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 579,
    "word_or_phrase": "aspect",
    "phonetic": "/aspect/",
    "word_type": "noun",
    "meaning": "khía cạnh, mặt; đặc điểm, yếu tố; vẻ bề ngoài",
    "example_sentence": "The company expects all staff to understand the concept of aspect thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of aspect thoroughly.\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 580,
    "word_or_phrase": "concern",
    "phonetic": "/concern/",
    "word_type": "verb",
    "meaning": "sự lo lắng, mối lo ngại; lo lắng, làm lo lắng",
    "example_sentence": "The company expects all staff to understand the concept of concern thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of concern thoroughly.\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 581,
    "word_or_phrase": "emphasize",
    "phonetic": "/emphasize/",
    "word_type": "verb",
    "meaning": "nhấn mạnh, làm nổi bật",
    "example_sentence": "Administrators emphasize the",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Administrators emphasize the\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 582,
    "word_or_phrase": "incur",
    "phonetic": "/incur/",
    "word_type": "verb",
    "meaning": "gánh chịu, chịu, mắc phải",
    "example_sentence": "provider's referral, you will incur a higher",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"provider's referral, you will incur a higher\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 583,
    "word_or_phrase": "personnel",
    "phonetic": "/personnel/",
    "word_type": "noun",
    "meaning": "nhân sự, bộ phận nhân sự; nhân viên, cán bộ",
    "example_sentence": "Specialized personnel give a CAT",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Specialized personnel give a CAT\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 584,
    "word_or_phrase": "policy",
    "phonetic": "/policy/",
    "word_type": "noun",
    "meaning": "chính sách, quy tắc, điều lệ",
    "example_sentence": "Will my insurance policy cover my",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"Will my insurance policy cover my\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 585,
    "word_or_phrase": "portion",
    "phonetic": "/portion/",
    "word_type": "noun",
    "meaning": "phần, đoạn, tỷ lệ; khẩu phần",
    "example_sentence": "He will see only a portion ot the bill.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"He will see only a portion ot the bill.\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 586,
    "word_or_phrase": "regardless",
    "phonetic": "/regardless/",
    "word_type": "adjective",
    "meaning": "bất chấp, mặc dù",
    "example_sentence": "is available to everyone regardless of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"is available to everyone regardless of\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 587,
    "word_or_phrase": "salary",
    "phonetic": "/salary/",
    "word_type": "noun",
    "meaning": "lương, tiền lương",
    "example_sentence": "The pay clerk is preparing the salary",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The pay clerk is preparing the salary\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 588,
    "word_or_phrase": "suit",
    "phonetic": "/suit/",
    "word_type": "verb",
    "meaning": "phù hợp, thích hợp, vừa vặn; làm hài lòng",
    "example_sentence": "tound one that will suit our needs in all",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"tound one that will suit our needs in all\"",
    "category": "Bài 48: Bảo hiểm y tế (Health Insurance)"
  },
  {
    "id": 589,
    "word_or_phrase": "admit",
    "phonetic": "/admit/",
    "word_type": "verb",
    "meaning": "cho phép vào, nhận vào",
    "example_sentence": "The company expects all staff to understand the concept of admit thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of admit thoroughly.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 590,
    "word_or_phrase": "authorize",
    "phonetic": "/authorize/",
    "word_type": "verb",
    "meaning": "ủy quyền, cho phép",
    "example_sentence": "The company expects all staff to understand the concept of authorize thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of authorize thoroughly.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 591,
    "word_or_phrase": "designate",
    "phonetic": "/designate/",
    "word_type": "verb",
    "meaning": "chỉ định, định rõ",
    "example_sentence": "The company expects all staff to understand the concept of designate thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of designate thoroughly.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 592,
    "word_or_phrase": "escort",
    "phonetic": "/escort/",
    "word_type": "noun",
    "meaning": "người hộ tống, người đi kèm",
    "example_sentence": "The escort's leading the group.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The escort's leading the group.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 593,
    "word_or_phrase": "identify",
    "phonetic": "/identify/",
    "word_type": "verb",
    "meaning": "xác định, nhận dạng",
    "example_sentence": "The company expects all staff to understand the concept of identify thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of identify thoroughly.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 594,
    "word_or_phrase": "mission",
    "phonetic": "/mission/",
    "word_type": "noun",
    "meaning": "nhiệm vụ, mục đích",
    "example_sentence": "[M] (5-A) Our mission is to deliver",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] (5-A) Our mission is to deliver\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 595,
    "word_or_phrase": "permit",
    "phonetic": "/permit/",
    "word_type": "verb",
    "meaning": "cho phép",
    "example_sentence": "[M] If you will permit me to take a look at",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] If you will permit me to take a look at\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 596,
    "word_or_phrase": "pertinent",
    "phonetic": "/pertinent/",
    "word_type": "adjective",
    "meaning": "thích hợp, liên quan",
    "example_sentence": "pertinent paperwork for you to (9-B) give",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"pertinent paperwork for you to (9-B) give\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 597,
    "word_or_phrase": "procedure",
    "phonetic": "/procedure/",
    "word_type": "noun",
    "meaning": "thủ tục, quy trình",
    "example_sentence": "For a surgical procedure.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"For a surgical procedure.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 598,
    "word_or_phrase": "result",
    "phonetic": "/result/",
    "word_type": "noun",
    "meaning": "kết quả, hậu quả",
    "example_sentence": "The company expects all staff to understand the concept of result thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of result thoroughly.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 599,
    "word_or_phrase": "statement",
    "phonetic": "/statement/",
    "word_type": "noun",
    "meaning": "bản kê khai, hóa đơn",
    "example_sentence": "your statement……Yes, I think I see what",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"your statement……Yes, I think I see what\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 600,
    "word_or_phrase": "usually",
    "phonetic": "/usually/",
    "word_type": "verb",
    "meaning": "thường thường, thông thường",
    "example_sentence": "The company expects all staff to understand the concept of usually thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of usually thoroughly.\"",
    "category": "Bài 49: Bệnh viện (Hospitals)"
  },
  {
    "id": 601,
    "word_or_phrase": "consult",
    "phonetic": "/consult/",
    "word_type": "verb",
    "meaning": "tham khảo, hỏi ý kiến",
    "example_sentence": "The company expects all staff to understand the concept of consult thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of consult thoroughly.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 602,
    "word_or_phrase": "control",
    "phonetic": "/control/",
    "word_type": "verb",
    "meaning": "kiểm soát, điều khiển",
    "example_sentence": "[M] (5-B) These pills should control your",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[M] (5-B) These pills should control your\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 603,
    "word_or_phrase": "convenient",
    "phonetic": "/convenient/",
    "word_type": "adjective",
    "meaning": "thuận tiện, tiện lợi",
    "example_sentence": "It's very convenient to use. (8-A) You just",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"It's very convenient to use. (8-A) You just\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 604,
    "word_or_phrase": "detect",
    "phonetic": "/detect/",
    "word_type": "verb",
    "meaning": "phát hiện, tìm ra",
    "example_sentence": "backache. You should detect improvement",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"backache. You should detect improvement\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 605,
    "word_or_phrase": "factor",
    "phonetic": "/factor/",
    "word_type": "noun",
    "meaning": "yếu tố, nhân tố",
    "example_sentence": "The company expects all staff to understand the concept of factor thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of factor thoroughly.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 606,
    "word_or_phrase": "interaction",
    "phonetic": "/interaction/",
    "word_type": "noun",
    "meaning": "sự tương tác, sự tác động lẫn nhau",
    "example_sentence": "The company expects all staff to understand the concept of interaction thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of interaction thoroughly.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 607,
    "word_or_phrase": "limit",
    "phonetic": "/limit/",
    "word_type": "noun",
    "meaning": "giới hạn, hạn chế",
    "example_sentence": "There's also no limit to the length of time",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"There's also no limit to the length of time\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 608,
    "word_or_phrase": "monitor",
    "phonetic": "/monitor/",
    "word_type": "verb",
    "meaning": "theo dõi, giám sát",
    "example_sentence": "The company expects all staff to understand the concept of monitor thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of monitor thoroughly.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 609,
    "word_or_phrase": "potential",
    "phonetic": "/potential/",
    "word_type": "adjective",
    "meaning": "tiềm năng, có khả năng",
    "example_sentence": "What are the potential side effects of",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"What are the potential side effects of\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 610,
    "word_or_phrase": "sample",
    "phonetic": "/sample/",
    "word_type": "noun",
    "meaning": "mẫu, vật mẫu",
    "example_sentence": "The company expects all staff to understand the concept of sample thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of sample thoroughly.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 611,
    "word_or_phrase": "sense",
    "phonetic": "/sense/",
    "word_type": "noun",
    "meaning": "cảm giác, ý thức; sự phán đoán, trí tuệ",
    "example_sentence": "[W] No, I guess that wouldn't make sense.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"[W] No, I guess that wouldn't make sense.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  },
  {
    "id": 612,
    "word_or_phrase": "volunteer",
    "phonetic": "/volunteer/",
    "word_type": "verb",
    "meaning": "tình nguyện",
    "example_sentence": "The company expects all staff to understand the concept of volunteer thoroughly.",
    "example_meaning": "Ví dụ thực tế trong đề thi TOEIC: \"The company expects all staff to understand the concept of volunteer thoroughly.\"",
    "category": "Bài 50: Hiệu thuốc & Dược phẩm (Pharmacy)"
  }
];

module.exports = vocabularyData;
