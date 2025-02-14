const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    emp_id: { type: String, required: true },
    name: { type: String, required: true },
    work: { type: String, required: true },
    date: { type: Date, required: true },
    priority: { type: String, required: true, enum: ['low', 'medium', 'high'] }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
