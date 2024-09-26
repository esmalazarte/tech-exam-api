const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Connect to MongoDB
if (process.env.NODE_ENV == 'test') {
    mongoose.connect(process.env.TEST_DATABASE_URI);
} else {
    mongoose.connect(process.env.DATABASE_URI);
}

// Set endpoints
const AUTH_ENDPOINT = '/auth';
const BASE_ENDPOINT = '/v1/product';

// Use endpoints and middleware
app.use(AUTH_ENDPOINT, userRoutes);
app.use(BASE_ENDPOINT, authMiddleware, productRoutes);

// Server error handler
app.use((err, req, res, next) => {
    res.status(500).json({error: err.message});
})

module.exports = app;