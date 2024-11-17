const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const colors = require('colors')

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware to parse JSON
app.use(express.json())

// Import product routes
const productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

// Define a simple route
app.get('/', (req, res) => {
  res.send('API is running...')
})

// Error handling middleware (optional, for better error responses)
app.use((err, req, res, next) => {
  console.error(err.message.red)
  res.status(500).json({ message: 'Server Error' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold))

// Minimalistic and straight to the point version.
// Easier to read for a smaller project without extra functionality like error handling.
/*
const express = require('express')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
require('colors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

// Middleware
app.use(express.json())


app.use('/api', productRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green.bold))
*/
