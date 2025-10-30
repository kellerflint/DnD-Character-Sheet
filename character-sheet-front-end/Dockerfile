FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies based on lockfile for reproducible builds
COPY package*.json ./
RUN npm install

# Build the production bundle
COPY . .
RUN npm run build

FROM nginx:alpine AS runner

# Copy the compiled static assets to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
