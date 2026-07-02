import { useEffect, useState } from "react";
import "./App.css";
import API from "./services/api";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {

  // ===========================
  // STATES
  // ===========================

  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [activePage, setActivePage] = useState("home");

  // ===========================
  // FETCH PRODUCTS
  // ===========================

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

  // ===========================
  // SEARCH
  // ===========================

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (value) => {
    setSearch(value);

    if (value.trim()) {
      setActivePage("products");
    }
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  // ===========================
  // DASHBOARD
  // ===========================

  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  return (
    <div className="app">

      {/* ===========================
            NAVBAR
      ============================ */}

      <div className={`nav-wrapper ${showSearch ? "search-open" : ""}`}>

        <nav className="navbar">

          <h2>📦 StockFlow</h2>

          <div className="nav-links">

            <button
              className={activePage === "home" ? "active" : ""}
              onClick={() => setActivePage("home")}
            >
              🏠 Home
            </button>

            <button
              className={activePage === "products" ? "active" : ""}
              onClick={() => setActivePage("products")}
            >
              📦 Products
            </button>

            <button
              type="button"
              className={`search-toggle ${showSearch ? "active" : ""}`}
              onClick={toggleSearch}
              aria-label="Toggle search"
              title="Search products"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="search-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
            </button>

          </div>

        </nav>

        {showSearch && (
          <div className="search-panel">
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              autoFocus
            />
          </div>
        )}

      </div>

      <div className="container">

        {/* ===========================
              HOME PAGE
        ============================ */}

        {activePage === "home" && (
          <>

            <div className="stats">

              <div className="stat-card">

                <h3>💰 Total Inventory Value</h3>

                <h2>₹ {totalValue}</h2>

              </div>

            </div>

            <ProductForm
              fetchProducts={fetchProducts}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
            />

          </>
        )}

        {/* ===========================
              PRODUCTS PAGE
        ============================ */}

        {activePage === "products" && (
          <>
            <ProductList
              products={filteredProducts}
              fetchProducts={fetchProducts}
              setEditProduct={(product) => {
                setEditProduct(product);
                setActivePage("home");
              }}
            />

          </>
        )}

        <footer className="footer">
          © 2026 StockFlow. All Rights Reserved.
        </footer>

      </div>

    </div>
  );
}

export default App;