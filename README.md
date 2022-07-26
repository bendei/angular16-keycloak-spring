# Java (Spring Boot) and Angular basic showcase
THis project conatains 3 module: a parent one, a backend and frontend.
We build here a fat jar, that contains the backend and the frontend.
We can start frontend and backend separately too.

### Frontend:
Angular app uses port 4200, java backend 8081.
The heavy lifting is done by the plugin https://github.com/eirslett/frontend-maven-plugin. This plugin download node, install the libraries and build the project.
(com.github.eirslett mint a kvs projectben)
The result is a jar file that contains the Angular application compiled.

### Buildelés:
A. java-angular-example: mvn clean, install
B. vagy csak a forntend/backend külön 

This is a quick starter for projects using Spring Boot as backend and Angular as frontend.

### Backend
Az (backend) app futtatása:
1. mvn clean; mvn package
2. cd bacend/target
3. mvn java -jar backend-0.1-SNAPSHOT.jar

vagy: Application RUn configból futtatjuk a Application osztályt.

### Frontend futtatása:
1. cd frontend
2. ng serve
3. ng test
### OpenAPI ( Swagger ) for defining and documenting REST API
-- we generate typescript and java fiels from OpenAPI definition file: API first approach. OpenAPI spec is one of the spec formats.
// https://blog.mimacom.com/using-the-openapi-generator-for-spring-boot/
// https://www.stefanwille.com/2021/05/2021-05-30-openapi-code-generator-for-typescript
// defintion file tutorial
// https://support.smartbear.com/swaggerhub/docs/tutorials/openapi-3-tutorial.html


To the basic example I added some 'showcases' extra features:
- Test with MockMvc
- Test with RestTemplateTest
- OpenApi using Spring Doc (code first). Swagger-ui is accessible here: http://localhost:8080/swagger-ui


