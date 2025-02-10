const mongoose = require('mongoose');

const taskReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    work: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Completed', 'Pending'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TaskReport = mongoose.model('TaskReport', taskReportSchema);

module.exports = TaskReport;