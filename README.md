# 🎯 TOEIC MASTER - Nền Tảng Học & Luyện Thi TOEIC 2026

Hệ thống web học và luyện thi TOEIC trực tuyến hiện đại với 50 đề thi Reading chuẩn format, Flashcard 600 từ vựng cốt lõi Barron's và 10 chủ điểm ngữ pháp Part 5.

## 🌟 Tính Năng Chính
- **50 Đề Luyện Thi Reading**: Trích xuất từ bài học thực tế gồm Part 5 (hoàn thành câu), Part 6 (điền đoạn văn), Part 7 (đọc hiểu), có đồng hồ bấm giờ và giải thích chi tiết.
- **600 Từ Vựng Barron's & Cụm Từ**: Thẻ Flashcard 3D, danh sách tra cứu và trắc nghiệm đảo chiều theo từng bài học.
- **10 Chủ Điểm Ngữ Pháp Part 5**: Câu từ loại, mệnh đề quan hệ, tính từ, điều kiện đảo ngữ, bị động, liên từ - giới từ...
- **Góc Học Tập (Dashboard)**: Theo dõi tiến độ học tập và điểm số thời gian thực.
- **Cơ sở dữ liệu Cloud**: Kết nối MySQL Cloud (Clever Cloud) chạy trực tuyến.

## 🚀 Cấu Trúc Dự Án
```
ToiecApp_toeic_api/
├── ToiecApp/
│   ├── backend/        # Node.js + Express API Backend
│   └── React/          # React + Vite Frontend
├── NguPhap/            # Tài liệu giáo trình ngữ pháp PDF
├── test/               # Trọn bộ 50 đề thi TOEIC Reading PDF
└── tuvung/             # Tài liệu 600 từ vựng TOEIC PDF
```

## 🛠️ Hướng Dẫn Chạy Dự Án

### 1. Khởi động Backend
```bash
cd ToiecApp/backend
npm install
node app.js
```
API server chạy tại `http://localhost:5000`.

### 2. Khởi động Frontend
```bash
cd ToiecApp/React
npm install
npm run dev
```
Giao diện chạy tại `http://localhost:5173`.

---
© 2026 TOEIC MASTER.
