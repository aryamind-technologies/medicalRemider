const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

// Home route
const home = async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to the project' });
    } catch (error) {
        res.status(400).json({ msg: 'Page not found', error: error.message });
    }
};

// Register a new user
const register = async (req, res) => {
    try {
        let { name, email, password, role ,phone } = req.body;

        // Check if user exists by email
        const userExist = await User.findOne({ email });  // Find user by email
        if (userExist) {
            return res.status(400).json({ message: 'Email already exists' });  // Return error if email already exists
        }

        // Make name unique
        const originalName = name;
        let counter = 1;
        let nameExists = await User.findOne({ name });

        while (nameExists) {
            name = `${originalName}${counter}`;
            counter++;
            nameExists = await User.findOne({ name });
        }

        // Create a new user
        const userCreate = await User.create({
            userId: `user_${uuidv4()}`,
            name,
            email,
            password,
            role,
            phone,
        });

        // Generate a JWT token
        const token = jwt.sign({ id: userCreate._id, name: userCreate.name, role: userCreate.role }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        // Return response
        return res.status(201).json({
            message: 'Registration successful',
            token,
            userId: userCreate._id,
            name: userCreate.name,
        });
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.error('Error in register function:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Validate input
        if (!phone || !password) {
            return res.status(400).json({ message: 'phone and password are required' });
        }

        // Find user by email (corrected query)
        const userExist = await User.findOne({ phone });

        if (!userExist) {
            return res.status(401).json({ message: 'Invalid phone or password' });
        }

        // Compare password using bcrypt directly
        const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid phone or password' });
        }

        // Generate token
        const token = jwt.sign({ id: userExist._id, name: userExist.name ,role: userExist.role }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

        // Successful login response
        return res.status(200).json({
            message: 'Login successful',
            token,
            userId: userExist._id.toString(),
            name: userExist.name, // Include the user's name in the response for clarity
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password from results
        return res.status(200).json({
            message: 'Users fetched successfully',
            users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { home, register, login ,getAllUsers};
