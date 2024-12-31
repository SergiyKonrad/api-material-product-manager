const express = require('express')
const router = express.Router()

// Status route
router.get('/', (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send(
            'An error occurred while rendering the status page.',
        )
    }
})

module.exports = router
