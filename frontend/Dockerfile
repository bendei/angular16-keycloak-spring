#Download Node Alpine image
# https://dev.to/usmslm102/containerizing-angular-application-for-production-using-docker-3mhi
# https://www.youtube.com/watch?v=-o5l6zFJ9_o
# https://docs.docker.com/desktop/dev-environments/create-dev-env/
FROM node:alpine As build

#This WORKDIR command will create the working directory in our docker image. going forward any command will be run in the context of this directory.
WORKDIR /app

#Copy package.json from current dir into workdir in the container
COPY package.json package-lock.json ./

#Install dependencies, wich will not be copied from node_modules
RUN npm install

#Copy all files from current dir into workdir
COPY . .

#Build Angular application in PROD mode and it will create prod ready files in dist/frontend folder
RUN npm run build

#This line will create a second stage nginx container where we will copy the compiled output from our build stage.
FROM nginx:alpine

#CThis will copy the compiled angular app from builder stage path /app/dist/frontend/ to nginx container.
# a frontend name a package.json "name" bol jön !
COPY --from=build /app/dist/frontend/ /usr/share/nginx/html
