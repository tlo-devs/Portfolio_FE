FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:1.17.1-alpine
COPY custom.conf /etc/nginx/custom.conf
COPY --from=build /usr/src/app/dist/portfolio /usr/share/nginx/html
