#!/bin/bash

set -e

error_handler() {
   echo "ERROR on line $LINENO"
   echo "Command: '$BASH_COMMAND'"
   echo "Exit Code: $?"
}

trap 'error_handler' ERR

if [ -f "/tmp/mysql_root_credentials.txt" ]; then
   source "/tmp/mysql_root_credentials.txt"
else
   echo "ERROR: MySQL root credentials not found."
   exit 1
fi

DB_NAME="character_sheet_db"
APP_USER="appuser"
APP_PASSWORD=$(openssl rand -base64 16)
DEV_USER="devuser"
DEV_PASSWORD=$(openssl rand -base64 16)
SQL_FILE="/var/www/dnd-app/DnD-Character-Sheet/sql/db.sql"

{
   echo "export DB_NAME='$DB_NAME'"
   echo "export DB_USER='$APP_USER'"
   echo "export DB_PASSWORD='$APP_PASSWORD'"
   echo "export DEV_USER='$DEV_USER'"
   echo "export DEV_PASSWORD='$DEV_PASSWORD'"
} > /tmp/db_credentials.txt

echo "Configuring MySQL database and users..."

sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER IF NOT EXISTS '$APP_USER'@'%' IDENTIFIED BY '$APP_PASSWORD';"
sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "GRANT SELECT, INSERT, UPDATE, DELETE ON $DB_NAME.* TO '$APP_USER'@'%';"
sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER IF NOT EXISTS '$DEV_USER'@'%' IDENTIFIED BY '$DEV_PASSWORD';"
sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DEV_USER'@'%';"

echo "Importing database schema from $SQL_FILE..."
sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$DB_NAME" < "$SQL_FILE"

sudo mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "FLUSH PRIVILEGES;"