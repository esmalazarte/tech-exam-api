const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');

describe('User Authentication Tests', () => {

    // Clean up database before starting tests
    beforeAll(async () => {
        await User.deleteMany();
    });

    // Close connection after all tests
    afterAll(async () => {
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

    // Test for registering existing user
    test('Should fail to register an existing user', async () => {
        const response = await request(app)
        .post('/auth/register')
        .send({
            username: 'admin',
            password: 'newpassword',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('User already exists');
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
    });

    // Test for logging in with no valid user
    test('Should fail to login due to invalid username', async () => {
        const response = await request(app)
        .post('/auth/login')
        .send({
            username: 'admin1',
            password: 'password',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid username');
    });

    // Test for logging in with wrong password
    test('Should fail to login due to wrong password', async () => {
        const response = await request(app)
        .post('/auth/login')
        .send({
            username: 'admin',
            password: 'wordpass',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Incorrect password');
    });
});