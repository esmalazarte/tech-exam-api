const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register new user
exports.registerUser = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({username: req.body.username});
        if (existingUser) {
            res.status(400).json({error: 'User already exists'});
        } else {
            const newUser = await User.create(req.body);
            res.status(201).json({message: 'User registered successfully', user: newUser});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Login user and return token
exports.loginUser = async (req, res) => {
    try {
        // Check first if user exists
        const user = await User.findOne({username: req.body.username});
        if (user) {
            // Compare if passwords match
            const matched = await user.comparePassword(req.body.password);
            if (matched) {
                // Generate token and return
                const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY, {expiresIn: '1h'});
                res.status(200).json({message: 'User logged in successfully', token: token});
            } else {
                res.status(400).json({error: 'Incorrect password'});
            }
        } else {
            res.status(400).json({error: 'Invalid username'});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}