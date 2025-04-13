import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index.js';

describe('Order Routes', () => {
  let createdOrderId = '';
  let db;
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should GET all orders', async () => {
    const res = await request(app).get('/order');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);

  it('should CREATE a new order', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        userId: '67ef1ea4b192f25d1cd2b90b',
        productId: '67f04d374c27f96e0e47151d',
        description: 'xxxx xxxx xxx',
        image: 'https://test.com/product.jpg',
        price: 123.99,
        status: 'completed',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdOrderId = res.body._id;
  }, 10000);

  it('should GET the created order by ID', async () => {
    const res = await request(app).get(`/order/${createdOrderId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdOrderId);
  }, 10000);
});
