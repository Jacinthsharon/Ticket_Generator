const mongoose = require("mongoose");

const createSchema = new mongoose.Schema({
    emp_id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }, 
});

const Create = mongoose.model("Create", createSchema);

module.exports = Create;

