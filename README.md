# D&D Character Sheet

> Get rid of the paper and embrace the digital.

## The Problem

Managing physical Dungeons & Dragons character sheets can be cumbersome. They are susceptible to being damaged, lost, or containing outdated or incorrect data due to miscalculations. This project aims to create a persistent, digital solution.

## Target Audience

This application is designed for players of **Dungeons & Dragons 5th Edition (5E)**.

---

## Technical Requirements

* **Stack:** Node.js backend, MySQL database
* **Architecture:** API + SPA (Node + React)

---

## Feature Breakdown

### Core (MVP) Features

* **Character Creation:** Users can create a new character.
* **Data Persistence:** All character sheets and information are savable.
* **View Information:** Users can easily read all inputted character information as well as details pertaining to various character aspects.
* **Update Stats:** Users can update character stats, inventory, and other details as their character progresses.
* **Delete:** Users can delete characters or items from a character sheet.

### Future Enhancements

* **Dice Rolling:** An integrated digital dice roller.
* **Status Effects:** A system for applying and tracking temporary buffs and debuffs.
* **Random Generators:**
    * Random Name Generator
    * Random Character Creator
* **Printability:** The ability to export and print a character sheet.
* **VTT Integration:** Integration with popular virtual tabletop simulators.
* **Sharing:** Options to share character sheets with others or make them public.
* **User Accounts:** Full login/authentication capability.
* **Beginner's Guide:** A step-by-step guide for users who are new to D&D character sheets, triggered by an initial prompt.
* **Past Changes:** A modal can be opened that will show past changes.

---

## Data Model Planning

### Core Entities

* **Users:** Manages login, sessions, and owns character sheets.
* **Character Sheets:** The central object where all character data is stored and manipulated.
* **API Data:** Fetches information about weapons, items, classes, and spells from an external D&D API.
* **Media Query (for Printing):** Converts the character sheet's web view into a print-friendly PDF format.

### Core Functionality (CRUD)

* **Create:** Users can create new character sheets.
* **Read:** Users can view all saved information on their character sheet as well as short excerpts for spells, items, etc.
* **Update:** Users can modify any information on the sheet, and the changes will be saved to the backend.
* **Delete:** Users have the ability to delete specific items or the entire character sheet.

---

## User Flow

### How do they accomplish key tasks?

1.  Interactive fields and boxes will be visually distinct (e.g., highlighted with color) to indicate they can be modified.
2.  When a user selects an interactive element, relevant information and options will be presented in a pop-up or modal.
3.  The options presented to the user will be intelligently filtered based on previous decisions. For example, a level 1 wizard will only be shown level 1 spells to choose from.
4.  For new users, an optional guided experience will walk them through the character creation process step-by-step.

---

## Deployment Guide

This guide provides all the necessary steps to deploy the application on a fresh Ubuntu VM.

### Step 1: Initial Server Setup

These commands will update your server and install all the required software: Node.js, PM2 (a process manager for Node), Nginx, and the MySQL database server.

```bash
# Update and upgrade all system packages
sudo apt update && sudo apt -y upgrade

# Add the Node.js v20 repository
curl -fsSL [https://deb.nodesource.com/setup_20.x](https://deb.nodesource.com/setup_20.x) | sudo -E bash -

# Install Node.js, Nginx, and MySQL
sudo apt -y install nodejs nginx mysql-server

# Install PM2 globally using npm
sudo npm install pm2 -g
```

### Step 2: Configure the Firewall (UFW)

This will secure your server by only allowing traffic on necessary ports.

```bash
# Allow SSH connections so you don't get locked out
sudo ufw allow OpenSSH

# Allow web traffic on ports 80 (HTTP) and 443 (HTTPS)
sudo ufw allow 'Nginx Full'

# Allow remote access to the database (optional, for development)
sudo ufw allow 3306/tcp

# Enable the firewall
sudo ufw enable
```

### Step 3: Clone and Prepare the Project

We will clone the project into /var/www, the standard directory for web content, and set the correct permissions for the Nginx user.

```bash
# Create a new directory for the project
sudo mkdir -p /var/www/dnd-app

# Clone the repository into the new directory
sudo git clone https://github.com/TiaMarieG/DnD-Character-Sheet.git /var/www/dnd-app/DnD-Character-Sheet

# Give the Nginx web server user ownership of the files
sudo chown -R www-data:www-data /var/www/dnd-app/
```

### Step 4: Configure the Back-End

We will install the back-end dependencies so it's ready to be run by PM2.

```bash
# Navigate to the back-end directory
cd /var/www/dnd-app/DnD-Character-Sheet/character-sheet-back-end

# Install npm packages
sudo npm install

# Start the application with PM2
pm2 start server.js --name "dnd-backend"

(Note: --name "dnd-backend" is only for the initial setup of PM2. For future starts, you can simply run pm2 start dnd-backend. 

The reason for the name is to differentiate the server from the other projects running on your VM.)

# IMPORTANT: These next two commands ensure the app restarts on server reboot
pm2 startup
pm2 save
```

### Step 5: Configure the Front-End

We will step up the front-end to work with Nginx

```bash
# Navigate to the front-end directory, install dependencies, and create the static production build.
cd /var/www/dnd-app/DnD-Character-Sheet/character-sheet-front-end
sudo npm install
sudo npm run build
```

### Step 6: Configure Nginx

We will set up Nginx so that the front-end can continuously run without the terminal needing to be open

```bash
# Copy the provided Nginx configuration
sudo cp /var/www/dnd-app/DnD-Character-Sheet/nginx/nginx.conf /etc/nginx/sites-available/dnd-app

# IMPORTANT: You must edit the file to use your server's IP address.
sudo nano /etc/nginx/sites-available/dnd-app

# IMPORTANT: Verify the root directive is correct: 
root /var/www/dnd-app/DnD-Character-Sheet/character-sheet-front-end/dist;

# Disable the default Nginx page
sudo rm /etc/nginx/sites-enabled/default

# Enable your site
sudo ln -s /etc/nginx/sites-available/dnd-app /etc/nginx/sites-enabled/

#Test and Restart Nginx:
sudo nginx -t
sudo systemctl restart nginx
```

## You're Live!

Your application should now be accessible by navigating to http://<your_server_ip> in a web browser.

### Deploying Updates

To deploy new code from the Git repository, follow these steps:

```bash
# Pull Changes
cd /var/www/dnd-app/DnD-Character-Sheet
sudo git pull

# Update Back-End: If you changed back-end files, restart the PM2 process.
cd character-sheet-back-end
sudo npm install
pm2 restart dnd-backend

#Update Front-End: If you changed front-end files, you must rebuild the dist folder
cd ../character-sheet-front-end
sudo npm install
sudo npm run build
```