#!/bin/bash

set -e

error_handler() {
   echo "ERROR on line $LINENO"
   echo "Command: '$BASH_COMMAND'"
   echo "Exit Code: $?"
}

trap 'error_handler' ERR

DB_NAME="character_sheet_db"
DB_USER="appuser"
DB_PASSWORD=$(openssl rand -base64 16)
CREDENTIALS_FILE="/tmp/db_credentials.txt"

echo "Configuring MySQL database and user..."

sudo mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
sudo mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASSWORD';"
sudo mysql -e "GRANT SELECT, INSERT, UPDATE, DELETE ON $DB_NAME.* TO '$DB_USER'@'%';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "Database '$DB_NAME' and user '$DB_USER' configured for remote access."