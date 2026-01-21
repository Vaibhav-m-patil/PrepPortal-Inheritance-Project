const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // 1. Basic Auth
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // 2. Profile Details (New fields for the Edit Page)
    bio: { type: String, default: "" },
    skills: { type: String, default: "" }, 
    year: { type: String, default: "" },
    branch: { type: String, default: "" },
    
    // 3. Links & Files (Storing as strings/URLs)
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    profilePic: { type: String, default: "" }, 
    resume: { type: String, default: "" }, // Path to the uploaded PDF

    // 4. The Roadmap (Array of steps)
    roadmap: [
        {
            title: { type: String },   // e.g., "Online test cleared"
            status: { type: String }   // e.g., "Applied", "Completed"
        }
    ],

    // 5. Social Features (Keeping your old code too!)
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);