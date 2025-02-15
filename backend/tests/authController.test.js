const request = require('supertest');
const app = require('../Server');
const User = require('../models/User');

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('Login with valid credentials', async () => {
    await request(app)
      .post('/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});