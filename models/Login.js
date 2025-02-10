const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emp_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true }
});


module.exports = mongoose.model("Login", loginSchema);
