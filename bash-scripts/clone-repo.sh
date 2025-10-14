#!/bin/bash

set -e

error_handler() {
  echo "ERROR on line $LINENO"
  echo "Command: '$BASH_COMMAND'"
  echo "Exit Code: $?"
}

trap 'error_handler' ERR

sudo mkdir -p /var/www/dnd-app

sudo git clone https://github.com/TiaMarieG/DnD-Character-Sheet.git /var/www/dnd-app/DnD-Character-Sheet

sudo chown -R www-data:www-data /var/www/dnd-app/