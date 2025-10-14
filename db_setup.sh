#!/bin/bash

# USAGE: bash db_setup.sh {SERVER_PORT} {FE_ORIGIN} {VM_IP} {VM_PASS} {DB_USER} {DB_PASS} {DB_NAME} {DB_PORT}

# ^ I really don't like the eight parameters but it will be what we have for now.
# ill also need input validation.

#Author: Raymond Marx

local_env=".env"

#Need sudo perms
sudo -v

cd server

cat <<EOF > "$local_env"
#Server Port
SERVER_PORT=$1

#Frontend Origin
FE_ORIGIN='$2'

#Virtual Machine Credentials
VM_IP='$3'
VM_PASS='$4'

#DB Credentials
DB_USER='$5'
DB_PASS='$6'
DB_NAME='$7'
DB_PORT='$8'
EOF


#I'm worried about SQL injections for this section, but only the people WITH ACCESS the VM will be using this.

# Create database if it doesn't exist.
sudo mysql -u root -p -e "
CREATE DATABASE IF NOT EXISTS $7;
"

# Show executing query:
echo "Executing:
CREATE USER IF NOT EXISTS '$5'@'localhost' IDENTIFIED BY '$6'; 
CREATE DATABASE IF NOT EXISTS \`$7\`;
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, EXECUTE, REFERENCES, CREATE TEMPORARY TABLES ON \`$7\`.* TO '$5'@'localhost';
FLUSH PRIVILEGES;
"

# Create user to access DB
sudo mysql -u root -p -e "
CREATE USER IF NOT EXISTS '$5'@'localhost' IDENTIFIED BY '$6'; 
CREATE DATABASE IF NOT EXISTS \`$7\`;
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, EXECUTE, REFERENCES, CREATE TEMPORARY TABLES ON \`$7\`.* TO '$5'@'localhost';
FLUSH PRIVILEGES;
"