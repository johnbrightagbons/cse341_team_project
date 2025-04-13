import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index.js';

let createdProductId = '';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  }
});

afterAll(async () => {
  if (createdProductId) {
    await mongoose.connection.collection('products').deleteOne({ _id: new mongoose.Types.ObjectId(createdProductId) });
  }
  await mongoose.connection.close();
});

describe('Product Routes', () => {
  it('should GET all products', async () => {
    const res = await request(app).get('/product');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000);

  it('should CREATE a new product', async () => {
    const res = await request(app)
      .post('/product')
      .send({
        name: `Test Product ${Date.now()}`,
        description: 'A product for testing',
        image: 'https://test.com/product.jpg',
        price: 99.99
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdProductId = res.body._id;
  }, 10000);

  it('should GET the created product by ID', async () => {
    const res = await request(app).get(`/product/${createdProductId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdProductId);
  }, 10000);
});
