# VM Deployment with PM2

This repository contains two apps in separate folders:

- `express-be` — backend (Express + Sequelize)
- `react-fe` — frontend (React + Vite)

The provided `ecosystem.config.cjs` at the repo root starts the backend under pm2. The backend, when the frontend has been built, will serve the frontend's static files from `react-fe/dist`. This simplifies deployment to a single process and port.

Quick steps on the VM (assumes Node.js and pm2 are installed):

1. Install dependencies for both projects

```bash
cd /path/to/repo/express-be
npm install

cd /path/to/repo/react-fe
npm install
```

2. Build the frontend so the backend can serve the static files

```bash
cd /path/to/repo/react-fe
npm run build
```

3. From the repo root, start the backend with pm2 (it will serve `react-fe/dist`)

```bash
cd /path/to/repo
pm2 start ecosystem.config.cjs --env production
```

4. Verify the single process and logs:

```bash
pm2 ls
pm2 logs dnd-backend
```
