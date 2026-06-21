# Maven Installation Guide for Windows

This guide will help you install Maven 3.9.0 on Windows.

## Step-by-Step Installation

### Step 1: Download Maven

1. Click this link: **[Apache Maven 3.9.0](https://archive.apache.org/dist/maven/maven-3/3.9.0/apache-maven-3.9.0-bin.zip)**

2. Save the file (should be ~10 MB)

### Step 2: Extract Maven

1. Once downloaded, right-click the ZIP file
2. Select "Extract All..."
3. Set the destination to: `C:\maven`
4. Click "Extract"

Wait for extraction to complete. You should see `C:\maven\bin\mvn.cmd` file.

### Step 3: Add Maven to System PATH

#### Windows 10/11:

1. Press **Windows Key + Pause** to open System Properties
2. Or: Press **Windows Key**, search "Environment", click "Edit environment variables for your account"
3. In the Environment Variables window:
   - Look for "System variables" section (bottom half)
   - Click **"New"** button
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\maven`
   - Click **OK**

4. Now find "Path" in the System variables list
   - Click **Edit**
   - Click **New**
   - Type: `C:\maven\bin`
   - Click **OK**
   - Click **OK** to close all windows

### Step 4: Verify Installation

1. **Close all open PowerShell/CMD windows**
2. Open a **NEW** PowerShell or CMD window
3. Type: `mvn -version`
4. You should see:
   ```
   Apache Maven 3.9.0
   Maven home: C:\maven
   ...
   ```

If you see the above, Maven is installed correctly!

## Troubleshooting

### "mvn is not recognized"

If Maven isn't found:
1. Verify you closed and reopened PowerShell/CMD (important!)
2. Check that `C:\maven` folder exists
3. Check that `C:\maven\bin\mvn.cmd` file exists
4. Double-check PATH settings (System, not just User)

### "Could not find or load main class"

Make sure you're using the latest Java 21:
```bash
java -version
```

## Next Steps

Once Maven is installed, go back to the backend folder and run:

```bash
cd D:\ExpenseTracker\backend
mvn clean package -DskipTests
```

This will download dependencies and build the application. It may take 2-5 minutes on first run.

Then run the app:
```bash
mvn spring-boot:run
```

The API will be available at: `http://localhost:8080/api/expenses`

---

**Need Help?**  
See SETUP.md in the backend folder for complete instructions.
