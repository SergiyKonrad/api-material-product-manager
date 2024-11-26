const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
require('colors')

dotenv.config()
connectDB()

const app = express()

// Middleware to enable CORS.
// app.use(cors())

// Advanced CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://react-ts-material-product-manager.vercel.app',
    ], // // Allow local and production frontends (Vercel domain e.g.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// Middleware to parse JSON
app.use(express.json())
console.log('Middleware initialized'.cyan.bold)

// Import product routes
const productRoutes = require('./routes/productRoutes')
app.use('/api', productRoutes)

// --- or another approach where all route definitions in productRoutes will be relative (e.g., /, /:id).
// app.use('/api/products', productRoutes)

// Define a simple route
app.get('/', (req, res) => {
  res.send('API (Material Product Manager) is running...')
})

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.message.red)
  res.status(500).json({ message: 'Server Error' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold))

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
