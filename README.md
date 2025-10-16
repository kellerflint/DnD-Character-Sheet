# D&D Character Sheet

> Get rid of the paper and embrace the digital.

## The Problem

Managing physical Dungeons & Dragons character sheets can be cumbersome. They are susceptible to being damaged, lost, or containing outdated or incorrect data due to miscalculations. This project aims to create a persistent, digital solution.

## Target Audience

This application is designed for players of **Dungeons & Dragons 5th Edition (5E)**.

---

## Technical Requirements

-  **Stack:** Node.js backend, MySQL database
-  **Architecture:** API + SPA (Node + React)

---

## Feature Breakdown

### Core (MVP) Features

-  **Character Creation:** Users can create a new character.
-  **Data Persistence:** All character sheets and information are savable.
-  **View Information:** Users can easily read all inputted character information as well as details pertaining to various character aspects.
-  **Update Stats:** Users can update character stats, inventory, and other details as their character progresses.
-  **Delete:** Users can delete characters or items from a character sheet.

### Future Enhancements

-  **Dice Rolling:** An integrated digital dice roller.
-  **Status Effects:** A system for applying and tracking temporary buffs and debuffs.
-  **Random Generators:**
   -  Random Name Generator
   -  Random Character Creator
-  **Printability:** The ability to export and print a character sheet.
-  **VTT Integration:** Integration with popular virtual tabletop simulators.
-  **Sharing:** Options to share character sheets with others or make them public.
-  **User Accounts:** Full login/authentication capability.
-  **Beginner's Guide:** A step-by-step guide for users who are new to D&D character sheets, triggered by an initial prompt.
-  **Past Changes:** A modal can be opened that will show past changes.

---

## Data Model Planning

### Core Entities

-  **Users:** Manages login, sessions, and owns character sheets.
-  **Character Sheets:** The central object where all character data is stored and manipulated.
-  **API Data:** Fetches information about weapons, items, classes, and spells from an external D&D API.
-  **Media Query (for Printing):** Converts the character sheet's web view into a print-friendly PDF format.

### Core Functionality (CRUD)

-  **Create:** Users can create new character sheets.
-  **Read:** Users can view all saved information on their character sheet as well as short excerpts for spells, items, etc.
-  **Update:** Users can modify any information on the sheet, and the changes will be saved to the backend.
-  **Delete:** Users have the ability to delete specific items or the entire character sheet.

---

## User Flow

### How do they accomplish key tasks?

1. Interactive fields and boxes will be visually distinct (e.g., highlighted with color) to indicate they can be modified.
2. When a user selects an interactive element, relevant information and options will be presented in a pop-up or modal.
3. The options presented to the user will be intelligently filtered based on previous decisions. For example, a level 1 wizard will only be shown level 1 spells to choose from.
4. For new users, an optional guided experience will walk them through the character creation process step-by-step.

---

## Features Completed in First Sprint

- User is able to create an account and data is stored in MySQL
- User is able to log in and homepage displays their username
- User is able to update their password from the login page
- User is able to delete their account from MySQL
- Developers are able to remotely connect to the database stored on the VM through workbench
- Created bash scripts to automate the setup process - Note: The portion for MySQL is not working and is commented out - Keller is aware of this - MySQL will require manual setup. Please follow the manual steps for this part

### Additional Features
- Backend has API connections to third-party API's that allow access to DnD 5E character creation features - There is a limited set of features since more will be added in future sprints
- There is a rough draft of a DnD character sheet that can be integrated with the API's mentioned before - This feature is currently hard coded and will need updates

## Deployment Guide

This guide provides all the necessary steps to deploy the application on a fresh Ubuntu VM.

## Automated Setup (Recommended)

This is the fastest and most reliable way to deploy the project. The included first-setup.sh script automates every step, including a secure database configuration, Nginx setup, and application startup

1. Clone the Project & Navigate to the Scripts Directory:

```bash
git clone https://github.com/kellerflint/DnD-Character-Sheet.git

cd DnD-Character-Sheet/bash-scripts
```

2. Activate and Run the Setup Script:

```bash
chmod +x first-setup.sh

./first-setup.sh
```

The script will handle everything. At the end, it will display your server's IP address and the generated database credentials for the development team and root administrator. These credentials will also be saved to /root/database_credentials.txt on the server for future reference.

### Deploying Updates

When you push new code to the repository, you can use a script to deploy the updates for you

1. Navigate to project directory on your server:

```Bash
cd /var/www/dnd-app/DnD-Character-Sheet
```

2. Activate and Run the Update Script:

```Bash
chmod +x deploy-updates.sh

./deploy-updates.sh
```

## Manual Setup (For Reference)

### Step 1: Initial Server Setup

These commands will update your server and install all the required software: Node.js, PM2 (a process manager for Node), Nginx, and the MySQL database server.

```bash
# Update and upgrade all system packages
apt update && sudo apt -y upgrade

# Add the Node.js v20 repository
curl -fsSL [https://deb.nodesource.com/setup_20.x](https://deb.nodesource.com/setup_20.x) | sudo -E bash -

# Install Node.js, Nginx, and MySQL
apt -y install nodejs nginx mysql-server git

# Install PM2 globally using npm
npm install pm2 -g
```

### Step 2: Configure the Firewall (UFW)

This will secure your server by only allowing traffic on necessary ports.

```bash
# Allow SSH connections so you don't get locked out
ufw allow OpenSSH

# Allow web traffic on ports 80 (HTTP) and 443 (HTTPS)
ufw allow 'Nginx Full'

# Allow remote access to the database (optional, for development)
ufw allow 3306/tcp

# Enable the firewall
ufw enable
```

### Step 3: Configure the MySQL Database

After installing MySQL, you must log in to create the database and dedicated users for the application and for the development team to have remote access.

```Bash
# Log into MySQL as the root user
mysql -u root -p

# Inside the MySQL prompt, run the following commands:
CREATE DATABASE character_sheet_db;

# Create the limited user for the application itself
CREATE USER 'appuser'@'%' IDENTIFIED BY 'Your-App-Password';
GRANT SELECT, INSERT, UPDATE, DELETE ON character_sheet_db.* TO 'appuser'@'%';

# Create the privileged user for the development team's remote access
CREATE USER 'devuser'@'%' IDENTIFIED BY 'Your-Dev-Password';
GRANT ALL PRIVILEGES ON character_sheet_db.* TO 'devuser'@'%';

FLUSH PRIVILEGES;
exit;
```

### Step 4: Clone and Prepare the Project

We will clone the project into /var/www, the standard directory for web content, and set the correct permissions for the Nginx user.

```bash
# Create a new directory for the project
mkdir -p /var/www/dnd-app

# Clone the repository into the new directory
git clone https://github.com/kellerflint/DnD-Character-Sheet.git /var/www/dnd-app/DnD-Character-Sheet

# Give the Nginx web server user ownership of the files
chown -R www-data:www-data /var/www/dnd-app/
```

### Step 5: Configure the Back-End

We will install the back-end dependencies and run PM2.

```bash
# Navigate to the back-end directory
cd /var/www/dnd-app/DnD-Character-Sheet/character-sheet-back-end

# IMPORTANT: Create the .env file from the example
cp .env.example .env

# IMPORTANT: Edit the .env file with your database credentials
# Change DB_USER to 'appuser' and DB_PASSWORD to the password you created in Step 3.
# You also need to generate and add a secure JWT_SECRET.
nano .env

# Install npm packages
npm install

# IMPORTANT: Import the database table structure
# This command uses the credentials from your .env file to create the 'users' table.
# You will be prompted for the appuser's password.
mysql -u appuser -p character_sheet_db < ../sql/db.sql

# Start the application with PM2
pm2 start server.js --name "dnd-backend"

(Note: --name "dnd-backend" is only for the initial setup of PM2. For future starts, you can simply run pm2 start dnd-backend.

The reason for the name is to differentiate the server from the other projects running on your VM.)

# IMPORTANT: These next two commands ensure the app restarts on server reboot
pm2 startup
pm2 save
```

### Step 6: Configure the Front-End

We will step up the front-end to work with Nginx

```bash
# Navigate to the front-end directory, install dependencies, and create the static production build.
cd /var/www/dnd-app/DnD-Character-Sheet/character-sheet-front-end
npm install
npm run build
```

### Step 7: Configure Nginx

We will set up Nginx so that the front-end can continuously run without the terminal needing to be open

```bash
# Copy the provided Nginx configuration
cp /var/www/dnd-app/DnD-Character-Sheet/nginx/nginx.conf /etc/nginx/sites-available/dnd-app

# IMPORTANT: You must edit the file to use your server's IP address.
# (Note: The automated script handles this step for you.)
nano /etc/nginx/sites-available/dnd-app

# IMPORTANT: Verify the root directive is correct:
root /var/www/dnd-app/DnD-Character-Sheet/character-sheet-front-end/dist;

# Disable the default Nginx page
rm /etc/nginx/sites-enabled/default

# Enable your site
ln -s /etc/nginx/sites-available/dnd-app /etc/nginx/sites-enabled/

#Test and Restart Nginx:
nginx -t
systemctl restart nginx
```

## You're Live!

Your application should now be accessible by navigating to your IP in a web browser.

### Deploying Updates

To deploy new code from the Git repository, follow these steps:

```bash
# Pull Changes
cd /var/www/dnd-app/DnD-Character-Sheet
git pull

# Update Back-End: If you changed back-end files, restart the PM2 process.
cd character-sheet-back-end
npm install
pm2 restart dnd-backend

#Update Front-End: If you changed front-end files, you must rebuild the dist folder
cd ../character-sheet-front-end
npm install
npm run build
```