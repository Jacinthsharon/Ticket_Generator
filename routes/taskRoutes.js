const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/tasks', async (req, res) => {
    try {
        const { emp_id, name, work, date } = req.body;

        if (!emp_id || !name || !work || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newTask = new Task({ emp_id, name, work, date });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { emp_id, name, work, date } = req.body;

        if (!emp_id || !name || !work || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        console.log("Received PUT request for ID:", id);

        const updatedTask = await Task.findByIdAndUpdate(id, { emp_id, name, work, date }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("PUT Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;