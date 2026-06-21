# Multi-stage build for Spring Boot Expense Tracker Application

# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .

# Copy the entire source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests -q

# Stage 2: Runtime environment
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Create non-root user for security
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose the default port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD java -version || exit 1

# Set environment variables for runtime
ENV PORT=8080 \
    SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/expense_tracker \
    SPRING_DATASOURCE_USERNAME=expenseuser \
    SPRING_DATASOURCE_PASSWORD=changeme

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
