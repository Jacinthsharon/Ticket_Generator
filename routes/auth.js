const express = require("express");
const Create = require("../models/Create"); // Adjust path if necessary
const User = require("../models/User"); // Assuming Admins are stored here
const router = express.Router();

router.post("/login", async (req, res) => {
    const { emp_id, role, password } = req.body;

    try {
        console.log("Received Login Request:", { emp_id, role });

        let user;
        
        if (role === "user") {
            // Check if the emp_id exists in Create schema
            user = await Create.findOne({ emp_id });
            if (!user) {
                return res.status(400).json({ message: "Invalid Employee ID" });
            }
        } else if (role === "admin") {
            // Check if the emp_id exists in User schema
            user = await User.findOne({ emp_id });
            if (!user) {
                return res.status(400).json({ message: "Invalid Employee ID" });
            }
        } else {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        // Compare passwords (plain text, not recommended for production)
        if (password !== user.password) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        // Prepare user data for frontend
        const userData = { name: user.name, emp_id: user.emp_id, role };

        return res.json({ success: true, redirect: `/${role}`, user: userData });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
