# Web-Server
## Introduction
This is the HPWV frontend for the prototype.
It is a React Redux SPA using SVG to display the information from the Kafka Cluster.
The docker compose file for this project starts an nginx web server, serving the frontend app.

## Preparation
Install `docker` and `docker-compose`.

Run `docker compose build` to build the docker container ahead of running them.

Make sure the web server is running before trying to use the frontend.

## Running
Simply run `docker compose up` if you want to see the log output in the current
terminal session or `docker compose up -d` if you want to start it in the background.

After starting the container, open a browser and go to `https://localhost:3001`.
You should see the HPWV frontend. An indicator in the upper right corner will tell you if 
a WebSocket connection to the web server could be established.

## Stopping
In order to stop the container, run `docker compose down`.
