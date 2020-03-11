FROM node:13.10-alpine as node-dev
WORKDIR /src

COPY . .
RUN  yarn install && \
     yarn build

FROM nginx:1.17-alpine
WORKDIR /var/www/html
COPY --from=node-dev /src/build/* ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
RUN apk update && apk upgrade && apk add bash curl nano
