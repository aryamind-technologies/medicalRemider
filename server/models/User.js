const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    userId: { type: String, required: true, unique: true },
    phone: { type: String },
});

// Adding a method to generate a JWT token
userSchema.methods.generateToken = function() {
    const payload = { id: this._id, name: this.name, role: this.role };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

// Pre-save hook to hash password before storing it
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    // Hash password before saving
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
