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
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("stockflow_cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.warn("Failed to load saved cart", error);
      return [];
    }
  });

  // persist cart across refreshes
  useEffect(() => {
    try {
      localStorage.setItem("stockflow_cart", JSON.stringify(cart));
    } catch (error) {
      console.warn("Failed to save cart", error);
    }
  }, [cart]);

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

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ===========================
  // DASHBOARD
  // ===========================

  const totalValue = products.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
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
              className={activePage === "cart" ? "active" : ""}
              onClick={() => setActivePage("cart")}
              title="View cart"
            >
              🛒 Cart
              <span className="cart-count">{cart.length}</span>
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
              addToCart={addToCart}
            />

          </>
        )}

        {activePage === "cart" && (
          <div className="cart-page">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <div className="cart-summary-banner">
                <div className="cart-summary-item">
                  <span>Items</span>
                  <strong>{cart.length}</strong>
                </div>
                <div className="cart-summary-item">
                  <span>Total Value</span>
                  <strong>₹ {cartTotal}</strong>
                </div>
              </div>
            </div>

            {cart.length === 0 ? (
              <p className="cart-empty-text">Your cart is empty.</p>
            ) : (
              <div className="cart-list">
                {cart.map((item, idx) => (
                  <div className="cart-item" key={idx}>
                    {item.image && item.image.trim() ? (
                      <div className="cart-item-image-wrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-thumb"
                        />
                      </div>
                    ) : null}

                    <div className="cart-item-details">
                      <strong>{item.name}</strong>
                      <div className="cart-item-meta">₹ {item.price}</div>
                      <div className="cart-item-meta">
                        {item.category}
                      </div>
                    </div>

                    <button
                      className="remove-cart-btn"
                      onClick={() => removeFromCart(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="cart-total-card">
                  <div>
                    <p>Total Cart Value</p>
                    <strong>₹ {cartTotal}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="footer">
          © 2026 StockFlow. All Rights Reserved.
        </footer>

      </div>

    </div>
  );
}

export default App;