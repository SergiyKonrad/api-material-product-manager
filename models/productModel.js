// the MongoDB schema for the Product collection.

const mongoose = require('mongoose')

// Product Schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            match: /^[a-zA-Z0-9.,!'+\- ]{1,50}$/,
            // match: /^[\w.,!\- ]{1,30}$/, // Another updated regex for validation
            trim: true,
            maxlength: [50, 'Product name must not exceed 50 characters'],
        },

        description: {
            type: String,
            required: [true, 'Product description is required'],
            match: /^[a-zA-Z0-9.,!'+\-\n ]{1,200}$/,
            trim: true,
            maxlength: [200, 'Description must not exceed 200 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price must be at least 0'],
            max: [9999, 'Price must not exceed 9999'], // Matches the regex pattern for a 4-digit number

            // validate: {
            //   validator: (value) => /^[0-9]{1,4}$/.test(value.toString()),
            //   message: 'Price must be a numeric value with up to 4 digits',
            // },
        },
        image: {
            type: String,
            // required: [true],
            default: 'https://via.placeholder.com/150?text=No+Image+Available', // Default image URL
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    },
)

// Create and export the Product model
module.exports = mongoose.model('Product', productSchema)
