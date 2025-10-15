#!/bin/bash

set -e

error_handler() {
   echo "ERROR on line $LINENO"
   echo "Command: '$BASH_COMMAND'"
   echo "Exit Code: $?"
}

trap 'error_handler' ERR

DEST_DIR="/var/www/dnd-app/DnD-Character-Sheet"

if [ "$(pwd)" != "$DEST_DIR" ]; then
   echo "Project is not in the correct directory. Moving it to ${DEST_DIR}"
   
   sudo mkdir -p /var/www/dnd-app

   sudo mv "$(pwd)" /var/www/dnd-app/

   cd "$DEST_DIR"
   echo "Project moved successfully."
else
   echo "Project is in the correct directory."
fi

echo "Starting D&D Character Sheet application setup"

sudo chown -R www-data:www-data .

cd bash-scripts

chmod +x prepare-vm.sh
chmod +x mysql-setup.sh
chmod +x config-back.sh
chmod +x config-front.sh

echo "--- Preparing Virtual Machine ---"
./prepare-vm.sh

echo "--- Setting up MySQL ---"
./mysql-setup.sh

echo "--- Configuring Back-End ---"
./config-back.sh

echo "--- Configuring Front-End ---"
./config-front.sh

ROOT_CRED_FILE="/tmp/mysql_root_credentials.txt"
APP_CRED_FILE="/tmp/db_credentials.txt"
PERMANENT_FILE="/root/database_credentials.txt"
IP_ADDRESS=$(curl -s ifconfig.me)

if [ -f "$ROOT_CRED_FILE" ] && [ -f "$APP_CRED_FILE" ]; then
   source "$ROOT_CRED_FILE"
   source "$APP_CRED_FILE"

   {
      echo "--- Credentials for Remote Access (MySQL Workbench) ---"
      echo "Hostname/IP: $IP_ADDRESS"
      echo "Username:    $DB_USER"
      echo "Password:    $DB_PASSWORD"
      echo ""
      echo "--- Credentials for Server Administration (Root User) ---"
      echo "Username:    root"
      echo "Password:    $MYSQL_ROOT_PASSWORD"
   } > "$PERMANENT_FILE"

   sudo chmod 600 "$PERMANENT_FILE"

   echo "================================================================"
   echo "SETUP COMPLETE"
   echo ""
   echo "All database credentials have been saved to:"
   echo "  $PERMANENT_FILE"
   echo ""
   echo "You can view them anytime on the VM by running:"
   echo "  sudo cat $PERMANENT_FILE"
   echo ""
   echo "------------------ FILE CONTENTS ------------------"
   sudo cat "$PERMANENT_FILE"
   echo "---------------------------------------------------"
   echo "================================================================"

   sudo rm "$ROOT_CRED_FILE" "$APP_CRED_FILE"
fi