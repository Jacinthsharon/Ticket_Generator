const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, emp_id, password } = req.body;

    try {
        const existingUser = await User.findOne({ emp_id });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, emp_id, password });
        await newUser.save();

        console.log("User registered:", newUser);
        res.status(201).json({ success: true, redirect: "/admin" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;