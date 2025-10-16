#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

PROJECT_DIR="/var/www/dnd-app/DnD-Character-Sheet"
NGINX_CONFIG_FILE="/etc/nginx/sites-available/dnd-app"

cd ${PROJECT_DIR}/character-sheet-front-end
sudo npm install
sudo npm run build

sudo cp ${PROJECT_DIR}/nginx/nginx.conf ${NGINX_CONFIG_FILE}

IP_ADDRESS=$(curl -s ifconfig.me)

sudo sed -i "s/YOUR_SERVER_IP/${IP_ADDRESS}/g" ${NGINX_CONFIG_FILE}

if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

if [ ! -L /etc/nginx/sites-enabled/dnd-app ]; then
    sudo ln -s ${NGINX_CONFIG_FILE} /etc/nginx/sites-enabled/
fi

echo "Testing and restarting Nginx..."

sudo nginx -t
sudo systemctl restart nginx