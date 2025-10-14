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
   echo "Project is already in the correct directory."
fi

echo "Starting D&D Character Sheet application setup"

sudo chown -R www-data:www-data .

chmod +x prepare-vm.sh
chmod +x config-back.sh
chmod +x config-front.sh

echo "--- Preparing Virtual Machine ---"
./prepare-vm.sh

echo "--- Configuring Back-End ---"
./config-back.sh

echo "--- Configuring Front-End ---"
./config-front.sh

echo "Preparation complete!"