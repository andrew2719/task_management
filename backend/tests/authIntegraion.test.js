const request = require('supertest');
const app = require('../Server');
const User = require('../models/User');

describe('Auth Integration', () => {
  test('Register and login', async () => {
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