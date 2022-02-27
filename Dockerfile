FROM node:17.5-alpine as build-stage

ENV VITE_API_URL=https://api.rhododevdron.swuwu.dk

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./.infrastructure/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]