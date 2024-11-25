const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
/* eslint-disable no-unused-vars */
require('colors')

dotenv.config()
connectDB()

const app = express() // Initialize app

// Middleware to enable CORS
app.use(cors())

// Middleware to parse JSON
app.use(express.json())
console.log('Middleware initialized'.cyan.bold)

// Import product routes
const productRoutes = require('./routes/productRoutes')
app.use('/api', productRoutes)

// --- another approach where all route definitions in productRoutes will be relative (e.g., /, /:id).
// app.use('/api/products', productRoutes)

// Define a simple route
app.get('/', (req, res) => {
  res.send('API is running...')
})

// Error handling middleware (optional, for better error responses)
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  console.error(err.message.red)
  res.status(500).json({ message: 'Server Error' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan))

// --- Minimalistic and straight to the point version.---
// Easier to read for a smaller project without extra functionality like error handling.
/*
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
require('colors');

// Connect to MongoDB
connectDB();

const app = express(); // Initialize app

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Import product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes); // Use '/api' as the base route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green.bold));
*/
