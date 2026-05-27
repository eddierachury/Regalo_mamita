@echo off
setlocal

title Museo de Mama - Build Frontend

cd /d "%~dp0"

echo.
echo ==========================================
echo   Museo de Mama - Building frontend
echo ==========================================
echo.

if not exist "frontend" (
    echo ERROR: frontend folder not found.
    pause
    exit /b 1
)

if not exist "frontend\package.json" (
    echo ERROR: frontend\package.json not found.
    pause
    exit /b 1
)

cd frontend

echo Installing frontend dependencies...
call npm.cmd install

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed.
    pause
    exit /b 1
)

echo.
echo Building frontend...
call npm.cmd run build

if errorlevel 1 (
    echo.
    echo ERROR: npm run build failed.
    pause
    exit /b 1
)

cd ..

if not exist "frontend\dist\index.html" (
    echo.
    echo ERROR: frontend\dist\index.html was not created.
    echo Build failed or Vite output path is different.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   Build completed successfully.
echo ==========================================
echo.
echo You can now run start-museo.bat
echo.

pause
endlocal