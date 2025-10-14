#!/bin/bash

set -e

error_handler() {
   echo "ERROR on line $LINENO"
   echo "Command: '$BASH_COMMAND'"
   echo "Exit Code: $?"
}

trap 'error_handler' ERR

cd /var/www/dnd-app/DnD-Character-Sheet
sudo git pull

cd character-sheet-back-end
sudo npm install
pm2 restart dnd-backend

cd ../character-sheet-front-end
sudo npm install
sudo npm run build