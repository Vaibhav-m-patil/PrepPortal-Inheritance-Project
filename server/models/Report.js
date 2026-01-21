const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    year: { type: String, required: true }, // e.g., "2024-2025"
    pdfLink: { type: String, required: true }, // The URL to the PDF
    thumbnail: { type: String } // Optional: A generic image for the card
});

module.exports = mongoose.model('Report', ReportSchema);



