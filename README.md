
ez a branch: Ang17_standalonecomp_NOkeycloak_NOopenPI_frontedn a Ang17_standalonecomp_fronteend böl le weggebrancht, de mindketten a angular16-keycloak-spring repository branchjei
EZT A BRANCHBOL KIVETTEM AZ OPENAPI ES A KEYCLOAK RESZT HOGY KÖNNYEBBEN LEHESSEN A DOCKER KONFIGURÁCIÓT ELVÉGEZNI RAJTA

na ez  anoopenAPI

#GIT: istvan_bende@yahoo.com/bendep72
    Repository:  https://github.com/bendei/angular16-keycloak-spring.git
    Ennek van 4 branchesje: master, keycloak_frontend, angular16_keycloak-openAPI-Spring, angular16-openAPI-Spring
a commitok itt nezhetők vissza: https://github.com/bendei/angular16-keycloak-spring/network

# Java (Spring Boot) and Angular basic showcase
THis project conatains 3 module: a parent one, a backend and frontend.
We build here a Spring fat jar, that contains the backend and the frontend.
We can start frontend and backend separately too.

### Frontend:
Angular app uses port 4200, java backend 8081.
The heavy lifting is done by the plugin https://github.com/eirslett/frontend-maven-plugin. This plugin downloads and installs node, install the libraries and build the project by running npm install.
C:\Users\36309\.m2\repository\com\github\eirslett\node\20.5.1\node-20.5.1-win-x64.exe
(com.github.eirslett mint a kvs projectben)
The result is a jar file that contains the Angular application compiled.

### Buildelés:
A. java-angular-example: mvn clean, install
B. vagy csak a forntend/backend külön 

This is a quick starter for projects using Spring Boot as backend and Angular as frontend.

### Backend
Wir haben das Frontend Module in das Backend module importiert, wir haben maven-dependency-plugin verwendet, welches den Frontend-Inhalt auspakt und kopiert es im /classes/static Verzeichnis von Backend.
Pacjaking von Backend was als war File, und wir haben es in einer der Wildfly Servers eingespielt.
Az (backend) app futtatása:
1. mvn clean; mvn package
2. cd bacend/target
3. java -jar backend-0.1-SNAPSHOT.jar

vagy: Application RUn configból futtatjuk a Application osztályt.

### Frontend futtatása:
1. cd frontend
2. ng serve
3. ng testű

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

### making subsequent commits locally and than pushing it all as one with one commit message:
1. Go to Git pane in the IDE down below -> stand with coursor with Remote-origin-master: click "compare with master"
2. In the window in the middle "Commits that exists in master but dont exist in origin/master" -> jobb erér click -> squash commits : write a new message
3. Now check the squased message apperas  in the pane where you can find commits (and #1 #2 commits disappear)
4. Push

## java version news:
    https://www.marcobehler.com/guides/a-guide-to-java-versions-and-features

## wildFly 27:

1. Download WildFly 27
2. unzip it into a folder
3. IntelliJ Edit configuration:
    -	Add new configuration, choose JBoss/WildFly
    -	Server fülön -> Application server: itt a kicsimagolt mappát kell megadni pl:C:\Ujgyakorlat\WildFly\wildfly-27.0.1.Final
    -	VM options: -Xmx2000m
    -	URL: http://localhost:8080/springbootwildfly/hello/bendepsiat
    -   deployment: artifact-> demo.war:exploded


Elsőként IntelliJ-n kívül inditjuk el a servert: (see: https://docs.wildfly.org/27/Getting_Started_Guide.html#installation)
1.	Egy management usert kell létrehoznunk, hogy az admin consolba beléphessünk:
      run /bin/add-user.bat
    -	choose "Management User"
    -	username: bende
    -   password: bende01
    -	"What groups do you want this user to belong to? (Please enter a comma separated list, or leave blank for none)[  ]:"
         leave this blank just press Enter
    -	"Is this new user going to be used for one AS process to connect to another AS process?
         e.g. for a secondary host controller connecting to the primary or for a Remoting connection for server to server Jakarta Enterprise Beans calls.
         yes/no?"
         Just press Enter again
2.	A admin console megnyitása: localhost:9990/console
3.	Ha az Intellij nem birja elinditani a szervert: lehet hogy lokálisan már fut.
      Leállitjuk: bin/jboss-cli.bat -> "connect", majd ha a "shutdown"
4.	Alklamazás futtaása:
      A.
      IntelliJ terminal:
    -	mvn clean install
    -	wildfly:deploy
    -	wildfly:undeploy
         B.
         Simán az IntelliJ start server zöld ikon fent

