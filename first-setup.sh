#!/bin/bash

set -e

echo "Starting D&D Character Sheet application setup..."

chmod +x prepare-vm.sh
chmod +x clone-repo.sh
chmod +x config-back.sh
chmod +x config-front.sh

echo "--- Preparing Virtual Machine ---"
./prepare-vm.sh

echo "--- Cloning Project Repository ---"
./clone-repo.sh

echo "--- Configuring Back-End ---"
./config-back.sh

echo "--- Configuring Front-End ---"
./config-front.sh

echo "Preparation complete!"