import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index.js';

let createdUserId = '';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Routes', () => {
  it('should GET all users', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);

  it('should CREATE a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({
        username: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'client',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  }, 10000);

  it('should GET the created user by ID', async () => {
    const res = await request(app).get(`/user/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdUserId);
  }, 10000);
});
