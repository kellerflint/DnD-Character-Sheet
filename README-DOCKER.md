# Deployment Guide for DnD Character Sheet via Docker

This guide explains how to deploy the DnD Character Sheet application using Docker and Docker Compose. It also provides an overview of the Docker-related files and their purpose.

---

## Prerequisites

1. **Install Docker**: Ensure Docker is installed on your system. You can download it from [Docker's official website](https://www.docker.com/).
2. **Install Docker Compose**: Docker Compose is included with Docker Desktop. Verify installation by running:
   ```bash
   docker-compose --version
   ```
3. **Environment Variables**: Ensure you have the required environment variables set up. For example, `JWT_SECRET` for the backend.

---

## File Overview

### 1. **`docker-compose.yml`**
This file orchestrates the deployment of the database, backend, and frontend services.

#### Key Sections:
- **`db` Service**:
  - Uses the `mysql:8` image to create a MySQL database.
  - Initializes the database using `./sql/db.sql`.
  - Persists data using the `db_data` volume.
  - Exposes port `3306` for database access.

- **`backend` Service**:
  - Builds the backend from the `character-sheet-back-end` directory.
  - Connects to the `db` service using environment variables.
  - Exposes port `5000` for API access.
  - Mounts the backend code for live updates during development.

- **`frontend` Service**:
  - Builds the frontend from the `character-sheet-front-end` directory.
  - Serves the frontend using Nginx.
  - Exposes port `8080` for the web application.
  - Communicates with the backend using the `VITE_API_BASE_URL` environment variable.

#### Example:
```yaml
frontend:
  build: ./character-sheet-front-end
  ports:
    - "8080:80"
  depends_on:
    - backend
  environment:
    VITE_API_BASE_URL: http://backend:5000
```

### 2. **Backend Dockerfile** (`character-sheet-back-end/Dockerfile`)
This file defines how to build the backend service.

#### Key Steps:
1. **Set the working directory**:
   ```dockerfile
   WORKDIR /app
   ```
2. **Install dependencies**:
   ```dockerfile
   COPY package*.json ./
   RUN npm install
   ```
3. **Copy the code and expose the port**:
   ```dockerfile
   COPY . .
   EXPOSE 5000
   CMD ["node", "server.js"]
   ```

### 3. **Frontend Dockerfile** (`character-sheet-front-end/Dockerfile`)
This file defines how to build the frontend service.

#### Key Steps:
1. **Build the frontend**:
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   ```
2. **Serve the frontend using Nginx**:
   ```dockerfile
   FROM nginx:alpine AS runner
   COPY --from=builder /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

---

## One-Command VM Deployment

Use `bash-scripts/deploy-docker.sh` to provision a fresh Ubuntu VM and bring the full stack online.

### Prerequisites

- Run the script as root (or with `sudo`).
- Provide a Git repository URL; the script defaults to `/opt/dnd-character-sheet` and the `main` branch.

### Usage

```bash
sudo ./bash-scripts/deploy-docker.sh <repo-url> [target-directory] [branch]
```

Example:

```bash
sudo ./bash-scripts/deploy-docker.sh https://github.com/your-org/DnD-Character-Sheet.git /opt/dnd-character-sheet main
```

The script will:

1. Update and upgrade system packages in non-interactive mode.
2. Install Docker Engine, Docker Compose, and prerequisites.
3. Enable and start the Docker service.
4. Clone (or update) the repository into the target directory.
5. Generate a `.env` file with `JWT_SECRET` if one is missing.
6. Run `docker compose up --build -d` to launch the database, backend, and frontend containers.

After completion, the script prints URLs for the frontend (`:8080`) and backend (`:5000`). Use `docker compose ps` inside the deployment directory to confirm service status.

To stop the stack later, run:

```bash
cd /opt/dnd-character-sheet
docker compose down
```

### Notes

- Set `JWT_SECRET` in the environment before running the script if you need a specific value.
- Previous VM provisioning scripts are preserved under `bash-scripts/archive/` for reference.

---

## Explanation of Key Concepts

### Volumes
- **Purpose**: Persist data and enable live updates during development.
- **Example**:
  ```yaml
  volumes:
    - ./character-sheet-back-end:/app
    - /app/node_modules
  ```
  - `./character-sheet-back-end:/app`: Links the backend code on your computer to the container.
  - `/app/node_modules`: Ensures dependencies are managed inside the container.

### Multi-Stage Builds (Frontend Dockerfile)
- **Purpose**: Optimize the image size by separating the build and runtime stages.
- **Example**:
  ```dockerfile
  FROM node:20-alpine AS builder
  FROM nginx:alpine AS runner
  ```

### Environment Variables
- **Purpose**: Configure services dynamically.
- **Example**:
  ```yaml
  environment:
    VITE_API_BASE_URL: http://backend:5000
  ```

---

## Troubleshooting


2. **Database Connection Issues**:
   - Ensure the `db` service is running.
   - Verify the environment variables in `docker-compose.yml`.

3. **Frontend Not Loading**:
   - Ensure the `VITE_API_BASE_URL` is correctly set to the backend URL.

---

