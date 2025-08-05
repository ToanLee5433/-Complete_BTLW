# 🚀 HƯỚNG DẪN SETUP DỰ ÁN FRONTEND + BACKEND

## 📋 Yêu cầu hệ thống

### Đã có sẵn:
- ✅ Java 21 (đã cài đặt)
- ✅ Node.js + npm (đã có)
- ✅ Frontend React + Vite (đang chạy)
- ✅ Backend Spring Boot (đã có code)

### Cần cài đặt:
- ❌ **MySQL Server** (quan trọng nhất)
- ❌ **MySQL Workbench** (tùy chọn, để quản lý DB)

---

## 🗄️ 1. CÀI ĐẶT MYSQL

### Cách 1: Tải MySQL từ trang chủ
1. **Tải MySQL Community Server:**
   - Link: https://dev.mysql.com/downloads/mysql/
   - Chọn: MySQL Community Server 8.0
   - OS: Windows
   - File: `mysql-installer-community-8.x.x.x.msi`

2. **Cài đặt:**
   - Chạy file installer
   - Chọn: "Server only" hoặc "Developer Default"
   - Thiết lập root password: `callofduty12345` (theo config trong code)
   - Port: 3306 (mặc định)

### Cách 2: Sử dụng XAMPP (dễ hơn)
1. **Tải XAMPP:**
   - Link: https://www.apachefriends.org/download.html
   - Chọn version có MySQL

2. **Cài đặt và khởi động:**
   - Cài đặt XAMPP
   - Mở XAMPP Control Panel
   - Start "MySQL"
   - Mở phpMyAdmin: http://localhost/phpmyadmin

---

## 🏗️ 2. TẠO DATABASE

### Sử dụng MySQL Command Line:
```sql
CREATE DATABASE btl_ltw;
USE btl_ltw;
```

### Hoặc sử dụng phpMyAdmin (nếu dùng XAMPP):
1. Truy cập: http://localhost/phpmyadmin
2. Click "New" bên trái
3. Tên database: `btl_ltw`
4. Click "Create"

---

## 🚀 3. CHẠY DỰ ÁN

### Tự động (Khuyến nghị):
```bash
# Chạy script tự động
.\start-all.bat
```

### Thủ công:

#### Backend (Terminal 1):
```bash
cd btl_ltw
.\mvnw.cmd spring-boot:run
```

#### Frontend (Terminal 2):
```bash
npm run dev
```

---

## 🌐 4. TRUY CẬP ỨNG DỤNG

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080
- **Database:** localhost:3306/btl_ltw

---

## 🔧 5. KIỂM TRA KẾT NỐI

### Test Backend API:
```bash
curl http://localhost:8080/api/articles
```

### Hoặc mở trình duyệt:
- http://localhost:8080/api/articles
- http://localhost:8080/api/categories

---

## 🐛 6. XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi kết nối MySQL:
```
Error: Access denied for user 'root'@'localhost'
```
**Giải pháp:**
1. Kiểm tra MySQL đã chạy chưa
2. Kiểm tra password trong `application.properties`
3. Tạo user mới nếu cần:
```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY 'callofduty12345';
GRANT ALL PRIVILEGES ON btl_ltw.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Lỗi port đã được sử dụng:
```
Port 8080 was already in use
```
**Giải pháp:**
```bash
# Tìm process đang dùng port
netstat -ano | findstr :8080
# Kill process
taskkill /PID <PID_NUMBER> /F
```

---

## 📱 7. POSTMAN COLLECTION

### API Endpoints chính:

#### Articles:
- `GET /api/articles` - Lấy tất cả bài viết
- `GET /api/articles/{id}` - Lấy bài viết theo ID
- `GET /api/articles/category?category=CATEGORY_NAME` - Lấy bài viết theo danh mục
- `POST /api/articles` - Tạo bài viết mới
- `PUT /api/articles/{id}` - Cập nhật bài viết

#### Categories:
- `GET /api/categories` - Lấy tất cả danh mục

#### Users:
- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập

#### Feedback:
- `GET /api/feedback` - Lấy feedback
- `POST /api/feedback` - Tạo feedback mới

### Import vào Postman:
1. Mở Postman
2. File → Import
3. Paste API URLs ở trên
4. Test từng endpoint

---

## ✅ 8. KIỂM TRA HOÀN THÀNH

- [ ] MySQL đã chạy
- [ ] Database `btl_ltw` đã tạo
- [ ] Backend chạy không lỗi (http://localhost:8080)
- [ ] Frontend chạy không lỗi (http://localhost:5173)
- [ ] API trả về data (test bằng browser/Postman)
- [ ] CORS đã được cấu hình đúng

---

**🎉 Chúc bạn setup thành công!**
