const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) throw Error('User already exists');

        // Create new user
        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();

        res.json({ msg: "Registration Successful", user: savedUser });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});
// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        // 2. Check password (simple comparison for now)
        if (password !== user.password) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // 3. Return Success
        res.json({
            msg: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;