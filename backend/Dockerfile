FROM openjdk:17
LABEL authors="BendeI"
VOLUME /tmp
# expose nem az amin elérjük a alkalmazást, hanem ezen a conatiner figyel !!
# valahogy más porttal nem megy a containerben a appl?!
EXPOSE 8081
ARG JAR_FILE=target/backend-0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


