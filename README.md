# Task_Management_Application

You can access the live application [here](https://task-management-nine-mu.vercel.app).

## Setup Instructions

### Backend Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Start the backend server:**
    ```bash
    npm start
    ```

3. **Setup environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=3000
    MONGO_URI=your_mongo_atlas_uri
    MONGO_URI_TEST=your_mongo_atlas_test_uri
    JWT_SECRET=your_jwt_secret
    ```

### Frontend Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Start the frontend server:**
    ```bash
    npm run dev
    ```

3. **Configure frontend:**
    Modify `src/config.js` to include:
    ```javascript
    export const SERVER_URI = 'http://localhost:3000';
    ```

### Backend Configuration

1. **Update CORS origins:**
    In `server.js`, add `http://localhost:5173` to the allowed origins:
    ```javascript
    app.use(
  cors({
    origin: ["https://localhost:5173"],
  })
);
    ```

