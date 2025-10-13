#!/bin/bash

#Runs the project on the VM properly.
#Author: Raymond Marx

git pull 'https://github.com/tgillysuit/DnD-Character-Sheet.git' #Iffy if we have multiple branches, but good for now.

# Run the backend.
(cd ./server && npm start)

# Run the frontend the way I did on the VM. 
(cd ./frontend/dnd-character-sheet && npm run build && npm run start)

