import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function ProductList({
  products,
  fetchProducts,
  setEditProduct,
  addToCart,
}) {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      toast.success("🗑️ Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete product");
    }
  };

  const openImage = (imageUrl, productName) => {
    if (!imageUrl) return;

    setEnlargedImage({
      url: imageUrl,
      name: productName,
    });
  };

  const closeImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div id="products">
      {products.length === 0 ? (
        <div className="empty">
          <h2>No Products Found</h2>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            const imageUrl = product.image?.trim();

            return (
              <div
                className="product-card"
                key={product._id}
              >
                <div className="product-image-wrap">
                  <img
                    className="product-image"
                    src={
                      imageUrl ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={product.name}
                    onClick={() => openImage(imageUrl, product.name)}
                  />

                  {imageUrl && (
                    <span className="image-hint">Click to enlarge</span>
                  )}
                </div>

                <div className="product-content">
                  <h3>{product.name}</h3>

                  <p>
                    <strong>💰 Price :</strong> ₹ {product.price}
                  </p>

                  <p>
                    <strong>📂 Category :</strong> {product.category}
                  </p>

                  <p>
                    <strong>📝 Description :</strong>
                    <br />
                    {product.description}
                  </p>

                  <p className="created-date">
                    📅 Created :
                    {" "}
                    {product.createdAt
                      ? new Date(
                          product.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <div className="action-buttons">
                    <button
                      className="add-cart-btn"
                      onClick={() => {
                        if (addToCart) addToCart(product);
                        toast.success("🛒 Added to cart");
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => setEditProduct(product)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {enlargedImage && (
        <div
          className="image-lightbox"
          onClick={closeImage}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeImage}
            aria-label="Close image preview"
          >
            ×
          </button>

          <img
            src={enlargedImage.url}
            alt={enlargedImage.name}
            onClick={(e) => e.stopPropagation()}
          />

          <span className="lightbox-caption">
            {enlargedImage.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProductList;
