#!/bin/bash

#Runs the project on the VM properly.
#Author: Raymond Marx

#Takes variables from server environment variable
source ./server/.env

git pull 'https://github.com/tgillysuit/DnD-Character-Sheet.git' #Iffy if we have multiple branches, but good for now.

# Run the backend.
echo "Starting backend..."
(cd ./server && npm start) &

echo "Waiting for backend to initialize.."
sleep 5

# Run the frontend the way I did on the VM. 
echo "Starting frontend..."

cd ./frontend/dnd-character-sheet
# Create file with server IP in front-end so it can be placed statically in the file.
FE_VM_IP="vm_ip.js"
cat <<EOF > $FE_VM_IP 
export const VM_IP = "http://$VM_IP:$SERVER_PORT"

EOF

cd ../..

(cd ./frontend/dnd-character-sheet && npm run build && npm run start)

