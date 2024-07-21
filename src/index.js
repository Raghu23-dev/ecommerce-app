const express = require('express');
const path = require('path');
const session = require('express-session');
const { User, Product } = require('./config');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
 
const app = express();
const port = 7000;
 
// Session middleware configuration
app.use(session({
  secret: 'your_secret_key', // Replace with a secure secret key in production
  resave: false,             // Don't save session if unmodified
  saveUninitialized: true,   // Save a new session if not initialized
}));
 
// Middleware to parse JSON bodies
app.use(express.json());
 
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
 
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));
 
// Set views directory and view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
 
// Register routes
app.use('/', authRoutes);
app.use('/products', productRoutes);
 
// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));