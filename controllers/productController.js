// logic for handling requests
const Product = require('../models/productModel')

// @desc    Get all products
// @route   GET /products
// @access  Public
const getProducts = async (req, res) => {
  console.log('GET /products triggered')
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error })
  }
}

// @desc    Create a new product
// @route   POST /product
// @access  Public
const createProduct = async (req, res) => {
  const { name, description, price } = req.body

  // Validation
  if (!name || !description || !price) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const product = new Product({ name, description, price })
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error })
  }
}

// @desc    Update a product
// @route   PUT /product/:id
// @access  Public
const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, price } = req.body

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true, runValidators: true },
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error })
  }
}

// @desc    Delete a product
// @route   DELETE /product/:id
// @access  Public
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error })
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
