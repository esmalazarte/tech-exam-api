const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Define server constants
const PORT = 3000;
const BASE_ENDPOINT = '/v1/product';

// Connect to MongoDB
if (process.env.NODE_ENV == 'test') {
    mongoose.connect(process.env.TEST_DATABASE_URI);
} else {
    mongoose.connect(process.env.DATABASE_URI);
}

// Use base endpoint
app.use(BASE_ENDPOINT, productRoutes);

// Server error handler
app.use((err, req, res, next) => {
    res.status(500).json({error: err.message});
})

// Start server
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})

module.exports = app;