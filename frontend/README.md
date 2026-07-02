# 📦 Product Management Dashboard

## Project Overview

The Product Management Dashboard is a full-stack MERN application developed to manage product information efficiently. The application allows users to perform complete CRUD (Create, Read, Update, Delete) operations through a responsive and user-friendly dashboard.

The project follows a client-server architecture where the React frontend communicates with the Node.js and Express backend using REST APIs, while MongoDB stores all product data permanently.

---

## Objectives

* Build a complete MERN Stack CRUD application.
* Learn REST API development.
* Integrate React with Express and MongoDB.
* Perform real-time product management.
* Create a responsive dashboard interface.

---

## Technologies Used

### Frontend

* React.js
* Vite
* Axios
* React Toastify
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* Dotenv

---

## Folder Structure

```
products-crud/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Features

* Add new products
* View all products
* Edit existing products
* Delete products
* Total inventory value
* Toast notifications
* Responsive dashboard
* Modern UI design
* MongoDB database integration

---

## Project Workflow

1. User opens the Product Dashboard.
2. User enters product details.
3. React validates the input fields.
4. Axios sends the request to the backend.
5. Express receives the request.
6. Controller processes the request.
7. Mongoose interacts with MongoDB.
8. Product data is stored in the database.
9. Updated product list is returned.
10. React automatically refreshes the dashboard.

---

## Implementation

### Create Product

Users can add a product by entering:

* Product Name
* Price
* Category
* Description
* Image url
The data is validated before being saved to MongoDB.

### Read Products

All products are fetched using a GET API request and displayed as responsive product cards on the dashboard.

### Update Product

Clicking the Edit button loads the selected product into the form. Users can modify the details and save the changes, which updates the record in MongoDB.

### Delete Product

The Delete button removes the selected product from both the dashboard and the database.

---

## REST API Endpoints

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/products`     | Create a new product  |
| GET    | `/api/products`     | Retrieve all products |
| PUT    | `/api/products/:id` | Update a product      |
| DELETE | `/api/products/:id` | Delete a product      |

---

## Database Schema

Each product contains the following fields:

* Name
* Price
* Category
* Description
* Image URL
* Created Date

MongoDB stores the product information using a Mongoose schema.

---

## Advantages

* Easy to understand project structure
* Clean and responsive interface
* Modular React components
* RESTful API architecture
* MongoDB integration
* Reusable backend controllers
* Beginner-friendly code organization

---


## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Local Development

Frontend:

`http://localhost:5174`

Backend:

`http://localhost:5000`

---

## Conclusion

This StockFlow Dashboard demonstrates the complete implementation of a MERN Stack CRUD application. It showcases frontend development with React, backend API development with Express, database integration using MongoDB, and efficient communication through REST APIs. The project follows a modular structure, making it easy to maintain, extend, and understand while serving as a strong foundation for more advanced inventory or e-commerce management systems.
