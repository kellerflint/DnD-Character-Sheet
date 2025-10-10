#!/bin/bash

#Installs dependencies for VM setup. Run this as needed to start off or reinstall/update dependencies.
#Author: Raymond Marx

#Auto-upgrade
echo "Auto Upgrade"

yes | sudo DEBIAN_FRONTEND=noninteractive apt-get -yqq upgrade

#Put in password here
echo "Input SUDOER Password"

sudo -v

# Autoinstall dependencies
echo "Install apt packages"

yes | sudo apt install git
yes | sudo apt install mysql-server
yes | sudo apt install nodejs npm


# Install frontend node dependencies
echo "Install front-end dependencies"

cd frontend/dnd-character-sheet
npm install react react-dom next

# Install backend node dependencies
echo "Install backend depdendencies"

cd ../..
cd server
npm install express dotenv #Important node stuff
npm install cors axios #Connectivity
npm install sequelize #DB
npm install morgan #Miscellaneous




