const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const statusRoute = require('./routes/statusRoute')
require('colors')

dotenv.config()
connectDB()

const app = express()

// Use Helmet for security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for development
    crossOriginEmbedderPolicy: false, // Disable COEP for compatibility
  }),
)

// Logging Middleware for debugging purpose

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
    ], // Allow local and production frontends (Vercel domain e.g.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// Middleware to parse JSON
app.use(express.json())
console.log('Middleware initialized'.cyan.bold)

// Routes
const productRoutes = require('./routes/productRoutes')
app.use('/api', productRoutes)
app.use('/', statusRoute)

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.message.red)
  res.status(500).json({ message: 'Server Error' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold))

// --- or another approach where all route definitions in productRoutes will be relative (e.g., /, /:id) ---
// app.use('/api/products', productRoutes)

// --- Catch-all for undefined routes
// app.use('*', (req, res) => {
//   res.status(404).send('Route not found');
// });
