#Install node
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY character-sheet-backend/package*.json 

# Install dependencies
RUN npm i

#Copying backend dependencies
COPY character-sheet-backend/

#Build the application 
RUN npm run dev

#Expose port 5173
EXPOSE 5173