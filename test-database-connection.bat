@echo off
echo ==========================================
echo    KIEM TRA KET NOI DATABASE CHI TIET
echo ==========================================
echo.

echo [1/5] Kiem tra MySQL dang chay...
netstat -an | findstr :3306 >nul
if %ERRORLEVEL% == 0 (
    echo ✓ MySQL dang chay tai port 3306
) else (
    echo ✗ MySQL chua chay tai port 3306
    echo.
    echo CACH KHOI DONG MYSQL:
    echo 1. Neu dung XAMPP: Mo XAMPP Control Panel, click Start cho MySQL
    echo 2. Neu cai rieng: Win+R ^> services.msc ^> Tim MySQL80 ^> Start
    echo.
    pause
    exit /b 1
)

echo.
echo [2/5] Kiem tra phpMyAdmin...
echo Mo phpMyAdmin tai: http://localhost/phpmyadmin
start http://localhost/phpmyadmin
timeout /t 3 /nobreak >nul

echo.
echo [3/5] Thu ket noi voi password mac dinh...
echo Dang thu ket noi database voi cac config khac nhau...

cd btl_ltw

echo.
echo --- Thu config 1: Password = callofduty12345 ---
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=default --server.port=8081" --quiet & timeout /t 5 /nobreak >nul & taskkill /f /im java.exe >nul 2>&1

echo.
echo --- Thu config 2: Password = rong (XAMPP) ---
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=xampp --server.port=8082" --quiet & timeout /t 5 /nobreak >nul & taskkill /f /im java.exe >nul 2>&1

cd ..

echo.
echo [4/5] Kiem tra ket qua...
echo Neu ban thay loi "Access denied", hay:
echo 1. Kiem tra password trong phpMyAdmin
echo 2. Sua file application.properties
echo 3. Tao user moi trong MySQL

echo.
echo [5/5] Tao database thu cong...
echo Hay mo phpMyAdmin va:
echo 1. Dang nhap voi username: root, password: (de trong)
echo 2. Click "New" ben trai
echo 3. Nhap ten database: btl_ltw
echo 4. Click "Create"

echo.
echo ==========================================
echo         KIEM TRA HOAN THANH
echo ==========================================
echo Neu phpMyAdmin mo duoc va ban tao duoc database,
echo hay chay: .\start-all.bat
echo.
pause
