FROM node:10-alpine as build

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /usr/src/app/dist/skeleton /usr/share/nginx/html