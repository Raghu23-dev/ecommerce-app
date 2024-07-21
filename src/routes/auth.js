const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../config'); // Assuming User model is exported from '../config'
const router = express.Router();

// Render the login page
router.get('/', (req, res) => res.render('login'));
router.get('/login', (req, res) => res.render('login'));

// Render the signup page
router.get('/signup', (req, res) => res.render('signup'));

// Handle user registration
router.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();
    res.redirect('/login'); // Redirect to login page after successful signup
  } catch (error) {
    res.status(500).send('Server error'); // Handle server errors
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials.');
    }

    // Set the session user
    req.session.user = user;

    // Redirect to the products page after successful login
    res.redirect('/products');
  } catch (error) {
    res.status(500).send('Server error'); // Handle server errors
  }
});

module.exports = router;
