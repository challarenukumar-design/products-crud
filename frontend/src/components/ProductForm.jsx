import { useState } from "react";
import API from "../services/api";

function ProductForm({ fetchProducts }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.description
    ) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/products", product);

      alert("Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        ></textarea>

        <br />
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;