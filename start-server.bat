@echo off
echo Starting Coastline Spray Foam Website...
echo.
echo Trying different methods to start the server...
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Found Python! Starting server on http://localhost:8000
    echo.
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Try Python 3 explicitly
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Found Python3! Starting server on http://localhost:8000
    echo.
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python3 -m http.server 8000
    goto :end
)

REM Try Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Found Node.js! Installing and starting server...
    echo.
    npx serve -p 8000
    goto :end
)

REM If nothing works, show instructions
echo.
echo ========================================
echo   NO SERVER FOUND - MANUAL INSTRUCTIONS
echo ========================================
echo.
echo Option 1: Install Python
echo   1. Go to https://python.org/downloads
echo   2. Download and install Python
echo   3. Run this file again
echo.
echo Option 2: Open files directly
echo   1. Double-click on index.html
echo   2. It will open in your browser
echo.
echo Option 3: Use VS Code Live Server
echo   1. Install VS Code
echo   2. Install Live Server extension
echo   3. Right-click index.html and select "Open with Live Server"
echo.
pause

:end
