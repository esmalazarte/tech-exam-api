const mongoose = require('mongoose');

// Database schema of Product
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {
        type: String,
        enum: ['food', 'sports', 'household', 'music', 'electronic', 'appliance'],
        required: true
    },
    quantity: {type: Number, required: true},
    unitPrice: {type: Number, required: true},
    requirements: {type: String} // (not sure if part of product data or part of bottom section of exam specs)
});

module.exports = mongoose.model('Product', productSchema);