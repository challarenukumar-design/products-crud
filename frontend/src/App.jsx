import { useEffect, useState } from "react";
import "./App.css";
import API from "./services/api";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Product CRUD Application</h1>

      <ProductForm fetchProducts={fetchProducts} />

      <hr />

      <ProductList
        products={products}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default App;