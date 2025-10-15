module.exports = {
  apps: [{
    name: 'dnd-character-sheet',
    script: './express-be/server.js',
    cwd: './',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DB_HOST: '127.0.0.1',
      DB_USER: 'dnd_user',
      DB_PASS: 'REPLACE_ME_STRONG_PASSWORD',
      DB_NAME: 'dnd_db',
      SESSION_SECRET: 'replace_me_session_secret'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      DB_HOST: '127.0.0.1',
      DB_USER: 'dnd_user',
      DB_PASS: 'REPLACE_ME_STRONG_PASSWORD',
      DB_NAME: 'dnd_db',
      SESSION_SECRET: 'replace_me_session_secret'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
