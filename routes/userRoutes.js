const express = require('express');
const router = express.Router();
const Create = require('../models/Create');  
const bcrypt = require('bcrypt');

router.get("/creates", async (req, res) => {
    try {
        const creates = await Create.find().select("-password"); // Exclude passwords
        res.json(creates);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/creates/:id", async (req, res) => {
    try {
        const create = await Create.findById(req.params.id).select("-password"); // Exclude password
        if (!create) return res.status(404).json({ error: "Record not found" });
        res.json(create);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/creates', async (req, res) => {
    try {
        const { emp_id, name, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCreate = new Create({ emp_id, name, password: hashedPassword });
        await newCreate.save();

        res.status(201).json({ message: 'Created successfully', data: newCreate });
    } catch (error) {
        res.status(500).json({ error: 'Error saving create', details: error.message });
    }
});

router.delete("/creates/:id", async (req, res) => {
    try {
        console.log("Deleting record with ID:", req.params.id);

        const deletedCreate = await Create.findByIdAndDelete(req.params.id);

        if (!deletedCreate) {
            return res.status(404).json({ error: "Record not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
