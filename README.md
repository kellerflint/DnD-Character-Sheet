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

## Sprint 1

#### Group B (Tyler & Raymond)

### Overall Goals
* Set up the backend server with Node.js and Express.
* Design and implement the database schema in MySQL.
* Create RESTful API endpoints for CRUD operations on character sheets.
* Implement user authentication and session management.
* Integrate with an external D&D API to fetch necessary game data (e.g., spells, items).
* Set up the React frontend with a basic layout and navigation.
* Create the character creation form with interactive fields.
* Implement data persistence to save character sheets to the database.
* Ensure the frontend can fetch and display character data from the backend.
* Basic styling for the application to ensure a user-friendly interface.
* Write unit tests for backend API endpoints and frontend components.
* Deploy the application to a cloud platform (e.g., Heroku, Vercel).

-------------------------------------

### Project Formatting and Setting Up Instructions

#### Format and Structure
The approach that we took was doing a simple/complex ***Node.js*** backend as well as a ***Next.js*** project as the frontend. You’ll see a folder named ***“server,”*** which is the backend and a folder named ***“frontend/dnd-character-sheet”*** which is the frontend. We chose Next.js, because it’s fast and you don’t have to worry about a React Router. 
Setting-up
Before setting up, go through the folder structure and check out what you’ll be dealing with. There are numerous files in the frontend and backend. Be sure to read the comments in the files to get a sense of what’s going on in this project.

Down below you can follow the setup guide on how to get this project setup on your machine and your virtual machines.

#### Local Setup:

1. First, you’re going to need to ```cd``` into the server and do ```npm i``` to install dependencies.
2. ```cd . .``` to get back to the main folder, then cd into the ***frontend/dnd-character-sheet*** and do a ```npm i to install``` those dependencies for your local machine.
3. Take a look at the ***.example.env*** file where you’ll see some of the constant variables that you’ll need inside to run the program, be sure to create your **own** ***.env file*** and copy and paste those fill-in variables into your newly created .env file.
4. Once you’ve got your credentials inputted into the .env file, go ahead and open up to two terminals, while using one terminal cd into the server folder and use the other terminal and cd into the frontend/dnd-character-sheet folder.
5. Inside of the ***server*** terminal, do a nodemon server.js command, and hit enter.
6. Inside of the ***frontend/dnd-character-sheet*** terminal, do a ```npm run dev```, and hit enter.
7. Once the backend and frontend have loaded up locally, go ahead and try registering a test user from the frontend.
8. Once the frontend has loaded up in your browser, click on register to create a **test** account. 

    *Password is 8 characters minimum*

9. After you get a successful registration, be sure to test the login feature to see if you login locally.

<!-- ADD ADDITIONAL INSTRUCTIONS ON THIS BULLETIN -->

#### Virtual-Machine Setup:

Once you’ve tested or feel risky to move forward, here is how you set up your VM.

1. Go ahead and login to your VM by doing ```ssh root@”YOUR_VM_IP”```, and enter your VM’s password.
2. Once inside of your VM, be sure to git clone the project’s repo.
3. Then ```cd``` into DnD-Character-Sheet
4. Run the command ```bash dependencies.sh```
5. This next command you’ll need to fill in some usage variables which are your variables that you filled into your ***.env file.*** 
6. Here is the usage case: ```bash db_setup.sh {SERVER_PORT} {FE_ORIGIN} {VM_IP}  {DB_USER} {DB_PASS} {DB_NAME} {DB_PORT}```
Then hit enter.
7. You might be prompted to enter your password, enter your VM’s password.
8. Lastly run the command ```bash run_project.sh```


This should run the full program, be sure to test it on the frontend and register for account and follow the ***CRUD*** steps of ***Creating, Reading, Updating, and Deleting*** to test and see if this runs on your VM. Check mysql on your VM to see if users are being created, updated, and deleted. 

## Next Steps:
1. Extend functionality of run_project.sh to accomodate different branches, automatically allowlist YOUR OWN IP address as a host.
2. Implement character creation through user page (IP:PORT/user/[username]). This can be done by creating a new table for the databse for characters, and having a new router and controller file that delineates the characters from the users.
3. Modify DB schema to accomodate the instantiation of Admin users (users as in users within the database).
4. Implement secure sessions (through JWTs or other ideas you have) as our local storage was used in lieu of more secure methods out of time constraints.
5. Modify dependencies.sh to install more dependencies as needed/remove redundant ones. (Your discretion).
6. Fix/improve/replace workaround solutions like the creation of vm_ip.js used for storing VM_IP locally.
7. Strenghthen deployment pipeline (automate bash script running, modify scripts to avoid dependency errors, etc.)

8. ***Important: Also finish what is asked of Sprint 3***
