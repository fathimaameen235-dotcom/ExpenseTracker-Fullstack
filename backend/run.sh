#!/bin/bash

# Linux/Mac script to run the Expense Tracker Backend

echo "========================================"
echo "Expense Tracker Backend Startup Script"
echo "========================================"
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed or not in PATH"
    echo "Please install Maven 3.9 or later"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java 21 or later"
    exit 1
fi

echo "Java Version:"
java -version

echo ""
echo "Maven Version:"
mvn -v

echo ""
echo "Building the project..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "ERROR: Build failed"
    exit 1
fi

echo ""
echo "Build successful!"
echo ""
echo "Starting the application..."
echo "API will be available at: http://localhost:8080/api/expenses"
echo "Press Ctrl+C to stop"
echo ""

mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
