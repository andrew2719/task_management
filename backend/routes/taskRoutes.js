const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const {
  getTasks,
  getTask,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  incompleteTask,
} = require('../controllers/taskController');

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTask);
router.get('/user/:id', verifyToken, getUserTasks);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.patch('/:id/complete', verifyToken, completeTask);
router.patch('/:id/incomplete', verifyToken, incompleteTask);

module.exports = router;