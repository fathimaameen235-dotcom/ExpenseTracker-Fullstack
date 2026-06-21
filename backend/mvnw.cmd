@REM Apache Maven Wrapper Script for Windows

@echo off
setlocal enabledelayedexpansion

set "DIRNAME=%~dp0"
if "%DIRNAME%"=="" set "DIRNAME=."

set "wrapperJarPath=%DIRNAME%\.mvn\wrapper\maven-wrapper.jar"

if not exist "%wrapperJarPath%" (
    echo Downloading Maven wrapper...
    for /f "tokens=*" %%A in ('type "%DIRNAME%\.mvn\wrapper\maven-wrapper.properties" ^| find "wrapperUrl"') do (
        set "wrapperUrl=%%A"
        set "wrapperUrl=!wrapperUrl:wrapperUrl=!"
    )
    
    if not exist "%DIRNAME%\.mvn\wrapper" mkdir "%DIRNAME%\.mvn\wrapper"
    
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%wrapperJarPath%')"
)

for /f "tokens=*" %%A in ('type "%DIRNAME%\.mvn\wrapper\maven-wrapper.properties" ^| find "distributionUrl"') do (
    set "distributionUrl=%%A"
    set "distributionUrl=!distributionUrl:distributionUrl=!"
)

java -classpath "%wrapperJarPath%" org.apache.maven.wrapper.MavenWrapperMain %*
