

# Task Management Application

You can access the live application 🌐 [here](https://task-management-nine-mu.vercel.app).


## Table of Contents

- [Setup Instructions In LocalSystem](#setup-instructions-in-localsystem)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [Deployment in Cloud](#deployement-in-cloud)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Project Architecture and Design Decisions](#project-architecture-and-design-decisions)
    - [Key Design Decisions](#key-design-decisions)
- [Additional Information](#additional-information)
- [Contact Information](#contact-information)

## Setup Instructions In LocalSystem


1. *Clone the repository:*
    ```bash
    git clone https://github.com/andrew2719/task_management.git
    ```

2. *Navigate to the project directory:*
    ```bash
    cd task_management
    ```


### Backend Setup

1. *Navigate to the backend directory:*
    ```bash
    cd backend
    ```

2. *Install dependencies:*
    ```bash
    npm install
    ```

3. *Setup environment variables:*
    Create a .env file in the root directory and add the following:
    ```bash
    PORT=3000
    MONGO_URI=your_mongo_atlas_uri
    MONGO_URI_TEST=your_mongo_atlas_test_uri
    JWT_SECRET=your_jwt_secret
    ```

4. *Update CORS origins:*
    In server.js, add http://localhost:5173 to the allowed origins:
    ```javascript
    app.use(
      cors({
        origin: ["http://localhost:5173"],
      })
    );
    ```

5. *Start the backend server:*
    ```bash
    npm start
    ```

### Frontend Setup

1. *Navigate to the frontend directory:*
    ```bash
    cd frontend
    ```

2. *Install dependencies:*
    ```bash
    npm install
    ```

3. *Configure frontend:*
    Modify src/config.js to include:
    ```javascript
    export const SERVER_URI = 'http://localhost:3000';
    ```

4. *Start the frontend server:*
    ```bash
    npm run dev
    ```


### Deployement in Cloud

    To deploy in cloud just replace the end points of local host with the service provider uris

## Technologies Used

The project leverages the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing application data.
- **JSON Web Tokens (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.

## Key Features

- **User Authentication:** 
  - Secure registration and login using email and password.
  - JWT-based authentication to protect API endpoints.
- **Task Management:**
  - Create, read, update, and delete tasks.
  - Mark tasks as completed or revert them to pending.
- **API Security & Validation:**
  - All endpoints are secured using JSON Web Tokens.
  - Incoming API requests are validated to maintain data integrity.
- **Protected Routes:** 
  - Only authenticated users can access task management features.
- **Responsive Design:**
  - Optimized for desktops, tablets, mobile devices, and high-resolution screens.
- **Error Handling:**
  - Robust error management to provide meaningful feedback to users.

## Project Architecture and Design Decisions

The project is structured as a monorepo with separate folders for the backend and frontend:

```
/project
├── backend
│   |---
│   │---
│   └── server.js
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       └── config.js
│       │----
└── README.md
```

- *Backend*: A Node.js server using Express, MongoDB for the database, and JWT for authentication.
- *Frontend*: A React application built with Vite for fast development and build times.



### Key Design Decisions:

- *Monorepo Structure*: Keeps both backend and frontend codebases in a single repository for easier management.
- *Vite for React*: Chosen for its fast development server and optimized build process.
- *Express and MongoDB*: Provides a flexible and scalable backend with a NoSQL database.
- *JWT Authentication*: Ensures secure user authentication and session management.

## Additional Information

- Ensure that you have Node.js and npm installed on your machine.
- Replace placeholders in the .env file with actual values.
- Update the CORS configuration to match your development environment.
- The frontend configuration should point to the correct backend server URL.

Feel free to reach out if you encounter any issues or have any questions!

## Contact Information

For any queries or support, please contact:

- **Email:** [andrewblaze2719@gmail.com](mailto:andrewblaze2719@gmail.com)