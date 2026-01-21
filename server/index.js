const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. IMPORT ROUTES (Make sure file names match exactly!)
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Middleware
app.use(cors());

// INCREASE LIMIT HERE (Replace the old app.use(express.json()))
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 2. USE ROUTES
app.use('/auth', authRoutes);  // Login/Signup
app.use('/users', userRoutes); // Profile Updates
app.use('/posts', postRoutes); // Home Page Posts

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});