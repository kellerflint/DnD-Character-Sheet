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

echo "--- Securing MySQL root user ---"
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 16)

sudo systemctl stop mysql
sudo pkill -9 mysqld || true
sudo rm -f /var/lib/mysql/*.pid
sleep 2

sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld

sudo mysqld_safe --skip-grant-tables --skip-networking &
sleep 5

sudo mysql -e "UPDATE mysql.user SET authentication_string=PASSWORD('$MYSQL_ROOT_PASSWORD'), plugin='mysql_native_password' WHERE User='root' AND Host='localhost'; FLUSH PRIVILEGES;"

sudo mysqladmin shutdown

sudo systemctl start mysql

echo "--- Configuring MySQL for remote access ---"
sudo sed -i "s/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql

sudo npm install pm2 -g

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306/tcp
echo "y" | sudo ufw enable