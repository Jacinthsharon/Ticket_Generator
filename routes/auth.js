const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
    console.log("Login route hit!");  // Check if this prints in the console
    console.log("Request body:", req.body);  // Check if data is coming correctly

    try {
        const { emp_id, password } = req.body;
        if (!emp_id || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await User.findOne({ emp_id });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        res.json({ message: "Login successful", role: "admin" });
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
