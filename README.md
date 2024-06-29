# Tech Talk App

## Getting Started

### Installation

#### Dependencies  
Ensure you have the following installed **and** running:

- Docker 
- Docker Compose

#### Build Docker Containers
We are using docker containers for development purposes. Navigate to the root directory of the project and run:
```shell
./build.sh
```
This will make sure your node_modules are installed for each tech (express and next) and build the containers. If you are not able to run the command due to file permission issues, run the command:
```shell
chmod +x build.sh
```

#### Running Docker Containers
Once the docker containers have successfully built, from the root directory, run:
```shell
docker compose up
```

#### Developing in Containers
The Docker containers **are** using your local node_modules folder so when you install new modules, you should not have to rebuild your containers

#### Stopping Docker Containers
Once you are done with development, to spin down the containers, run:
```shell
docker compose down
```

## Project Structure

### Frontend 
- NextJS - http://localhost

### Backend
- Express - http://localhost/api_v1
- MongoDB

## Contact

For Docker related questions, please contact:

#### Steven Brown

smbrown1@student.fullsail.edu

**smbrown1** on FSO Web Development Slack

![Degree Program](https://img.shields.io/badge/degree-web%20development-blue.svg)
