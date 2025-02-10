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
const loginRoutes = require("./routes/auth");

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

app.use('/api/auth', authRoutes);

app.use('/api/auth', loginRoutes);

app.use("/api", createRoutes);

app.use('/api', taskRoutes);

app.get('/create', userController.getUsers);

app.get('/create', userRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server running on port 3000');
});
