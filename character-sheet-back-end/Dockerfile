FROM node:20-alpine

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 5000

# Start the server
CMD ["node", "server.js"]