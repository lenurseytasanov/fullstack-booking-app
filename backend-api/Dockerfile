# syntax=docker/dockerfile:1.7-labs
FROM maven:3.9.9-eclipse-temurin-21-alpine as builder
WORKDIR /app
COPY pom.xml .
COPY --parents */pom.xml .

RUN mvn -B dependency:go-offline
COPY . .
RUN mvn -f pom.xml clean package -Dmaven.test.skip=true

# ------

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=builder /app/web/target/*.jar *.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/*.jar"]