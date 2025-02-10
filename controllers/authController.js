const User = require('../models/User');

exports.signup = async (req, res) => {
  const { name, emp_id, password } = req.body;

  try {
      const userExists = await User.findOne({ emp_id });
      if (userExists) {
          return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({ name, emp_id, password });
      await newUser.save();

      console.log("User saved:", newUser); 

      res.status(200).json({ success: true, redirect: "/admin" });  
  } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};
