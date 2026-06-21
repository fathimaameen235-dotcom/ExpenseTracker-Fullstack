# Backend Setup and Running Instructions

## Quick Start

### Prerequisites Check

Before starting, verify you have Java 21:
```bash
java -version
```

You should see: `Java 21.x.x` or later

### Option 0: Install Maven (REQUIRED FIRST)

Maven is required to build and run the backend. Choose one method below:

#### Method A: Manual Download (Recommended for Windows)

1. **Download Maven 3.9.0** from: https://archive.apache.org/dist/maven/maven-3/3.9.0/apache-maven-3.9.0-bin.zip

2. **Extract to C:\maven**:
   - Right-click → Extract All
   - Choose destination: `C:\maven`
   - You should have: `C:\maven\bin\mvn.cmd`

3. **Add Maven to PATH**:
   - Press `Win + Pause` or search "Environment Variables"
   - Click "Environment Variables" button
   - Under "System variables", click "New"
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\maven`
   - Click OK
   
   Then:
   - Find "Path" in System variables, click Edit
   - Click "New"
   - Add: `C:\maven\bin`
   - Click OK multiple times

4. **Verify Installation**:
   - Open **NEW** PowerShell/CMD window
   - Run: `mvn -version`
   - Should show Maven 3.9.0

#### Method B: Using Chocolatey (Easiest - if installed)

```bash
choco install maven
```

Then verify:
```bash
mvn -version
```

#### Method C: Using Windows Package Manager

```bash
winget install ApacheMaven.Maven.3.9
```

### Option 1: Local Development with MySQL

#### Prerequisites
- ✅ Java 21 installed
- ✅ Maven 3.9+ installed (see Option 0 above)
- MySQL 8.0+ running
- Git

#### Setup Database
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE expense_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (optional, for security)
CREATE USER 'expenseuser'@'localhost' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON expense_tracker.* TO 'expenseuser'@'localhost';
FLUSH PRIVILEGES;
```

#### Build and Run
```bash
cd backend

# Build the project
mvn clean package -DskipTests

# Run the application (uses development profile)
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Or run the JAR directly
java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

The API will be available at: `http://localhost:8080/api/expenses`

### Option 2: Docker Compose (Recommended)

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Run Everything
```bash
cd backend

# Build and start both MySQL and API
docker-compose up -d

# Check logs
docker-compose logs -f api

# Stop everything
docker-compose down

# Clean up volumes
docker-compose down -v
```

The API will be available at: `http://localhost:8080/api/expenses`

MySQL will be available at: `localhost:3306`

### Option 3: Build Docker Image Only

```bash
cd backend

# Build the Docker image
docker build -t expense-tracker-api:latest .

# Run the container
docker run -d \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/expense_tracker \
  -e SPRING_DATASOURCE_USERNAME=expenseuser \
  -e SPRING_DATASOURCE_PASSWORD=securepassword \
  -e PORT=8080 \
  --name expense-tracker-api \
  expense-tracker-api:latest
```

## Testing the API

### Using cURL

```bash
# Get all expenses
curl http://localhost:8080/api/expenses

# Create an expense
curl -X POST http://localhost:8080/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lunch",
    "amount": 15.50,
    "category": "Food",
    "date": "2024-06-21"
  }'

# Get expense by ID
curl http://localhost:8080/api/expenses/1

# Update expense
curl -X PUT http://localhost:8080/api/expenses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dinner",
    "amount": 25.00,
    "category": "Food",
    "date": "2024-06-21"
  }'

# Delete expense
curl -X DELETE http://localhost:8080/api/expenses/1

# Health check
curl http://localhost:8080/api/expenses/health
```

### Using Postman

1. Import the collection from `postman-collection.json` (create if needed)
2. Set the base URL to `http://localhost:8080`
3. Test each endpoint

## Environment Variables

### Local Development (via application-dev.properties)
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=root
```

### Docker Compose (via docker-compose.yml)
```yaml
SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/expense_tracker
SPRING_DATASOURCE_USERNAME: expenseuser
SPRING_DATASOURCE_PASSWORD: securepassword
PORT: 8080
```

### Production (via environment variables)
```bash
export SPRING_DATASOURCE_URL=jdbc:mysql://db-host:3306/expense_tracker
export SPRING_DATASOURCE_USERNAME=expenseuser
export SPRING_DATASOURCE_PASSWORD=securepassword
export PORT=8080
```

## Project Structure

```
backend/
├── pom.xml                           # Maven configuration
├── Dockerfile                        # Docker multi-stage build
├── docker-compose.yml                # Docker Compose setup
├── HELP.md                           # Comprehensive documentation
├── README.md                         # This file
├── .gitignore                        # Git ignore rules
└── src/
    ├── main/
    │   ├── java/com/ex/expense_tracker/
    │   │   ├── ExpenseTrackerApplication.java
    │   │   ├── controller/ExpenseController.java
    │   │   ├── service/ExpenseService.java
    │   │   ├── repository/ExpenseRepository.java
    │   │   ├── entity/Expense.java
    │   │   ├── dto/
    │   │   │   ├── ExpenseRequestDTO.java
    │   │   │   └── ExpenseResponseDTO.java
    │   │   └── exception/
    │   │       ├── ErrorResponse.java
    │   │       ├── ExpenseNotFoundException.java
    │   │       └── GlobalExceptionHandler.java
    │   └── resources/
    │       ├── application.properties
    │       ├── application-dev.properties
    │       └── application-prod.properties
    └── test/
        └── java/com/ex/expense_tracker/
            └── ExpenseTrackerApplicationTests.java
```

## Maven Commands

```bash
# Clean build
mvn clean

# Compile
mvn compile

# Run tests
mvn test

# Package
mvn package

# Install locally
mvn install

# Skip tests during build
mvn package -DskipTests

# Run the application
mvn spring-boot:run

# Check dependencies
mvn dependency:tree

# Update all plugins
mvn -U ...

# Build Docker image
mvn spring-boot:build-image
```

## Troubleshooting

### Port 8080 already in use
```bash
# Change port in application-dev.properties
server.port=8081

# Or use environment variable
export PORT=8081
```

### MySQL connection refused
```bash
# Verify MySQL is running
sudo service mysql status

# Start MySQL
sudo service mysql start

# Check MySQL credentials in application-dev.properties
```

### Build fails
```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Rebuild
mvn clean install
```

### Docker container won't start
```bash
# Check container logs
docker logs expense_tracker_api

# Check if port is in use
lsof -i :8080

# Remove old container
docker rm expense_tracker_api
docker rmi expense-tracker-api:latest
```

## Additional Notes

- The backend uses Java 21 with Spring Boot 3.3.0
- CORS is configured for frontend URLs
- Database schema is auto-created/updated by Hibernate
- Lombok is used to reduce boilerplate code
- Logging is configured for development and production
- Exception handling is global via GlobalExceptionHandler

## Support

Refer to [HELP.md](./HELP.md) for comprehensive API documentation.
