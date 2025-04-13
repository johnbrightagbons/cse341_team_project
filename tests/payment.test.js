import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index.js';

describe('Order Routes', () => {
  let createdPaymentId = '';
  let db;
  let connection;

  
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_TEST);
    }
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  
  it('should GET all payment', async () => {
    const res = await request(app).get('/payment');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);

  it('should CREATE a new payment', async () => {
    const res = await request(app)
      .post('/payment')
      .send({
        orderId: "67f01f0f8f3558d611068ceb",
        userId: "67ef1ea4b192f25d1cd2b90b",
        amount: 999.99,
        paymentMethod: "credit_card",
        transactionId: "1234MNS",
        status: "completed"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdOrderId = res.body._id;
  }, 10000);

  it('should GET the created payment by ID', async () => {
    const res = await request(app).get(`/payment/${createdPaymentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdPaymentId);
  }, 10000);
});
