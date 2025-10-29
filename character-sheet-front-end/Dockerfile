FROM node:18 AS build

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/defauly.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
