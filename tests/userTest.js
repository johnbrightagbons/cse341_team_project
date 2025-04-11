// tests/userTest.js
import request from 'supertest';
import app from '../index.js'; 
import mongoose from 'mongoose';

let createdUserId = '';

describe('User Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should GET all users', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should CREATE a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({
        username: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'client'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  });

  it('should GET the created user by ID', async () => {
    const res = await request(app).get(`/user/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdUserId);
  });

  it('should UPDATE the user', async () => {
    const res = await request(app)
      .put(`/user/${createdUserId}`)
      .send({ username: 'Updated Name' });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('Updated Name');
  });

  it('should DELETE the user', async () => {
    const res = await request(app).delete(`/user/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted Successfully.');
  });
});
