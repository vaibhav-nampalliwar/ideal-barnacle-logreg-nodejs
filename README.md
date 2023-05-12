# Backend Demo for Registration & Login
# Node.js Authentication System

This is a Node.js-based authentication system that allows users to register, login, and access protected routes. It utilizes technologies such as Express.js, MongoDB, bcrypt for password hashing, and JWT for authentication.

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- Node.js : [Download Node.js](https://nodejs.org)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git

2. Navigate to the project directory:
   ```bash
       cd your-repo
       
3. Install the dependencies:
   ```bash
   npm install
   
4. Set up environment variables:

   ```Create a .env file in the root directory.
    Define the following environment variables in the .env file:
    PORT=Define the port number you want
    DB_URL=mongodb://URL/Database_Name
    JWT_SECRET=your-secret-key
    
    
5. Start the server:

       npm start
 
# API Documentation

The API provides the following endpoints to manage user authentication and access protected routes.

# Register a User
Registers a new user with the provided information.

    URL: /register
    Method: POST
    Request Body:
    firstname (string): First name of the user.
    lastname (string): Last name of the user.
    email (string): Email address of the user.
    password (string): Password for the user.
    confirmpassword (string): Confirm password for the user.

# Example Request:

    POST /register HTTP/1.1
    Content-Type: application/json
    {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "password": "password123",
      "confirmpassword": "password123"
    }

# Example Response:

    HTTP/1.1 201 Created
    Content-Type: text/html

    User registered successfully.
    
# Login
Authenticates a user with the provided email and password.

    URL: /login
    Method: POST
    Request Body:
    email (string): Email address of the user.
    password (string): Password for the user.

# Example Request:

    POST /login HTTP/1.1
    Content-Type: application/json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    
# Example Response:

    HTTP/1.1 200 OK
    Content-Type: text/html

    Login successful. Redirecting to the secrets page.

# Access Protected Route
Access a protected route that requires authentication.

    URL: /secrets
    Method: GET
    Authorization: Bearer Token
    
# Example Request:

    GET /secrets HTTP/1.1
    Authorization: Bearer  token

# Example Response:

    HTTP/1.1 200 OK
    Content-Type: text/html
    Welcome to the secrets page! Here's some secret information.
    
    
# Logout
Logs out the authenticated user.

    URL: /logout
    Method: GET
    Authorization: Bearer Token 

# Example Request:

    GET /logout HTTP/1.1
    Authorization: Bearer
    
# Example Response:

    HTTP/1.1 200 OK
