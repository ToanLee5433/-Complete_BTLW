# 📋 HƯỚNG DẪN CHI TIẾT PHPMYADMIN

## 🌐 BƯỚC 1: TRUY CẬP PHPMYADMIN

1. **Mở trình duyệt và truy cập:**
   ```
   http://localhost/phpmyadmin
   ```

2. **Trang đăng nhập phpMyAdmin:**
   - **Username:** `root`
   - **Password:** (để trống HOẶC thử `callofduty12345`)
   - Click nút **"Go"**

## 🗂️ BƯỚC 2: TẠO DATABASE

### Nếu đăng nhập thành công:

1. **Tại giao diện chính phpMyAdmin:**
   - Bên trái sẽ có danh sách databases
   - Click vào **"New"** (hoặc "Mới") ở bên trái

2. **Tạo database mới:**
   - **Database name:** `btl_ltw`
   - **Collation:** `utf8mb4_unicode_ci` (khuyến nghị)
   - Click **"Create"**

3. **Kiểm tra database đã tạo:**
   - Bên trái sẽ xuất hiện `btl_ltw` trong danh sách
   - Click vào `btl_ltw` để chọn database

## 🔍 BƯỚC 3: KIỂM TRA KẾT NỐI

### Chạy SQL test:
1. **Click tab "SQL" ở phía trên**
2. **Paste đoạn SQL này:**
```sql
SELECT 'Ket noi database btl_ltw thanh cong!' as message;
SHOW TABLES;
```
3. **Click "Go" để chạy**

## ❌ XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: Không truy cập được phpMyAdmin
```
This site can't be reached
```
**Nguyên nhân:** Chưa cài XAMPP hoặc Apache chưa chạy

**Giải pháp:**
1. Tải XAMPP: https://www.apachefriends.org/download.html
2. Cài đặt XAMPP
3. Mở XAMPP Control Panel
4. Start **Apache** và **MySQL**

### Lỗi 2: Access denied
```
Access denied for user 'root'@'localhost'
```
**Giải pháp:** Thử các password sau:
- Để trống (không nhập gì)
- `callofduty12345`
- `root`
- `admin`

### Lỗi 3: Database đã tồn tại
```
Database 'btl_ltw' already exists
```
**Giải pháp:** Đây là OK! Database đã được tạo trước đó.

## ✅ KIỂM TRA HOÀN THÀNH

Sau khi tạo database thành công:
- [ ] phpMyAdmin mở được
- [ ] Đăng nhập thành công
- [ ] Database `btl_ltw` đã xuất hiện bên trái
- [ ] SQL test chạy không lỗi

## 🚀 BƯỚC TIẾP THEO

Nếu database đã OK, chạy lệnh:
```bash
.\start-all.bat
```
