# VM Deployment with PM2

This repository contains two apps in separate folders:

- `express-be` — backend (Express + Sequelize)
- `react-fe` — frontend (React + Vite)

The provided `ecosystem.config.cjs` at the repo root starts both apps under pm2:

- `dnd-backend` — runs `express-be/server.js` on PORT 3001 by default
- `dnd-frontend` — runs `npm run start:prod` in `react-fe`, which builds and runs `vite preview` on PORT 3000

Quick steps on the VM (assumes Node.js and pm2 are installed):

1. Install dependencies for both projects

```bash
cd /path/to/repo/express-be
npm install

cd /path/to/repo/react-fe
npm install
```

2. From the repo root, start both apps with pm2:

```bash
cd /path/to/repo
pm2 start ecosystem.config.cjs --env production
```

3. Verify processes:

```bash
pm2 ls
pm2 logs dnd-backend
pm2 logs dnd-frontend
```
