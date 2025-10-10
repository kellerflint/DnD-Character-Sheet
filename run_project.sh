#!/bin/bash

#Runs the project on the VM properly.
#Author: Raymond Marx

git pull 'https://github.com/tgillysuit/DnD-Character-Sheet.git' #Iffy if we have multiple branches, but good for now.

# Run the frontend the way I did on the VM. 
(cd /frontend/dnd-character-sheet && node run build && node run start)

