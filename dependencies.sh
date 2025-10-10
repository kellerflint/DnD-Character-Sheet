#!/bin/bash

#Installs dependencies for VM setup. Run this as needed to start off or reinstall/update dependencies.
#Author: Raymond Marx

#Auto-upgrade
yes | sudo DEBIAN_FRONTEND=noninteractive apt-get -yqq upgrade

#Put in password here
sudo -v

# Autoinstall dependencies
yes | sudo apt install git
yes | sudo apt install mysql-server
yes | sudo apt install nodejs npm


# Install frontend node dependencies
cd frontend/dnd-character-sheet/
npm install react react-dom next

# Install backend node dependencies
cd ../..
cd server
npm install express dotenv #Important node stuff
npm install cors axios #Connectivity
npm install sequelize #DB
npm install morgan #Miscellaneous




