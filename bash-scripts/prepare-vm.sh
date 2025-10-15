#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

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
INIT_FILE=$(mktemp)

echo "export MYSQL_ROOT_PASSWORD='$MYSQL_ROOT_PASSWORD'" > /tmp/mysql_root_credentials.txt

cat << EOF > "$INIT_FILE"
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD';
FLUSH PRIVILEGES;
EOF

sudo chown mysql:mysql "$INIT_FILE"

sudo systemctl stop mysql
sudo pkill -f mysqld || true
sleep 2

sudo mysqld --init-file="$INIT_FILE" &
sleep 10

sudo mysqladmin shutdown || true
sleep 2

sudo rm "$INIT_FILE"

sudo systemctl start mysql

echo "--- Configuring MySQL for remote access ---"
sudo sed -i "s/bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql

sudo npm install pm2 -g

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306/tcp
echo "y" | sudo ufw enable