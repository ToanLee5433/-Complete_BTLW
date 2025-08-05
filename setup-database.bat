@echo off
echo ==========================================
echo    KIEM TRA VA TAO DATABASE btl_ltw
echo ==========================================
echo.

echo [1/3] Kiem tra MySQL dang chay...
netstat -an | findstr :3306 >nul
if %ERRORLEVEL% == 0 (
    echo ✓ MySQL dang chay tai port 3306
) else (
    echo ✗ MySQL chua chay tai port 3306
    echo Vui long khoi dong MySQL truoc!
    exit /b 1
)

echo.
echo [2/3] Kiem tra phpMyAdmin...
echo Dang mo phpMyAdmin tai http://localhost/phpmyadmin...
start http://localhost/phpmyadmin

echo.
echo [3/3] Tao database bang MySQL command line...
echo Dang tao database btl_ltw...

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS btl_ltw; USE btl_ltw; SHOW DATABASES;"

echo.
echo ==========================================
echo    HOAN THANH TAO DATABASE
echo ==========================================
echo Database 'btl_ltw' da duoc tao thanh cong!
echo.
pause
