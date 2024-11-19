// logic for handling requests
const Product = require('../models/productModel')

// const getProducts = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit, 10) || 5
//     const products = await Product.find().limit(limit)

//     console.log(`GET /products - Retrieved ${products.length} products`)
//     res.status(200).json(products)
//   } catch (error) {
//     console.error('Error fetching products:', error.message)
//     res
//       .status(500)
//       .json({ message: 'Failed to fetch products', error: error.message })
//   }
// }

const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5 // Default limit
  const offset = parseInt(req.query.offset, 10) || 0 // Default offset

  try {
    const products = await Product.find().skip(offset).limit(limit)
    console.log(`GET /products - Retrieved ${products.length} products`)
    res.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error.message)
    res
      .status(500)
      .json({ message: 'Failed to fetch products', error: error.message })
  }
}

// @route   POST /product
const createProduct = async (req, res) => {
  // console.log('POST /product endpoint triggered');
  const { name, description, price } = req.body

  // Validation
  if (!name?.trim() || !description?.trim() || !price) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      price,
    })
    const savedProduct = await product.save()

    console.log('POST /product - Product created:', savedProduct)
    res.status(201).json(savedProduct)
  } catch (error) {
    console.error('Error creating product:', error.message)
    res
      .status(500)
      .json({ message: 'Failed to create product', error: error.message })
  }
}

// @route   PUT /product/:id
const updateProduct = async (req, res) => {
  // console.log(`PUT /product/${req.params.id} endpoint triggered`);
  const { id } = req.params
  const { name, description, price } = req.body

  // Validation
  if (!name?.trim() || name.length < 3 || name.length > 50) {
    return res
      .status(400)
      .json({ message: 'Name must be between 3 and 50 characters' })
  }
  if (
    !description?.trim() ||
    description.length < 10 ||
    description.length > 200
  ) {
    return res
      .status(400)
      .json({ message: 'Description must be between 10 and 200 characters' })
  }
  if (price === undefined || price <= 0 || price > 10000) {
    return res
      .status(400)
      .json({ message: 'Price must be greater than 0 and less than 10000' })
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name: name.trim(), description: description.trim(), price },
      { new: true, runValidators: true },
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    console.log('PUT /product/:id - Product updated:', updatedProduct)
    res.status(200).json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error.message)
    res
      .status(500)
      .json({ message: 'Failed to update product', error: error.message })
  }
}

// @route   DELETE /product/:id
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    console.log('DELETE /product/:id - Product deleted:', deletedProduct)
    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error.message)
    res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message })
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
