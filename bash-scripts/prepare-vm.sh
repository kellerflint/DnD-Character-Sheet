#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

sudo apt update && sudo apt -y upgrade

curl -fsSL [https://deb.nodesource.com/setup_20.x](https://deb.nodesource.com/setup_20.x) | sudo -E bash -

sudo apt -y install nodejs nginx mysql-server git

sudo npm install pm2 -g

sudo ufw allow OpenSSH

sudo ufw allow 'Nginx Full'

sudo ufw allow 3306/tcp

echo "y" | sudo ufw enable