@echo off
echo ==========================================
echo    KIEM TRA BACKEND TRUOC KHI CHAY
echo ==========================================
echo.

echo [1/4] Kiem tra MySQL dang chay...
netstat -an | findstr :3306 >nul
if %ERRORLEVEL% == 0 (
    echo ✓ MySQL dang chay tai port 3306
) else (
    echo ✗ MySQL chua chay tai port 3306
    echo Vui long khoi dong MySQL truoc!
    echo.
    echo Cach khoi dong MySQL:
    echo - Neu dung XAMPP: Mo XAMPP Control Panel va start MySQL
    echo - Neu cai rieng: Mo Services va start MySQL80
    echo.
    pause
    exit /b 1
)

echo.
echo [2/4] Compile backend...
cd btl_ltw
.\mvnw.cmd clean compile -q
if %ERRORLEVEL% == 0 (
    echo ✓ Backend compile thanh cong
) else (
    echo ✗ Backend compile that bai
    pause
    exit /b 1
)

echo.
echo [3/4] Kiem tra ket noi database...
echo Dang kiem tra ket noi MySQL...

echo.
echo [4/4] Khoi dong backend...
echo Backend dang khoi dong tai http://localhost:8080...
.\mvnw.cmd spring-boot:run

cd ..
