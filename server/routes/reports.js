const router = require('express').Router();
const Report = require('../models/Report');

// 1. GET ALL REPORTS
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find().sort({ year: -1 }); // Newest first
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. ADD A REPORT (You can use Postman or a script to run this once)
router.post('/', async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(200).json(savedReport);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;