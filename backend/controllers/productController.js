const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      image,
    } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      category,
      description,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 👇 Add this
module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};