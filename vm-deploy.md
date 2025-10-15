# VM Deployment with PM2

This repository contains two apps in separate folders:

- `express-be` — backend (Express + Sequelize)
- `react-fe` — frontend (React + Vite)

The provided `ecosystem.config.cjs` at the repo root starts the backend under pm2. The backend, when the frontend has been built, will serve the frontend's static files from `react-fe/dist`. This simplifies deployment to a single process and port.

Quick steps on the VM (assumes Node.js, pm2, and MySQL are installed & configured):

1. Install dependencies for both projects (Start from repository root folder).

```bash
cd express-be
npm install

cd react-fe
npm install
```

2. Create a .env file inside the backend folder (express-be) so your VM's database can be accessed when the app runs. (Start from repository root folder).

```bash
cd express-be
nano .env
```

DB_HOST=*your DB IP Address*
DB_USER=*your DB username*
DB_PASSWORD=*your DB password*
DB_NAME=*your DB name*
DB_DIALECT=mysql
DB_PORT=*your DB port*
SESSION_SECRET=*your DB session secret*

Save this file as ".env", then continue with the next steps. Make sure it matches your VM's MySQL configuration.

3. Build the frontend so the backend can serve the static files (Start from repository root folder).

```bash
cd react-fe
npm run build
```

4. From the repository root folder, start the backend with pm2 (it will serve `react-fe/dist`)

```bash
pm2 start ecosystem.config.cjs --env production
```

5. Verify the single process and logs:

```bash
pm2 ls
pm2 logs dnd-backend
```
