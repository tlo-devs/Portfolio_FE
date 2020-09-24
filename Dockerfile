FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:stable
ENV CONTAINER_HOST="localhost"
COPY docker/docker-entrypoint.sh /
COPY docker/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /usr/src/app/dist/portfolio /usr/share/nginx/html
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080
