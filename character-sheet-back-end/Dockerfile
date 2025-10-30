FROM node:lts-alpine

RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT ["pm2-runtime"]
CMD ["server.js"]
