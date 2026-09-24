# Hệ Thống Backend & Cổng Quản Trị Độc Lập (Admin Portal)

Trang quản trị Backend đã được **tách biệt hoàn toàn thành một trang riêng biệt**, không hiển thị bất kỳ nút quản trị hay popup nào trên Portfolio công khai của người xem.

---

## 1. Phân chia 2 Cổng truy cập riêng biệt

### 🌟 1. Trang Portfolio Công Khai (Dành cho Nhà tuyển dụng / Khách)
- **Đường dẫn:** `http://localhost:5173/`
- **Giao diện:** 100% thuần Portfolio cá nhân (Giới thiệu, Thành tựu & KPI triệu view, Kho bài viết, Kinh nghiệm, và Biểu mẫu liên hệ trực tiếp ở chân trang).
- Người xem có thể gửi lời mời phỏng vấn hoặc booking dự án. Tin nhắn sẽ được chuyển thẳng về cơ sở dữ liệu Backend.

### 🛡️ 2. Trang Quản Trị Độc Lập (Dành riêng cho Phạm Minh Chiến)
- **Đường dẫn:** `http://localhost:5173/admin` (hoặc `http://localhost:5173/#admin`)
- **Giao diện:** Trang Dashboard quản trị toàn màn hình độc lập, gồm:
  - **Màn hình khoá PIN:** Nhập mã PIN an toàn: `ChienPR`.
  - **Thẻ thống kê:** Tổng liên hệ, Số tin mới nhận, Đang trao đổi, Đã trả lời.
  - **Danh sách liên hệ & Bộ lọc:** Lọc theo trạng thái, tìm kiếm theo từ khoá, đánh dấu sao ⭐.
  - **Trung tâm tương tác 2 chiều (Conversation Thread):**
    - Xem chi tiết thông tin người gửi, số điện thoại, công ty, lời nhắn ban đầu.
    - Soạn câu trả lời hoặc chọn nhanh các mẫu tin nhắn phản hồi.
    - Đổi trạng thái xử lý (*Mới* -> *Đang trao đổi* -> *Đã phản hồi* -> *Đã hoàn tất*).
    - Lưu ghi chú nội bộ riêng tư (lịch phỏng vấn, mức lương, kịch bản,...).
    - Xuất toàn bộ dữ liệu ra tệp JSON.
  - **Cập nhật dữ liệu thời gian thực (SSE):** Tự động nhận tin nhắn mới và cập nhật trạng thái mà không cần tải lại trang.

---

## 2. Cấu trúc thư mục

```
├── backend/
│   ├── index.js          # Express server RESTful API & Server-Sent Events (port 5000)
│   ├── db.js             # Cơ sở dữ liệu JSON (Atomic File Writes)
│   ├── data/
│   │   └── contacts.json # Tệp tin dữ liệu lưu trữ
│   └── README.md
├── src/
│   ├── pages/
│   │   └── AdminPage.tsx # Giao diện Quản trị Backend toàn màn hình độc lập (/admin)
│   ├── components/
│   │   ├── ContactForm.tsx
│   │   └── EditorialPressContact.tsx
│   ├── services/
│   │   └── api.ts        # Client API gọi về backend
│   ├── App.tsx           # Trang Portfolio công khai (/)
│   └── main.tsx          # Định tuyến phân tách giữa / và /admin
```

---

## 3. Cách khởi chạy dự án

```bash
# Chạy đồng thời cả Backend (port 5000) và Frontend (port 5173):
npm run dev
```

- Mở Portfolio công khai: **http://localhost:5173/**
- Mở Trang Quản Trị Backend: **http://localhost:5173/admin**
