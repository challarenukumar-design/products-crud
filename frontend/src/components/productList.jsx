import API from "../services/api";

function ProductList({ products, fetchProducts }) {
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h2>Product List</h2>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>

            <p>Price: ₹{product.price}</p>

            <p>Category: {product.category}</p>

            <p>{product.description}</p>

            <button onClick={() => deleteProduct(product._id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;