const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
require('colors')

dotenv.config()
connectDB()

const app = express()

// **Logging Middleware**
// app.use((req, res, next) => {
//   console.log(
//     `Request received: ${req.method} ${req.originalUrl} from ${req.ip}`,
//   )
//   next()
// })

// Rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
})

// the limiter is applied to all routes
app.use(limiter)

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
  const spinnerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Status</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f9fafb;
          color: #2c3e50;
        }
        .spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 15px;
        }
        .spinner {
          border: 4px solid #e5e5e5;
          // border-top: 4px solid #4caf50; /* Green spinner */
          border-top: 4px solid #007bff; /* Blue spinner */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .status {
          font-size: 18px;
          font-weight: bold;
          color: #007bff; /* Blue text */
        }
        @media (max-width: 768px) {
          .status {
            font-size: 16px; /* Smaller font for tablets */
          }
        }
        @media (max-width: 480px) {
          .status {
            font-size: 14px; /* Smaller font for mobile phones */
          }
        }
      </style>
    </head>
    <body>
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="status">API (Material Product Manager) is running...</div>
      </div>
    </body>
    </html>
  `
  res.send(spinnerHTML)
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
app.use(express.json()); // Parse JSON requests

// Import product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes); // Use '/api' as the base route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green.bold));
*/
