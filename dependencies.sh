#!/bin/bash

#Installs dependencies for VM setup.
#Author: Raymond Marx

#Put in password here
sudo -v

# Autoinstall dependencies
yes | sudo apt install git
yes | sudo apt install mysql-server
yes | sudo apt install nodejs npm

