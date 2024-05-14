FROM ubuntu:latest as build
# Install build dependencies
RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY ./api .
RUN apt-get install maven -y
RUN mvn clean install -DskipTests


FROM openjdk:21-jdk-slim
EXPOSE 8080
COPY --from=build /target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
