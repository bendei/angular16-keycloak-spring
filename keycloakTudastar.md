

https://medium.com/@rayen19952/securing-angular-app-routes-using-keycloack-4fdb2622223e

https://hamdi-bouallague.medium.com/secure-your-angular-spring-boot-application-using-keycloak-891efab50db8

https://gauthier-cassany.com/posts/spring-boot-keycloak

https://stackoverflow.com/questions/77600996/how-to-import-keycloak-module-using-standalone-components-and-without-ngmodule

https://wkrzywiec.medium.com/step-by-step-guide-how-integrate-keycloak-with-angular-application-d96b05f7dfdd

// proxy, CORS
https://plainenglish.io/blog/all-you-need-to-know-about-angular-proxy-configuration

https://medium.com/@rayen19952/dockerizing-spring-boot-application-aee3b7d6931b

https://www.npmjs.com/package/keycloak-angular

https://miloszeljko.com/step-by-step-guide-setting-up-keycloak-oauth2-in-angular-and-net-core-for-secure-authentication/

JBoss has developed Keycloak as a Java-based open-source Identity and Access Management solution. Besides the support of both OAuth 2.0 and OIDC, 
it also offers features like identity brokering, user federation, and SSO.

We can use Keycloak as a standalone server with an admin console or embed it in a Spring application. Once we have our Keycloak running in either of these ways, we can try the endpoints.
###########################################################################################################################################################################
keycloak telepitése és admnisztrálása
https://medium.com/@rayen19952/securing-angular-app-routes-using-keycloack-4fdb2622223e
###########################################################################################################################################################################

1.  Starten von Keycloak in developermodus
    führe aus: /keycloack-22.0.3\bin\kc.bat start-dev

2.  Öffnen KC: localhost:8080
3.  Beim ersten Login muss man einen user auf dem Login Seite erstellen: bende/bende
    !!! Action expired hiba jön: csak az edge böngészővel tudok az Administration konzolra belépni

    Konfigurieren für meine Appl.
    - Realm: umfasst user, roles und client (= frontend und backend applikationen) die gemeinsam aunthentifiziert werden.
        Name der reals die wir erstellen: Login
    - Erstellen backend und frontend clients. Users werden diesen clients unterstellt. 
         client ID: frontend
         Client type: OpenID Connect
         Client authentification: OFF : public access type
         Authentication flow: standard flow
         Direct access grant: on
         root URL: http://localhost:4200   a angular appl
         valid redirect URL: http://localhost:4200/*
         web origing: +
    - Roles eintellen zum frontend client: admin und user
    - Einrichten von Users und Zuweisen zu den Roles.
              
Ha már setup minden akkor megnézhetjük a beállitásokat:
    a Admin oldalon a dropdownbol a Login realmot kiválasztjuk és ott akkor a hozzá tartozó client, user, role ok jelennek meg ill. managelhetőek.

Angular Frontend übergibt das Login-Verwaltung komplett dem keycloak server. Das Login Prozess ist administriert bei dem keycloak ( provider). Angular erhält ein OIDC Json 
webtoken vom Provider nach dem erfolgreichen Login und schickt es dem Spring Backend im Http Header weiter. Backend ebenfals beschäftigt sich mit dem Login Prozess nicht.

Testing Keycloak Token endpoint with Postman:
    http://localhost:8080/auth/realms/login/protocol/openid-connect/token
    https://www.baeldung.com/postman-keycloak-endpoints

http://localhost:8080/realms/Login/protocol/openid-connect/token
body: form-urlencoded
grant-type: password
client_id: frontend
client_secret: amit a client -> credetnials fülön a client secret mezőben találunk a keycloak UI-on
username:/password: pisti

