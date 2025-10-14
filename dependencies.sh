#!/bin/bash

#Installs dependencies for VM setup. Run this as needed to start off or reinstall/update dependencies.
#Author: Raymond Marx

#Put in password here
echo "Input SUDOER Password"

sudo -v

#Auto-upgrade
echo "Auto Upgrade"

yes | sudo DEBIAN_FRONTEND=noninteractive apt-get -yqq upgrade

# Autoinstall dependencies
echo "Install apt packages"

yes | sudo apt install git
yes | sudo apt install mysql-server
yes | sudo apt install nodejs npm

# Auto-update node to v22.0.0
echo "Upgrading to Node v22.0.0"

sudo npm install -g n
sudo n 22.0.0

hash -r #resets location hash of node (/usr/bin/node -> /usr/local/bin/node)
node -v #Show updated version

# Install frontend node dependencies
echo "Install front-end dependencies"

cd frontend/dnd-character-sheet
sudo npm install -g next
sudo npm install react react-dom

# Install backend node dependencies
echo "Install backend depdendencies"

cd ../..
cd server
sudo npm install express dotenv #Important node stuff
sudo npm install cors axios #Connectivity
sudo npm install sequelize #DB

sudo npm install -g pm2 # Server

sudo npm install morgan #Miscellaneous

cd ..


