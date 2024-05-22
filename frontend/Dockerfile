#Download Node Alpine image
# https://dev.to/usmslm102/containerizing-angular-application-for-production-using-docker-3mhi
# https://www.youtube.com/watch?v=-o5l6zFJ9_o
# https://docs.docker.com/desktop/dev-environments/create-dev-env/
# docker API: https://docs.docker.com/compose/networking/
# docker compose file specification and elements: https://docs.docker.com/compose/compose-file/
# https://dev.to/danielkun/nginx-everything-about-proxypass-2ona
# https://medium.com/@muppedaanvesh/dynamic-docker-environments-angular-net-edition-54f330c581aa
# https://shadynagy.com/dynamically-injecting-environment-variables-in-dockerized-angular/

FROM node:alpine As build

#This WORKDIR command will create the working directory in our docker image. going forward any command will be run in the context of this directory.
WORKDIR /usr/src/app

#Copy package.json from current dir into workdir in the container
COPY package.json package-lock.json ./

RUN npm install

#Copy all files from current dir into workdir, forst dot: directory where this dockerfile is, second dot: workdir
COPY . .

#Build Angular application in PROD mode and it will create prod ready files in dist/frontend folder
RUN npm run build

#This line will create a second stage nginx container where we will copy the compiled output from our build stage.
FROM nginx:alpine

#COPY src/nginx/etc/default.conf /etc/nginx/conf.d/default.conf

#CThis will copy the compiled angular app from builder stage path /app/dist/frontend/ to nginx container.
# a frontend name a package.json "name" bol jön !
COPY --from=build /usr/src/app/dist/bende-angular-frontend/ /usr/share/nginx/html
# port on wich the application is running inide the container
EXPOSE 4200

# expose 4200: ez az alkalmazas/container portja, amin figyel, azaz ezen figyel a container. Ezen felül minden szerver default figyel a 80 on
# tehát a 80 porton mindig elérhető (belüröl) a container/appl meg pluszban azon amit az expose ban megadunk
# ha expose 4200, akkor lehet docker run -p 8000:4200 és 8008:80 (8008 barmi lehet) -> localhost:8008
# fontos, ha nginx et használok akkor már a szerver config fájlában kell beállitani a 80 tol eltérő portot !!!

# docker build -t webike . -> itt a . azt adja meg hogy a dockerfile abban a dirben van ahol éppen állok
