// tests/taskController.test.js
const request = require('supertest');
const app = require('../Server');
const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('Task Controller', () => {
  let token;

  beforeAll(async () => {
    const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    await user.save();
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }, 10000);

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  test('Create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'This is a test task' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Task Created Successfully');
  });

  test('Get all tasks', async () => {
    await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'This is a test task' });

    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.tasks.length).toBe(1);
  });
});