# Task Manager RESTful API

This project implements a simple Task Manager RESTful API using Node.js and Express.js. The API allows users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. Tasks have a title, description, and a completion status flag. The API is tested using Postman or Curl.

## Table of Contents

- [Objective](#objective)
- [Project Description](#project-description)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Objective

Build a RESTful API for a simple task manager application using Node.js, Express.js, and NPM packages.

## Project Description

This project creates a RESTful API with the following endpoints:

- `GET /taskmanager/v1/tasks`: Retrieve all tasks.
- `GET /taskmanager/v1/tasks/:taskID`: Retrieve a single task by its ID.
- `POST /taskmanager/v1/tasks`: Create a new task.
- `PUT /taskmanager/v1/tasks/:taskID`: Update an existing task by its ID.
- `DELETE /taskmanager/v1/tasks/:taskID`: Delete a task by its ID.

The tasks are stored in an in-memory data store (an array) and are persisted to a JSON file (`tasks.json`). Proper error handling is implemented for invalid requests, and input validation is applied for task creation and updates.

## Setup

1. Install dependencies:

   ```bash
   npm install express
   
