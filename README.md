Task Manager App

A Task Management Application built with Next.js (Frontend) and NestJS (Backend), using MongoDB for data storage. This application allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

📌 Features

Create, edit, delete, and view tasks.

Task status management (Pending, In-Progress, Completed).

State management with Redux Toolkit.

API integration using Axios.

MongoDB for database storage.

Jest tests for both frontend and backend.

🛠 Tech Stack

Frontend (Client - Next.js)

Next.js (React Framework)

Redux Toolkit (State Management)

Axios (API calls)

TypeScript

Jest (Testing)

Backend (Server - NestJS)

NestJS (Node.js Framework)

MongoDB with Mongoose

Class-validator (DTO Validation)

Jest (Testing)

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/your-username/task-manager.git
cd task-manager

2. Setup Environment Variables

Create a .env file inside both client/ and server/ directories.

Client (Frontend)

NEXT_PUBLIC_API_URL=http://localhost:8000/tasks

Server (Backend)

PORT=8000
MONGO_URI=mongodb://localhost:27017/task-manager

3. Install Dependencies

# Install frontend dependencies
cd client
bun install
// or npm install

# Install backend dependencies
cd ../server
npm install

4. Start MongoDB

Ensure MongoDB is running locally. If you use Docker, start a MongoDB container:

docker run -d -p 27017:27017 --name task-manager-mongo mongo

5. Run the Backend Server

cd server
npm run start

Backend should be running at http://localhost:8000.

6. Run the Frontend (Next.js App)

cd client
bun run dev

Frontend should be running at http://localhost:3000.

🧪 Running Tests

Backend (NestJS) Tests

Run Jest tests for the backend:

cd server
npm run test

Frontend (Next.js) Tests

Run Jest tests for the frontend:

cd client
npm run test

📜 API Endpoints (Backend)

Method

Endpoint

Description

POST

/tasks

Create a new task

GET

/tasks

Fetch all tasks

GET

/tasks/:id

Fetch a single task by ID

PUT

/tasks/:id

Update a task

DELETE

/tasks/:id

Delete a task

📦 Docker Setup (Optional)

1. Install Docker

Ensure Docker is installed on your system. You can install it from Docker's official website.

Verify the installation:

docker --version
docker-compose --version

2. Run the Application with Docker

To run the entire project using Docker, ensure the following docker-compose.yml file exists in the root directory:

version: "3.8"

services:
    client:
        build:
            context: ./client
            dockerfile: Dockerfile
        ports:
            - "3000:3000"
        environment:
            - NEXT_PUBLIC_API_URL=http://server:8000/tasks
        depends_on:
            - server
        volumes:
            - ./client:/app
            - /app/node_modules

    server:
        build:
            context: ./server
            dockerfile: Dockerfile
        ports:
              - "8000:8000"
        environment:
              - PORT=8000
              - MONGODB_URI=mongodb://mongo:27017/task-manager
        depends_on:
              - mongo
        volumes:
              - ./server:/app
              - /app/node_modules

    mongo:
        image: mongo:latest
        ports:
              - "27017:27017"
        volumes:
              - mongo-data:/data/db

volumes:
      mongo-data:

Run the application with:

docker-compose up

The application should be accessible at:

Frontend: http://localhost:3000

Backend: http://localhost:8000

MongoDB: mongodb://localhost:27017/task-manager

To stop the containers, run:

docker-compose down

📝 Conclusion

This Task Manager App demonstrates full-stack development using Next.js, NestJS, MongoDB, and Redux Toolkit. Feel free to contribute and improve the project!

Author: Vinod KRGitHub: http://github.com/vin-dKR
