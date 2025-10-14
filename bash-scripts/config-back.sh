#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

cd /var/www/dnd-app/DnD-Character-Sheet/character-sheet-back-end

sudo npm install

pm2 start server.js --name "dnd-backend"

pm2 startup
pm2 save