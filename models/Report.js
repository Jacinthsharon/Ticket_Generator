const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    emp_id: { type: String, required: true },
    work: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Completed', 'Pending'], required: true }
});

module.exports = mongoose.model('Report', ReportSchema);
