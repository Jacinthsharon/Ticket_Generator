const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// POST: Add a new task report
router.post('/add', async (req, res) => {
    try {
        const { emp_id, work, date, status } = req.body;
        const newReport = new Report({ emp_id, work, date, status });
        await newReport.save();
        res.status(201).json({ message: "Report added successfully", report: newReport });
    } catch (error) {
        res.status(500).json({ message: "Error adding report", error });
    }
});

// GET: Fetch all reports
router.get('/all', async (req, res) => {
    try {
        const reports = await Report.find();
        console.log("Fetched Reports:", reports);  // Debugging Line
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Error fetching reports", error });
    }
});


router.get("/api/reports/:id", async (req, res) => {
    try {
        console.log("Fetching report with ID:", req.params.id); // Debugging log

        const report = await Report.findById(req.params.id);
        if (!report) {
            console.log("Report not found in DB");
            return res.status(404).json({ error: "Report not found" });
        }

        res.json(report);
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
