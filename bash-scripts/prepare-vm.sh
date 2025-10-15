#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

sudo apt update && sudo apt -y upgrade

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt -y install nodejs nginx mysql-server git

MYSQL_ROOT_PASSWORD=$(openssl rand -base64 16)

sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD" > /tmp/mysql_root_credentials.txt

sudo sed -i "s/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql

sudo npm install pm2 -g

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306/tcp
echo "y" | sudo ufw enable