const express = require('express')
const router = express.Router()

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')

// GET (fetches) all products
router.get('/products', getProducts)

// POST (creates) a new product
router.post('/product', createProduct)

// PUT (update) a product by ID
router.put('/product/:id', updateProduct)

// DELETE a product by ID
router.delete('/product/:id', deleteProduct)

module.exports = router
