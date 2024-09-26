const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');

let token = ''

describe('Product Inventory API Tests', () => {

  // Clean up database before starting tests
  beforeAll(async () => {
    await Product.deleteMany();
    await User.deleteMany();
  });

  // Close connection after all tests
  afterAll(async () => {
    await Product.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });

  // Test for registering user
  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'admin',
        password: 'password',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  // Test for logging in
  test('Should login and return a token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'password',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');

    // Save the token for tests below
    token = response.body.token;
  });

  // Test for creating a valid product
  test('Should create a new product', async () => {
    const response = await request(app)
      .post('/v1/product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Hatdog',
        description: 'Tender Juicy Hatdog',
        type: 'food',
        quantity: 10,
        unitPrice: 200,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Hatdog');
  });

  // Test for creating an invalid product
  test('Should fail to create an invalid product', async () => {
    const response = await request(app)
      .post('/v1/product')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Kornbip',
        description: 'Argentina Kornbip',
        type: 'food',
        quantity: 20,
        // missing unitPrice
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test for fetching all products
  test('Should get all products', async () => {
    const response = await request(app)
      .get('/v1/product')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test for fetching 1 product
  test('Should get a product by ID', async () => {
    // Get the ID of a product
    const allProducts = await Product.find();
    const productId = allProducts[0]._id;

    const response = await request(app)
      .get(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Hatdog');
  });

  // Test for fetching nonexistent product
  test('Should fail to get a product', async () => {
    const productId = '66f41557815e8fcf05e72f94'; // random id

    const response = await request(app)
      .get(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  // Test for updating a product
  test('Should update a product', async () => {
    const allProducts = await Product.find();
    const productId = allProducts[0]._id;

    const response = await request(app)
      .put(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cheesy Hatdog',
        description: 'Tender Juicy Hatdog with Cheese',
        unitPrice: 250,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Cheesy Hatdog');
    expect(response.body).toHaveProperty('quantity', 10); // should be unmodified
    expect(response.body).toHaveProperty('unitPrice', 250);
  });

  // Test for invalid update of product
  test('Should fail to update a product', async () => {
    const allProducts = await Product.find();
    const productId = allProducts[0]._id;

    const response = await request(app)
      .put(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Kornbip',
        description: 'Argentina Kornbip',
        type: 'foodpoison', // invalid type
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test for deleting a product
  test('Should delete a product', async () => {
    const allProducts = await Product.find();
    const productId = allProducts[0]._id;

    const response = await request(app)
      .delete(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product deleted successfully');

    // Verify that the product is actually deleted
    const deletedProduct = await Product.findById(productId);
    expect(deletedProduct).toBeNull();
  });

  // Test for deleting nonexistent product
  test('Should fail to delete a product', async () => {
    const productId = '66f41557815e8fcf05e72f94'; // random id

    const response = await request(app)
      .delete(`/v1/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

});
