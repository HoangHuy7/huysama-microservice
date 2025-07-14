FROM  openjdk:17.0.2-slim

MAINTAINER huysama

VOLUME /home/huysama
RUN mkdir -p /home/huysama
WORKDIR /home/huysama
COPY ./application.jar /home/huysama/microservice-huysama-authentication-service.jar
ENTRYPOINT ["java","-jar","microservice-huysama-authentication-service.jar"]