const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://task-management-application-chi-navy.vercel.app", "http://localhost:5173"],
  })
);
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// database connection
const connectDb = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to MongoDB successful");
  } catch (err) {
    console.log(err);
  }
};

// server
if (process.env.NODE_ENV !== 'test') {
  connectDb();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;