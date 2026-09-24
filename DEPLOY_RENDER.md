# Triển khai Phạm Minh Chiến lên Render

Frontend React và backend Express chạy chung một Web Service. Khách xem `/`, quản trị dùng `/admin`, API kiểm tra tại `/api/health`.

## Triển khai

1. Đăng nhập https://dashboard.render.com và chọn New > Blueprint.
2. Chọn repository `hieu2474802010112/Chien`, nhánh `main`.
3. Render đọc `render.yaml`: build `npm ci --include=dev && npm run build`, start `npm start`, region Singapore, gói Free.
4. Sau khi trạng thái Live, mở URL được Render cấp. Vào Environment của dịch vụ để lấy `ADMIN_PIN` do Render tự tạo; không gửi PIN cho khách chỉ xem portfolio.
5. Kiểm tra `/`, `/admin`, `/api/health` và gửi một liên hệ thử qua giao diện.

## Giới hạn bản demo

Gói Free dùng dữ liệu JSON tạm ở `/tmp/chien-portfolio-data`. Tin nhắn có thể mất khi restart/redeploy; không dùng để lưu liên hệ thật lâu dài. Muốn lưu bền vững, cần gắn persistent disk trên gói hỗ trợ và đặt DATA_DIR tới thư mục trên disk, hoặc chuyển sang database. Dịch vụ miễn phí có thể cần thời gian khởi động khi không có truy cập.

Phiên quản trị hết hạn sau 8 giờ và khi backend restart. API đọc/sửa/xoá và SSE yêu cầu cookie quản trị; chỉ API gửi liên hệ mới được công khai. Nút trả lời lưu nội dung trong hệ thống, không gửi email.

## Chạy và kiểm tra local

Copy `.env.example` thành `.env`, đặt ADMIN_PIN riêng. Chạy `npm ci`, `npm run dev` để phát triển. Kiểm tra production bằng `npm run build` và `node --test backend/deployment.test.js`.

Các file `.env`, dữ liệu liên hệ, `node_modules` và thư mục `.git` không nằm trong gói ZIP bàn giao. Dữ liệu/biến môi trường từng được commit vẫn có thể tồn tại trong lịch sử Git; bản triển khai dùng PIN mới do Render tạo.
