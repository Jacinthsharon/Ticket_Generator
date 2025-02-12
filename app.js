require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userController = require('./controllers/userController');
const userRoutes = require('./routes/userRoutes');
const Create = require('./models/Create');
const createRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const Login = require("./models/Login");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const loginRoutes = require("./routes/auth"); 
const reportRoutes = require("./routes/reportRoutes");

const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:3000', "https://ticket-generator-13.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.static('public'));

app.set('view engine','ejs');

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/',(req,res) => {
  res.render('signup',  {title : 'signup' });
});

app.get('/login',(req,res) => {
  res.render('login',  {title : 'login' });
});

app.get('/user',(req,res) => {
  res.render('user',  {title : 'user' });
});

app.get('/admin',(req,res) => {
  res.render('admin',  {title : 'admin' });
});

/*app.post("/login", async (req, res) => {
    const { emp_id, role, password } = req.body;

    try {
        console.log("Received Login Request:", { emp_id, role });

        // Find user by emp_id
        const user = await User.findOne({ emp_id });

        if (!user) {
            console.log("User not found in database");
            return res.status(400).json({ message: "Invalid Employee ID" });
        }

        console.log("User found:", user);

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Incorrect password attempt for", emp_id);
            return res.status(400).json({ message: "Incorrect Password" });
        }

        // Check role and redirect accordingly
        if (role === "admin") {
            return res.json({ success: true, redirect: "/admin" });
        } else if (role === "user") {
            return res.json({ success: true, redirect: "/user" });
        } else {
            return res.status(400).json({ message: "Invalid role selected" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server Error" });
    }
});*/

/*app.post("/login", async (req, res) => {
  const { emp_id, role, password } = req.body;

  try {
      console.log("Received Login Request:", { emp_id, role });

      // Find user by emp_id
      const user = await User.findOne({ emp_id });

      if (!user) {
          console.log("User not found in database");
          return res.status(400).json({ message: "Invalid Employee ID" });
      }

      console.log("User found:", user);

      // Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          console.log("Incorrect password attempt for", emp_id);
          return res.status(400).json({ message: "Incorrect Password" });
      }

      // Create user data for frontend storage
      const userData = { name: user.name, emp_id: user.emp_id };

      // Check role and redirect accordingly
      if (role === "admin") {
          return res.json({ success: true, redirect: "/admin", user: userData });
      } else if (role === "user") {
          return res.json({ success: true, redirect: "/user", user: userData });
      } else {
          return res.status(400).json({ message: "Invalid role selected" });
      }
  } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Server Error" });
  }
});*/


app.use('/api/reports', reportRoutes);

app.use("/auth", loginRoutes);

app.use('/api/auth', authRoutes);

app.use("/api", createRoutes);

app.use('/api', taskRoutes);

app.get('/create', userController.getUsers);

app.get('/create', userRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server running on port 3000');
});
