FROM node:10.13-alpine as node

WORKDIR /app

COPY package.json /app
RUN npm install --silent

COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node app/dist/netflix-angular /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
