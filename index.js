const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Define server constants
const PORT = 3000;
const BASE_ENDPOINT = '/v1/product';
const DB_PATH = 'mongodb://127.0.0.1:27017/techExamDB';

// Connect to local MongoDB
mongoose.connect(DB_PATH);

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