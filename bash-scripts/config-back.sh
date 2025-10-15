#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

cd /var/www/dnd-app/DnD-Character-Sheet/character-sheet-back-end

CREDENTIALS_FILE="/tmp/db_credentials.txt"
ENV_EXAMPLE_FILE=".env.example"
ENV_FILE=".env"

if [ -f "$CREDENTIALS_FILE" ]; then
    echo "Found database credentials. Configuring .env file..."
    
    source "$CREDENTIALS_FILE"
    
    JWT_SECRET=$(openssl rand -hex 32)

    cp "$ENV_EXAMPLE_FILE" "$ENV_FILE"
    
    sed -i "s/DB_USER=root/DB_USER=$DB_USER/" "$ENV_FILE"
    sed -i "s/DB_PASSWORD=password/DB_PASSWORD=$DB_PASSWORD/" "$ENV_FILE"
    sed -i "s/DB_NAME=character_sheet_db/DB_NAME=$DB_NAME/" "$ENV_FILE"
    sed -i "s/JWT_SECRET=your_key_here/JWT_SECRET=$JWT_SECRET/" "$ENV_FILE"
    
    sudo rm "$CREDENTIALS_FILE"
else
    echo "WARNING: Credentials file not found. App might not connect to the database."
fi

sudo npm install

pm2 stop "dnd-backend" || true
pm2 delete "dnd-backend" || true

pm2 start server.js --name "dnd-backend"

pm2 startup
pm2 save