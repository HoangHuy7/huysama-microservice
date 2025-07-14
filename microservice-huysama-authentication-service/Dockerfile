FROM eclipse-temurin:17.0.15_6-jdk-alpine AS builder
WORKDIR /app
COPY ./application.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract


FROM eclipse-temurin:17.0.15_6-jdk-alpine AS jlink-builder
WORKDIR /app
RUN jlink --add-modules java.base,java.logging,java.naming,java.sql,java.management,jdk.unsupported,java.desktop,java.security.jgss,jdk.crypto.ec,java.xml,java.instrument \
          --no-header-files \
          --no-man-pages \
          --compress=2 \
          --output /opt/customjre


FROM alpine:3.18
WORKDIR /app

COPY --from=jlink-builder /opt/customjre /opt/jre
COPY --from=builder /app/dependencies/ ./
COPY --from=builder /app/spring-boot-loader/ ./
COPY --from=builder /app/snapshot-dependencies/ ./
COPY --from=builder /app/application/ ./

ENV PATH="/opt/jre/bin:$PATH"

ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

