const mongoose = require("mongoose");
const User = require("../models/Create");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('create', { title: 'Create User', users });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        const { emp_id, name, password } = req.body;
        const newUser = new User({ emp_id, name, password });
        await newUser.save();
        res.redirect('/create'); 
    } catch (error) {
        res.status(500).send(error.message);
    }
};
