module.exports = {
  apps: [
    {
      name: 'dnd-backend',
      script: 'server.js',
      cwd: './express-be',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '../logs/backend-err.log',
      out_file: '../logs/backend-out.log',
      log_file: '../logs/backend-combined.log',
      time: true
    },
    // Frontend is served as static files from the backend when built. No separate PM2 process needed.
  ]
};
