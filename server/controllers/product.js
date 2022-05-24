import Product from "../models/Product.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQuantity,
  } = req.body;
  const { filename } = req.file;

  try {
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct)
      return res
        .status(400)
        .json({ errorMessage: `Product ${productName} already exists.` });

    const newProduct = await Product.create({
      fileName: filename,
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      productCategory: productCategory,
      productQuantity: productQuantity,
      productQuantity: productQuantity,
    });

    res.status(200).json({
      successMessage: `Product ${newProduct.productName} created successfully.`,
      product: newProduct,
    });
  } catch (error) {
    console.log("Product create error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate(
      "productCategory",
      "category"
    );
    res
      .status(200)
      .json({ products, successMessage: "Categories loaded successfully." });
  } catch (error) {
    console.log("Product get error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    
    const productId = req.params.productId;
    
    const product = await Product.findById(productId)
    res
      .status(200)
      .json({ product });
  } catch (error) {
    console.log("Product get error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    fs.unlink(`uploads/${deletedProduct.fileName}`, (err) => {
      if (err) throw err;
    });

    res.status(200).json({
      deletedProduct,
      successMessage: "Product deleted successfully.",
    });
  } catch (error) {
    console.log("Delete product error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    
    const productId = req.params.productId;
    req.body.fileName = req.file.filename;
    const oldProduct = await Product.findByIdAndUpdate(productId, req.body)
    fs.unlink(`uploads/${oldProduct.fileName}`, (err) => {
      if (err) throw err;
      
    })
       
    res
      .status(200)
      .json({ successMessage: "Product edited successfully." });

  } catch (error) {
    console.log("Product edit error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
}