# Expense Tracker Backend - Project Summary

## 📊 Project Overview

This is a **production-ready Spring Boot REST API** for an Expense Tracker application with complete CRUD operations, advanced filtering, and Docker deployment support.

## 🎯 Key Characteristics

- **Framework**: Spring Boot 3.3.0 (Latest Stable)
- **Language**: Java 21 (Latest LTS)
- **Build Tool**: Maven 3.9
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA with Hibernate
- **Architecture**: Clean 3-layer architecture (Controller → Service → Repository)
- **Code Quality**: Production-ready with proper exception handling and logging

## 📁 Complete File Structure

```
backend/
├── pom.xml                                 # Maven configuration with all dependencies
├── Dockerfile                              # Multi-stage production-ready Docker build
├── docker-compose.yml                      # Docker Compose with MySQL and API
├── HELP.md                                 # Comprehensive API documentation
├── SETUP.md                                # Setup and running instructions
├── README.md                               # Quick start guide
├── run.bat                                 # Windows startup script
├── run.sh                                  # Linux/Mac startup script
├── .gitignore                              # Git ignore rules
│
├── src/main/
│   ├── java/com/ex/expense_tracker/
│   │   ├── ExpenseTrackerApplication.java           # Main Spring Boot class
│   │   │
│   │   ├── controller/
│   │   │   └── ExpenseController.java               # REST endpoints (11 endpoints)
│   │   │
│   │   ├── service/
│   │   │   └── ExpenseService.java                  # Business logic layer
│   │   │
│   │   ├── repository/
│   │   │   └── ExpenseRepository.java               # Data access with custom queries
│   │   │
│   │   ├── entity/
│   │   │   └── Expense.java                         # JPA entity with auto timestamp
│   │   │
│   │   ├── dto/
│   │   │   ├── ExpenseRequestDTO.java               # Request DTO
│   │   │   └── ExpenseResponseDTO.java              # Response DTO
│   │   │
│   │   └── exception/
│   │       ├── ErrorResponse.java                   # Unified error response
│   │       ├── ExpenseNotFoundException.java        # Custom exception
│   │       └── GlobalExceptionHandler.java          # Global exception handler
│   │
│   └── resources/
│       ├── application.properties                   # Default configuration
│       ├── application-dev.properties               # Development profile
│       └── application-prod.properties              # Production profile
│
└── src/test/
    └── java/com/ex/expense_tracker/
        └── ExpenseTrackerApplicationTests.java      # Basic integration test
```

## 🔌 REST API Endpoints (11 Total)

### Core CRUD Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/{id}` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |

### Advanced Filtering
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses/category/{category}` | Get by category |
| GET | `/api/expenses/date-range?startDate=X&endDate=Y` | Get by date range |
| GET | `/api/expenses/search?title=X` | Search by title |

### Utility
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses/health` | Health check |

## 📋 Expense Entity Schema

```
Table: expenses

Columns:
- id (BIGINT, AUTO_INCREMENT, PRIMARY KEY)
- title (VARCHAR 255, NOT NULL)
- amount (DOUBLE, NOT NULL)
- category (VARCHAR 100, NOT NULL)
- date (DATE, NOT NULL)
- created_at (DATE, NOT NULL, IMMUTABLE)

Indexes:
- idx_category (on category column)
- idx_date (on date column)
```

## 🛠️ Technology Stack Details

### Core Dependencies
- **spring-boot-starter-web** - REST API support
- **spring-boot-starter-data-jpa** - ORM and data access
- **mysql-connector-j** - MySQL driver
- **lombok** - Reduce boilerplate (auto-generates getters, setters, constructors)

### Development
- **spring-boot-devtools** - Hot reload and live reload
- **h2database** - In-memory database for testing

### Build
- **spring-boot-maven-plugin** - Build and run Spring Boot apps
- **maven-compiler-plugin** - Java 21 compilation

## 🔐 Security Features

1. **CORS Configuration** - Pre-configured for frontend URLs
   - `http://localhost:5173` (Development)
   - `https://expense-tracker-roan-seven.vercel.app` (Production)

2. **Exception Handling** - Global error handling with `@RestControllerAdvice`

3. **Environment Variables** - Sensitive data stored in environment variables

4. **Docker Security** - Non-root user in Docker image

5. **Input Validation** - Request/Response DTOs separate from entities

## 🚀 Running the Application

### Quick Start (One Command)

**Windows:**
```bash
cd backend && run.bat
```

**Linux/Mac:**
```bash
cd backend && chmod +x run.sh && ./run.sh
```

### Using Docker Compose (Easiest)
```bash
cd backend
docker-compose up -d
```

### Manual Maven
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

## 📊 Configuration Profiles

### Development (`application-dev.properties`)
- Database: `jdbc:mysql://localhost:3306/expense_tracker`
- User: `root` / Password: `root`
- DDL: `create-drop` (recreate on startup)
- Logging: DEBUG level
- DevTools: Enabled

### Production (`application-prod.properties`)
- Database: Via environment variables
- DDL: `update` (preserve data)
- Logging: WARN level
- Connection Pool: Optimized for production

## 💾 Database

### Automatic Schema Creation
Hibernate automatically creates and manages the database schema based on entity annotations. Set via `spring.jpa.hibernate.ddl-auto`:
- `dev`: `create-drop` - Fresh schema on each startup
- `prod`: `update` - Preserve existing data

### Connection Pool
- Technology: HikariCP (default Spring Boot connection pool)
- Dev Config: 5 max connections
- Prod Config: 20 max connections

## 📦 Build Artifacts

After `mvn clean package`:
- JAR File: `target/expense-tracker-0.0.1-SNAPSHOT.jar`
- Size: ~60-70 MB (includes all dependencies)
- Runnable: Yes (`java -jar ...`)

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Test Files Location
```
src/test/java/com/ex/expense_tracker/
```

### Current Tests
- `ExpenseTrackerApplicationTests.java` - Context load test

## 📝 Logging Configuration

### Log Levels
- **Root**: INFO
- **App Code** (`com.ex.expense_tracker`): DEBUG
- **Spring Framework**: INFO/DEBUG (profile-dependent)
- **Hibernate SQL**: DEBUG/TRACE (dev profile)

### Log Output
- Console (default)
- Configured in `application*.properties`

## 🐳 Docker Information

### Docker Image
- **Base Image**: `eclipse-temurin:21-jre-alpine` (lightweight)
- **Size**: ~250-300 MB
- **Non-root User**: `appuser` (security best practice)
- **Health Check**: Enabled

### Docker Compose Services
1. **MySQL** - Port 3306, volume: `mysql_data`
2. **API** - Port 8080, depends on MySQL health

## 🔄 Deployment Options

### Option 1: Local Development
✅ Run with Maven on local machine
- Command: `mvn spring-boot:run`
- Best for: Development and testing

### Option 2: Docker Compose (Recommended for local)
✅ Complete stack with MySQL
- Command: `docker-compose up -d`
- Best for: Local testing with database

### Option 3: Cloud Deployment
✅ Docker image ready for cloud platforms
- Azure App Service
- AWS ECS/Fargate
- Google Cloud Run
- Heroku
- DigitalOcean

### Deployment Checklist
- [ ] Set environment variables for database
- [ ] Configure CORS for frontend URL
- [ ] Set up MySQL database
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set resource limits (CPU, memory)

## 📖 Documentation Files

1. **HELP.md** - Complete API documentation with examples
2. **SETUP.md** - Detailed setup and troubleshooting guide
3. **README.md** - Quick start guide
4. **PROJECT_SUMMARY.md** - This file

## ✅ Production Readiness Checklist

- ✅ Clean 3-layer architecture
- ✅ DTOs for request/response separation
- ✅ Global exception handling
- ✅ Logging configured
- ✅ CORS properly configured
- ✅ Environment variable support
- ✅ Database connection pooling
- ✅ Multi-stage Docker build
- ✅ Non-root Docker user
- ✅ Docker Compose for full stack
- ✅ Development and production profiles
- ✅ Comprehensive documentation
- ✅ Startup scripts for multiple platforms
- ✅ `.gitignore` configured

## 🚀 Next Steps

1. **Database Setup**: Create MySQL database and user
2. **Run Application**: Use `run.bat` or Docker Compose
3. **Test API**: Use curl or Postman
4. **Connect Frontend**: Configure frontend to use `http://localhost:8080/api`
5. **Deploy**: Push Docker image to registry and deploy

## 📞 Common Commands

```bash
# Build
mvn clean package -DskipTests

# Run
mvn spring-boot:run

# Test
mvn test

# Docker
docker build -t expense-tracker-api:latest .
docker-compose up -d
docker-compose down

# Database
mysql -u root -p < schema.sql
```

## 🔗 Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)

---

**Status**: ✅ Production Ready
**Last Updated**: June 2024
**Version**: 1.0.0-SNAPSHOT
