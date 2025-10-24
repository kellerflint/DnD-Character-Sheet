# Use Node as base
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build React app
RUN npm run build

# Install a simple HTTP server to serve the build
RUN npm install -g serve

# Expose the default React port
EXPOSE 3000

# Start the server to serve static files from /app/build
CMD ["serve", "-s", "build", "-l", "3000"]
