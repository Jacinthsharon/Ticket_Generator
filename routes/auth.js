const express = require("express");
//const bcrypt = require("bcryptjs");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); 

const router = express.Router();

router.post("/login", async (req, res) => {
    const { emp_id, role, password } = req.body;

    try {
        console.log("Received Login Request:", { emp_id, role });

        const user = await User.findOne({ emp_id });

        if (!user) {
            return res.status(400).json({ message: "Invalid Employee ID" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const userData = { name: user.name, emp_id: user.emp_id, role };

        return res.json({ success: true, redirect: `/${role}`, user: userData });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
