const Product = require('../models/productModel');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Read all Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Read 1 Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Check if product exists
        if (!product) {
            res.status(404).json({error: 'Product not found'});
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Update Product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        
        // Check if product exists
        if (!updatedProduct) {
            res.status(404).json({error: 'Product not found'});
        } else {
            res.status(200).json(updatedProduct);
        }
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// Delete Product by ID (will not return deleted product)
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        // Check if product exists
        if (!deletedProduct) {
            res.status(404).json({error: 'Product not found'});
        } else {
            res.status(200).json({message: 'Product deleted successfully'});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}