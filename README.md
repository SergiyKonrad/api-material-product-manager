# API Material Product Manager

A REST API for managing product data, built using **Node.js**, **Express**, and **MongoDB**.

Explore the full project at [API Material Product Manager](https://mern-book-library-app.vercel.app/?????).

## Features

- **CRUD Operations**:

  - `GET /api/products`: Fetch all products.
  - `POST /api/product`: Add a new product.
  - `PUT /api/product/:id`: Update an existing product by ID.
  - `DELETE /api/product/:id`: Delete a product by ID.

- **Validation**:

  - Backend validation for product fields (name, description, price, and image).
  - Ensures robust error handling for invalid data.

- **Default Values**:

  - Automatically assigns a placeholder image URL if none is provided.

- **CORS Enabled**:

  - Allows cross-origin requests for frontend integration.

- **MongoDB Integration**:
  - Utilizes **Mongoose** for schema modeling and database interaction.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema modeling)
- **Dev Tools**: Nodemon, dotenv, colors

## Access the App -------

- The app is hosted on **Render**(https://mern-book-library-app.vercel.app/???).
- To fetch all products, access the endpoint: [http://localhost:5000/api/products](http://localhost:5000/api/products).

## Contributions

This README provides a clear overview for potential collaborators or users. Customize details as needed to fit your specific project setup and requirements.

Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
