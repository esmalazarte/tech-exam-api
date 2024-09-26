const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

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

// Use /v1/product as base endpoint
const BASE_ENDPOINT = '/v1/product';
app.use(BASE_ENDPOINT, productRoutes);

// Server error handler
app.use((err, req, res, next) => {
    res.status(500).json({error: err.message});
})

module.exports = app;