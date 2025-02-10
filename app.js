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

const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.static('public'));

app.set('view engine','ejs');

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://jacinthsharon53:WbQf5rxmOJwya8Cs@cluster0.l4jfv.mongodb.net/userDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.post("/login", async (req, res) => {
    try {
        console.log("Received request body:", req.body); 

        const { emp_id, password } = req.body;

        if (!emp_id || !password) {
            return res.status(400).json({ message: "Missing emp_id or password" });
        }

        const user = await User.findOne({ emp_id: emp_id.trim() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isAdmin = emp_id; 

        res.json({ message: "Login successful", isAdmin });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
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

app.use('/api/auth', authRoutes);

app.use("/api", createRoutes);

app.use('/api', taskRoutes);

app.get('/create', userController.getUsers);

app.get('/create', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
