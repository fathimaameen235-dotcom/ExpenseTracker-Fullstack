@echo off
REM Windows batch script to run the Expense Tracker Backend

setlocal enabledelayedexpansion

echo ========================================
echo Expense Tracker Backend Startup Script
echo ========================================
echo.

REM Check if Maven is installed
mvn -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven 3.9 or later
    pause
    exit /b 1
)

REM Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 21 or later
    pause
    exit /b 1
)

echo Java Version:
java -version

echo.
echo Maven Version:
mvn -v

echo.
echo Building the project...
mvn clean package -DskipTests

if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.
echo Starting the application...
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

pause
