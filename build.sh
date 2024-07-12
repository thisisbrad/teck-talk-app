#!/bin/bash

# Navigate to the project directory (modify accordingly if your script is not in the root)
cd "express"

echo "Installing Express npm packages..."
npm install

# Check if npm install succeeded
if [ $? -eq 0 ]; then
    echo "NPM packages installed successfully."
else
    echo "Failed to install NPM packages. Exiting..."
    exit 1
fi
cd "../next/"
echo "Installing NextJS npm packages..."
npm install

if [ $? -eq 0 ]; then
    echo "NPM packages installed successfully."
else
    echo "Failed to install NPM packages. Exiting..."
    exit 1
fi

# Build and run Docker containers

cd ".."
echo "Building and starting Docker containers..."
docker compose build

echo "Containers built successfully. Run the application using the command: docker compose up"
