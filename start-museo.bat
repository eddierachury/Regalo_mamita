@echo off
setlocal

title Museo de Mama

cd /d "%~dp0"

echo.
echo ==========================================
echo   Museo de Mama - Starting local app
echo ==========================================
echo.

if not exist "frontend\dist\index.html" (
    echo ERROR: Frontend build not found.
    echo Please run build-museo.bat first.
    echo.
    pause
    exit /b 1
)

if not exist "backend\.venv\Scripts\python.exe" (
    echo Creating backend virtual environment...
    py -3 -m venv backend\.venv

    if errorlevel 1 (
        echo ERROR: Could not create backend virtual environment.
        pause
        exit /b 1
    )
)

echo Installing backend dependencies...
backend\.venv\Scripts\python.exe -m pip install --upgrade pip
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt

if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies.
    pause
    exit /b 1
)

echo.
echo Opening browser...
start "" "http://127.0.0.1:8000"

echo.
echo Starting Museo de Mama...
echo.
echo If you want to stop the app, close this window or press CTRL+C.
echo.

cd backend
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000

pause
endlocal