const router = require('express').Router();
const Post = require('../models/Post');

// 1. CREATE A POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET ALL POSTS (For Home Page)
router.get('/', async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) means show newest posts first
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;