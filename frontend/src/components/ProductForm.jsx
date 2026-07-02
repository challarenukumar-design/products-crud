import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function ProductForm({
  fetchProducts,
  editProduct,
  setEditProduct,
}) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editProduct) {
      setProduct({
        name: editProduct.name,
        price: editProduct.price,
        category: editProduct.category,
        description: editProduct.description,
        image: editProduct.image || "",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      toast.info("✏️ Edit Mode Enabled");
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: product.name.trim(),
      price: product.price,
      category: product.category.trim(),
      description: product.description.trim(),
      image: product.image.trim(),
    };

    if (
      !payload.name ||
      !payload.price ||
      !payload.category ||
      !payload.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editProduct) {
        await API.put(
          `/products/${editProduct._id}`,
          payload
        );

        toast.success("✅ Product Updated");

        setEditProduct(null);
      } else {
        await API.post(
          "/products",
          payload
        );

        toast.success("✅ Product Added");
      }

      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  const imagePreview = product.image.trim();

  return (
    <div className="form-card">
      <h2 className="form-title">
        {editProduct ? "Update Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>Product Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <label>Price</label>

        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={product.price}
          onChange={handleChange}
        />

        <label>Category</label>

        <input
          type="text"
          name="category"
          placeholder="Enter Category"
          value={product.category}
          onChange={handleChange}
        />

        <label>Description</label>

        <textarea
          name="description"
          placeholder="Enter Description"
          value={product.description}
          onChange={handleChange}
        />

        <label>Image URL</label>

        <input
          type="url"
          name="image"
          placeholder="Paste Image URL (https://...)"
          value={product.image}
          onChange={handleChange}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="preview-image"
            onClick={() =>
              setPreviewImage({
                url: imagePreview,
                name: product.name || "Product preview",
              })
            }
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <button type="submit">
          {editProduct
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      {previewImage && (
        <div
          className="image-lightbox"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setPreviewImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>

          <img
            src={previewImage.url}
            alt={previewImage.name}
            onClick={(e) => e.stopPropagation()}
          />

          <span className="lightbox-caption">
            {previewImage.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProductForm;