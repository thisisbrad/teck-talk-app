# Use the official Node.js 22 image as a parent image
# https://hub.docker.com/_/node
FROM node:22-alpine

WORKDIR /app
EXPOSE 3000
# Here we are setting up the local project
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
