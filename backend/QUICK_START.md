# 🚀 Express Backend - Getting Started

## ⚡ 5-Minute Quick Start

### Prerequisites
- ✅ Java 21 (you have this)
- ❌ Maven 3.9 (we'll install this)
- ❌ MySQL (optional - Docker Compose includes it)

---

## Step 1: Install Maven (2 minutes)

### Option A: Automatic Installation (RECOMMENDED)

Simply run this script from the backend folder:

```bash
cd D:\ExpenseTracker\backend
install-maven.bat
```

**What it does:**
- Downloads Maven 3.9.0 automatically
- Extracts to `C:\maven`
- Adds to Windows PATH
- Ready to use!

**After running:**
- Close the script window
- Close PowerShell/CMD completely
- Open a NEW PowerShell/CMD window
- Verify: `mvn -version`

---

### Option B: Manual Installation

If the script doesn't work:

1. **Download**: [Maven 3.9.0 ZIP](https://archive.apache.org/dist/maven/maven-3/3.9.0/apache-maven-3.9.0-bin.zip)
2. **Extract** to: `C:\maven`
3. **Add to PATH**:
   - Press `Win + Pause`
   - Click "Environment Variables"
   - System variables → New → `MAVEN_HOME` = `C:\maven`
   - Edit "Path" → New → `C:\maven\bin`
4. **Verify**: Open new CMD, run `mvn -version`

See [MAVEN_INSTALL.md](./MAVEN_INSTALL.md) for detailed steps.

---

## Step 2: Build Backend (2 minutes)

Once Maven is installed and verified, run:

```bash
cd D:\ExpenseTracker\backend
mvn clean package -DskipTests
```

**First time?** This will take 2-5 minutes (downloading dependencies)

**Output should show:**
```
[INFO] BUILD SUCCESS
[INFO] Created: target/expense-tracker-0.0.1-SNAPSHOT.jar
```

---

## Step 3: Run Backend (Choose One)

### Option A: Simple Run (Development)

```bash
mvn spring-boot:run
```

Wait for:
```
Started ExpenseTrackerApplication in X seconds
```

Then open: **http://localhost:8080/api/expenses**

### Option B: Docker Compose (Recommended - Includes MySQL)

```bash
docker-compose up -d
```

Wait 10 seconds, then:
**http://localhost:8080/api/expenses**

### Option C: Direct JAR Execution

```bash
java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
```

---

## ✅ Testing the API

### Health Check
```bash
curl http://localhost:8080/api/expenses/health
```

### Get All Expenses
```bash
curl http://localhost:8080/api/expenses
```

### Create Expense
```bash
curl -X POST http://localhost:8080/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Lunch","amount":15.50,"category":"Food","date":"2024-06-21"}'
```

Or use **Postman**: Import `postman-collection.json`

---

## 🎯 URL References

- **Backend API**: `http://localhost:8080/api/expenses`
- **Frontend Dev**: `http://localhost:5173`
- **Health Check**: `http://localhost:8080/api/expenses/health`

---

## 📚 Full Documentation

- **SETUP.md** - Detailed setup guide
- **HELP.md** - Complete API documentation  
- **MAVEN_INSTALL.md** - Maven installation help
- **PROJECT_SUMMARY.md** - Project overview

---

## 🆘 Troubleshooting

### Maven not found
- Run `install-maven.bat` script
- Close and reopen terminal
- Verify: `mvn -version`

### Port 8080 already in use
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
```

### Build fails
```bash
mvn clean install -U
```

### Docker fails
- Ensure Docker Desktop is running
- Check: `docker --version`

---

## 🚀 Next Steps

1. ✅ Run backend
2. ✅ Start frontend: `cd ../frontend && npm run dev`
3. ✅ Open http://localhost:5173
4. ✅ Create and manage expenses!

---

**Questions?** Check the documentation files or review the error messages - they're very descriptive!
