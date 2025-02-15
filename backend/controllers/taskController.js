const Task = require("../models/Task");
const express = require("express");
const { body, validationResult } = require('express-validator');

const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userId, title, description } = req.body;
    const task = new Task({ userId, title, description });
    await task.save();
    res.status(201).json({ message: "Task Created Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json({ task });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ userId: id });
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      status,
      updated_at: Date.now(),
    });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {
      status: "completed",
      updated_at: Date.now(),
    });
    res.status(200).json({ message: "Marked as completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incompleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {
      status: "pending",
      updated_at: Date.now(),
    });
    res.status(200).json({ message: "Marked as incomplete" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask,
  incompleteTask,
  getUserTasks,
};
