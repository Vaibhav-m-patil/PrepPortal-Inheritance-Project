const router = require('express').Router();
const User = require('../models/User'); // Import the Blueprint we just updated

// UPDATE USER PROFILE
// When Frontend calls: PUT http://localhost:5000/users/<id>
router.put('/:id', async (req, res) => {
    try {
        // Find user by ID and update whatever data is sent in body
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true } // Return the NEW updated data so frontend can show it
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER (To show profile data)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc; // Don't send password back
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;