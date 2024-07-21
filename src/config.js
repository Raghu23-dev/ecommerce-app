const mongoose = require('mongoose');
 
// MongoDB connection URL
const url = 'mongodb://localhost:27017/CombinedDB';
 
// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected Successfully'))
  .catch(err => console.error('Database connection error:', err.message));
 
// Define the schema for user data
const Loginschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,               // User's full name is required
  },
  username: {
    type: String,
    required: true,               // Username is required
    unique: true,                 // Username must be unique
  },
  email: {
    type: String,
    required: true,               // Email is required
    unique: true,                 // Email must be unique
    lowercase: true,              // Store email in lowercase
    trim: true,                   // Trim any whitespace from email
  },
  password: {
    type: String,
    required: true,               // Password is required
  }
});
 
// Create a model for User using the defined schema
const User = mongoose.model('User', Loginschema);
 
// Define the schema for product data
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,               // Product name is required
  },
  price: {
    type: Number,
    required: true,               // Product price is required
  },
  description: {
    type: String,
    required: true,               // Product description is required
  },
  category: {
    type: String,
    required: true,               // Product category is required
  },
  imageUrl: {
    type: String,
    required: true,               // URL of the product image is required
  }
});
 
// Create a model for Product using the defined schema
const Product = mongoose.model('Product', ProductSchema);
 
// Export the models for use in other parts of the application
module.exports = { User, Product };