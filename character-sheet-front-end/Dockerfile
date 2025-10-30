# Use Node to build the React app
FROM node:18 AS build

WORKDIR /frontend

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all React source code
COPY . .

# Build React app
RUN npm run build

FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
