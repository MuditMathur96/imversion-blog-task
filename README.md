# Full Stack Blogging Platform

## Introduction

Completed the task given by Imversion Technologies, TrendTales is a blogging platform where users can write and share their thougths, emotions and experiences.

## Features

- Authentication: User can login or sign up using the their email id or google OAuth
- Blog
    - Users can view list of blogs
    - Users can filter the blogs based on category
    - Authenticated users can create or delete their own posts



## Installation & Setup


Make sure node is installed on the system or scroll down for docker guide to run the servers using docker

Node: Make sure port 3000 and 8000 are available on the system.

### Respository 
Clone the repository using this command
- gh repo clone MuditMathur96/imversion-blog-task
- OR
- git clone https://github.com/MuditMathur96/imversion-blog-task.git
### Frontend
 - cd frontend
 - npm install
 - npm run dev

### Backend
 - cd node-graphql
 - npm install
 - npm run test // for running unit tests
 - npm run dev // to start the server

Once the server starts go to: http://localhost:3000 to get started



    



## Docker Setup

Note: make sure docker and docker compose is installed on the system and while in the root folder, run these commands

- docker-compose build
- docker-compose up

This will start both the servers and http://localhost:3000 will be exposed.

