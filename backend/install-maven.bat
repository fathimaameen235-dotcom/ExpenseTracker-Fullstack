@echo off
REM Maven Auto-Installer for Windows
REM This script downloads and installs Maven 3.9.0

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Maven Automatic Installer
echo ========================================
echo.

REM Check if Maven already exists
if exist "C:\maven\bin\mvn.cmd" (
    echo Maven is already installed at C:\maven
    echo.
    echo Run: mvn -version
    pause
    exit /b 0
)

REM Check Java
echo Checking Java installation...
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java is not installed
    echo Please install Java 21 first
    pause
    exit /b 1
)

echo Java found: OK
echo.

REM Download Maven
echo Downloading Maven 3.9.0...
echo This may take a minute...
echo.

if exist "C:\maven" rmdir /s /q "C:\maven"
mkdir "C:\maven"

REM Try using PowerShell
powershell -NoProfile -Command "^
    $ProgressPreference = 'SilentlyContinue'; ^
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; ^
    $client = New-Object System.Net.WebClient; ^
    $client.DownloadFile('https://archive.apache.org/dist/maven/maven-3/3.9.0/apache-maven-3.9.0-bin.zip', '%TEMP%\maven.zip'); ^
    Write-Host 'Download complete'
"

if not exist "%TEMP%\maven.zip" (
    echo.
    echo ERROR: Download failed
    echo.
    echo Please download manually from:
    echo https://archive.apache.org/dist/maven/maven-3/3.9.0/apache-maven-3.9.0-bin.zip
    echo.
    echo Extract to: C:\maven
    echo.
    pause
    exit /b 1
)

echo Download successful!
echo.
echo Extracting Maven...

REM Extract using PowerShell
powershell -NoProfile -Command "^
    Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath 'C:\' -Force; ^
    Get-ChildItem 'C:\apache-maven-3.9.0' | Move-Item -Destination 'C:\maven\' -Force; ^
    Remove-Item 'C:\apache-maven-3.9.0' -Force
"

if not exist "C:\maven\bin\mvn.cmd" (
    echo ERROR: Extraction failed
    pause
    exit /b 1
)

echo Extraction successful!
echo.
echo Setting up environment variables...

REM Add to PATH using PowerShell
powershell -NoProfile -Command "^
    [Environment]::SetEnvironmentVariable('MAVEN_HOME', 'C:\maven', 'Machine'); ^
    $path = [Environment]::GetEnvironmentVariable('PATH', 'Machine'); ^
    if ($path -notlike '*C:\maven\bin*') { ^
        $path = $path + ';C:\maven\bin'; ^
        [Environment]::SetEnvironmentVariable('PATH', $path, 'Machine'); ^
    }
"

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Maven is installed at: C:\maven
echo.
echo IMPORTANT: Close this window and open a NEW PowerShell/CMD window
echo Then run: mvn -version
echo.
pause
