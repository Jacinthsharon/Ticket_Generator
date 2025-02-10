const express = require('express');
const router = express.Router();
const Create = require('../models/Create');  

router.get("/creates", async (req, res) => {
    try {
      console.log("Fetching records...");
      const creates = await Create.find();
      console.log("Records found:", creates);
      res.json(creates);
    } catch (error) {
      console.error("Error fetching records:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get("/creates/:id", async (req, res) => {
    try {
        console.log("Fetching record with ID:", req.params.id);
        
        const create = await Create.findById(req.params.id);
        
        if (!create) {
            return res.status(404).json({ error: "Record not found" });
        }
        
        res.json(create);
    } catch (error) {
        console.error("Error fetching record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/creates', async (req, res) => {
    try {
        const newCreate = new Create(req.body);
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
