# API Material Product Manager

A REST API for managing product data, built using **Node.js**, **Express**, and **MongoDB**.

Explore the full project at [React TS Material Product Manager](https://react-ts-material-product-manager.vercel.app/).

## Features

### CRUD Operations

- **`GET /api/products`**: Fetch all products.
- **`POST /api/product`**: Add a new product.
- **`PUT /api/product/:id`**: Update an existing product by ID.
- **`DELETE /api/product/:id`**: Delete a product by ID.

### Security Features

- **Trust Proxy**: Configured for accurate client IP detection behind a reverse proxy (e.g., Render).
- **Rate Limiting**: Limits requests to prevent abuse and ensure server stability.
- **CORS Enabled**: Allows cross-origin requests for seamless integration with frontend applications.
- **Helmet Integration**: Enhances API security by setting secure HTTP headers.

### Validation

- Backend validation for product fields (`name`, `description`, `price`, and `image`).
- Robust error handling ensures invalid data is not accepted.

### MongoDB Integration

- Utilizes **Mongoose** for schema modeling and database interaction.
- Automatically assigns a placeholder image URL (`https://via.placeholder.com/150`) if no image is provided.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema modeling)
- **Dev Tools**: Nodemon, dotenv, colors

## Access the App

The app is hosted on **Render**:  
[https://api-material-product-manager.onrender.com](https://api-material-product-manager.onrender.com)

### Endpoints

- **Fetch all products**:  
   [https://api-material-product-manager.onrender.com/api/products](https://api-material-product-manager.onrender.com/api/products)  
   Open this endpoint in your browser to retrieve all products as JSON.

  ### Security Note

  This API is publicly accessible. Ensure proper authentication and validation when using or extending the API. Avoid exposing sensitive data and secure your environment variables.

## Notes

- **Logs**: For production, clean up logs by commenting out or removing `console.log` statements.
- **Environment Variables**: Store sensitive environment variables (e.g., `PORT`, `MONGO_URI`) in a `.env` file. Add `.env` to your `.gitignore` file to keep it secure.

## Contributions

Contributions are welcome!

Feel free to:

- Open an issue for reporting bugs or suggesting new features.
- Submit a pull request to propose improvements or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
