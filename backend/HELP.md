# Expense Tracker Backend - Spring Boot REST API

A modern Spring Boot REST API for managing personal expenses with MySQL database support and Docker deployment capabilities.

## 📋 Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete expenses
- ✅ **Advanced Filtering** - Filter expenses by category, date range, or title
- ✅ **CORS Support** - Pre-configured for frontend at `http://localhost:5173` and production `https://expense-tracker-roan-seven.vercel.app`
- ✅ **REST API Endpoints** - Clean, RESTful API design following best practices
- ✅ **Environment Configuration** - Supports environment variables for database connection
- ✅ **Docker Ready** - Multi-stage Dockerfile for production deployment
- ✅ **Production Code** - Clean architecture with layers: Controller → Service → Repository

## 🛠️ Technology Stack

- **Java 21** - Latest LTS version
- **Spring Boot 3.3.0** - Latest stable version
- **Spring Data JPA** - ORM for database operations
- **MySQL 8.0** - Relational database
- **Maven** - Build and dependency management
- **Lombok** - Reduce boilerplate code
- **Docker** - Containerization

## 📦 Project Structure

```
backend/
├── pom.xml                                 # Maven configuration
├── Dockerfile                              # Docker multi-stage build
├── HELP.md                                 # This file
└── src/
    └── main/
        ├── java/com/ex/expense_tracker/
        │   ├── ExpenseTrackerApplication.java   # Main Spring Boot application
        │   ├── controller/
        │   │   └── ExpenseController.java       # REST endpoints
        │   ├── service/
        │   │   └── ExpenseService.java          # Business logic
        │   ├── repository/
        │   │   └── ExpenseRepository.java       # Data access
        │   ├── entity/
        │   │   └── Expense.java                 # JPA entity
        │   └── dto/
        │       ├── ExpenseRequestDTO.java       # Request DTO
        │       └── ExpenseResponseDTO.java      # Response DTO
        └── resources/
            └── application.properties           # Configuration
```

## 🚀 Getting Started

### Prerequisites

- Java 21 or later
- Maven 3.9 or later
- MySQL 8.0 or later
- Docker (optional, for containerization)

### Database Setup

1. **Create MySQL database:**

```sql
CREATE DATABASE expense_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'expenseuser'@'localhost' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON expense_tracker.* TO 'expenseuser'@'localhost';
FLUSH PRIVILEGES;
```

### Local Development

1. **Clone and navigate to backend directory:**

```bash
cd ExpenseTracker/backend
```

2. **Configure environment variables (optional for local development):**

```bash
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/expense_tracker
export SPRING_DATASOURCE_USERNAME=expenseuser
export SPRING_DATASOURCE_PASSWORD=securepassword
export PORT=8080
```

Or update `application.properties` with your database credentials.

3. **Build the project:**

```bash
mvn clean package
```

4. **Run the application:**

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Endpoints

### Base URL
```
http://localhost:8080/api/expenses
```

### 1. **Get All Expenses**
```http
GET /api/expenses
```
**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Grocery Shopping",
    "amount": 50.00,
    "category": "Food",
    "date": "2024-06-20",
    "createdAt": "2024-06-20"
  }
]
```

### 2. **Get Expense by ID**
```http
GET /api/expenses/{id}
```
**Example:** `GET /api/expenses/1`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Grocery Shopping",
  "amount": 50.00,
  "category": "Food",
  "date": "2024-06-20",
  "createdAt": "2024-06-20"
}
```

### 3. **Create Expense**
```http
POST /api/expenses
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 50.00,
  "category": "Food",
  "date": "2024-06-20"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Grocery Shopping",
  "amount": 50.00,
  "category": "Food",
  "date": "2024-06-20",
  "createdAt": "2024-06-20"
}
```

### 4. **Update Expense**
```http
PUT /api/expenses/{id}
Content-Type: application/json

{
  "title": "Updated Expense",
  "amount": 75.00,
  "category": "Food",
  "date": "2024-06-21"
}
```

**Example:** `PUT /api/expenses/1`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Expense",
  "amount": 75.00,
  "category": "Food",
  "date": "2024-06-21",
  "createdAt": "2024-06-20"
}
```

### 5. **Delete Expense**
```http
DELETE /api/expenses/{id}
```

**Example:** `DELETE /api/expenses/1`

**Response (204 No Content)**

### 6. **Get Expenses by Category**
```http
GET /api/expenses/category/{category}
```

**Example:** `GET /api/expenses/category/Food`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Grocery Shopping",
    "amount": 50.00,
    "category": "Food",
    "date": "2024-06-20",
    "createdAt": "2024-06-20"
  }
]
```

### 7. **Get Expenses by Date Range**
```http
GET /api/expenses/date-range?startDate=2024-06-01&endDate=2024-06-30
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Grocery Shopping",
    "amount": 50.00,
    "category": "Food",
    "date": "2024-06-20",
    "createdAt": "2024-06-20"
  }
]
```

### 8. **Search Expenses by Title**
```http
GET /api/expenses/search?title=grocery
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Grocery Shopping",
    "amount": 50.00,
    "category": "Food",
    "date": "2024-06-20",
    "createdAt": "2024-06-20"
  }
]
```

### 9. **Health Check**
```http
GET /api/expenses/health
```

**Response (200 OK):**
```
"Expense Tracker API is running"
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t expense-tracker-api:latest .
```

### Run with Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: expense_tracker
      MYSQL_USER: expenseuser
      MYSQL_PASSWORD: securepassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    image: expense-tracker-api:latest
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/expense_tracker?useSSL=false&serverTimezone=UTC
      SPRING_DATASOURCE_USERNAME: expenseuser
      SPRING_DATASOURCE_PASSWORD: securepassword
      PORT: 8080
    depends_on:
      mysql:
        condition: service_healthy

volumes:
  mysql_data:
```

Run:

```bash
docker-compose up -d
```

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Local development)
- `https://expense-tracker-roan-seven.vercel.app` (Production)

To add more origins, modify the `@CrossOrigin` annotation in `ExpenseController.java`.

## 🔒 Security Notes

1. **Environment Variables** - Use environment variables for sensitive data (database credentials)
2. **Database User** - Never use root credentials in production
3. **HTTPS** - Always use HTTPS in production
4. **Input Validation** - Add validation annotations as needed
5. **SQL Injection** - JPA prevents SQL injection through parameterized queries

## 📊 Database Schema

The `expenses` table is automatically created by Hibernate with the following structure:

```sql
CREATE TABLE expenses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  amount DOUBLE NOT NULL,
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  created_at DATE NOT NULL,
  INDEX idx_category (category),
  INDEX idx_date (date)
);
```

## 🧪 Testing

Run unit tests:

```bash
mvn test
```

## 📝 Logging

Logging configuration in `application.properties`:
- **Root Level**: INFO
- **Application Level**: DEBUG
- **Hibernate SQL**: DEBUG
- **Spring Web**: INFO

## 🚨 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE expense_tracker;`

### Port Already in Use
```bash
# Change port in environment variable
export PORT=8081
```

### Build Issues
```bash
# Clean build
mvn clean install
```

## 📖 Reference Documentation

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Web](https://spring.io/guides/gs/serving-web-content/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is part of the Expense Tracker application.

## 🤝 Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Use meaningful commit messages
4. Keep DTOs separate from entities

---

**Last Updated**: June 2024
**Spring Boot Version**: 3.3.0
**Java Version**: 21

If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

