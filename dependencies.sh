#!/bin/bash

#Installs dependencies for VM setup.
#Author: Raymond Marx

#Put in password here
sudo -v

# Autoinstall dependencies
yes | sudo apt install git
yes | sudo apt install mysql-server
yes | sudo apt install nodejs npm

# You'll need to put the github repo link between the single quotes and uncomment before running this script 
# git clone 'github repo link'

cd DnD-Character-Sheet
cd frontend/dnd-character-sheet

npm install

cd ../../server

npm install
npm i -g nodemon

cd ..

