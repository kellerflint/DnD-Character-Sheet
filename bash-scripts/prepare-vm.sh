#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

echo "Waiting for apt lock to be released..."
while sudo fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1 || sudo fuser /var/lib/apt/lists/lock >/dev/null 2>&1; do
  sleep 5
done

export DEBIAN_FRONTEND=noninteractive

sudo apt update
sudo apt -y upgrade

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt -y install nodejs nginx mysql-server git

echo "--- Securing MySQL root user ---"
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 16)

echo "export MYSQL_ROOT_PASSWORD='$MYSQL_ROOT_PASSWORD'" > /tmp/mysql_root_credentials.txt

sudo systemctl stop mysql
sudo mysqld_safe --skip-grant-tables --skip-networking &
sleep 5

sudo mysql -e "FLUSH PRIVILEGES;"
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD';"

sudo mysqladmin shutdown
sleep 2

sudo systemctl start mysql

echo "--- Configuring MySQL for remote access ---"
sudo sed -i "s/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql

sudo npm install pm2 -g

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306/tcp
echo "y" | sudo ufw enable