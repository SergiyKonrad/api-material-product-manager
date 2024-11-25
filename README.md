# API Material Product Manager

A REST API for managing product data, built using **Node.js**, **Express**, and **MongoDB**.

Explore the full project at [API Material Product Manager](https://mern-book-library-app.vercel.app/?????).

## Features

### CRUD Operations

- **`GET /api/products`**: Fetch all products.
- **`POST /api/product`**: Add a new product.
- **`PUT /api/product/:id`**: Update an existing product by ID.
- **`DELETE /api/product/:id`**: Delete a product by ID.

### Validation

- Backend validation for product fields (`name`, `description`, `price`, and `image`).
- Robust error handling ensures invalid data is not accepted.

- **Default Values**:

  - Automatically assigns a placeholder image URL (`https://via.placeholder.com/150`) if no image is provided.

- **CORS Enabled**:
- Cross-origin requests are enabled to allow seamless integration with frontend applications.

- **MongoDB Integration**:
  - Utilizes **Mongoose** for schema modeling and database interaction.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema modeling)
- **Dev Tools**: Nodemon, dotenv, colors

## Access the App -------

- The app is hosted on **Render**(https://mern-book-library-app.vercel.app/???).

### Endpoints

- **Fetch all products**:  
  [http://localhost:5000/api/products](http://localhost:5000/api/products)
- **Other CRUD operations**:  
  Replace `localhost:5000` with your deployment URL in the API routes above.

  ## Notes

- To clean up logs for production, comment out or remove `console.log` statements in the code.
- Ensure sensitive environment variables (e.g., `PORT`, `MONGO_URI`) are stored in a `.env` file and are **not committed** to version control. Add `.env` to your `.gitignore` file to keep it secure.

## Contributions

Contributions are welcome!

Feel free to:

- Open an issue for reporting bugs or suggesting new features.
- Submit a pull request to propose improvements or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
