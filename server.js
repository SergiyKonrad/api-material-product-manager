const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const statusRoute = require('./routes/statusRoute')
const productRoutes = require('./routes/productRoutes')
require('colors')

dotenv.config()
connectDB()

const app = express()

// Trust proxy for accurate client IP detection.
app.set('trust proxy', 1) // Enable trust for the first proxy in the chain (e.g., Render's reverse proxy)

// Use Helmet for security headers
app.use(
    helmet({
        contentSecurityPolicy: false, // Disable CSP for development
        crossOriginEmbedderPolicy: false, // Disable COEP for compatibility
    }),
)

// Advanced CORS configuration
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://react-ts-material-product-manager.vercel.app',
        ], // Allow local and production frontends (Vercel domain e.g.)
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // Include credentials (cookies, authorization headers, etc.)
    }),
)

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
})

// Apply the limiter to all routes
app.use(limiter)

// Middleware to parse JSON
app.use(express.json())
console.log('Middleware initialized'.cyan.bold)

// Routes

app.use('/api', productRoutes) // API routes for products
app.use('/', statusRoute) // Status route for health check or homepage

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.message.red)
    res.status(500).json({ message: 'Server Error' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold))

// --- Another approach where all route definitions in productRoutes will be relative (e.g., /, /:id) ---
// app.use('/api/products', productRoutes)

// --- Optional: Catch-all for undefined routes ---
// app.use('*', (req, res) => {
//   res.status(404).send('Route not found');
// });

// --- Optional: Logging Middleware for debugging purposes ---
// app.use((req, res, next) => {
//   console.log(
//     `Request received: ${req.method} ${req.originalUrl} from ${req.ip}`,
//   );
//   next();
// });
