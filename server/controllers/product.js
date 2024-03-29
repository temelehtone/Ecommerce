import Product from "../models/Product.js";
import Category from "../models/Category.js";
import fs from "fs";
import { getCategory } from "./category.js"

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
      errorMessage: "SOMETHING_WENT_WRONG",
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
      errorMessage: "SOMETHING_WENT_WRONG",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    
    const productId = req.params.productId;
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
    const product = await Product.findById(productId)
    res
      .status(200)
      .json({ product });
    } else {
      res.status(404).json({ errorMessage: "PRODUCT_NOT_FOUND" }); 
    }
  } catch (error) {
    console.log("Product get error:", error);
    res.status(500).json({
      errorMessage: "SOMETHING_WENT_WRONG",
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    
    const categoryId = req.params.categoryId;
    if (categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      const products = await Product.find({ productCategory: categoryId })
    
    res
      .status(200)
      .json({ products });
    }
    else {
      res.status(404).json({ errorMessage: "Product category not found." });
    }

    
  } catch (error) {
    console.log("Product getProductsByCategory error:", error);
    res.status(500).json({
      errorMessage: "SOMETHING_WENT_WRONG",
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
      successMessage: "PRODUCT_DELETED",
    });
  } catch (error) {
    console.log("Delete product error:", error);
    res.status(500).json({
      errorMessage: "SOMETHING_WENT_WRONG",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    
    const productId = req.params.productId;

    if (req.file !== undefined) {
      req.body.fileName = req.file.filename;
    }

    
    const oldProduct = await Product.findByIdAndUpdate(productId, req.body)
    if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
      fs.unlink(`uploads/${oldProduct.fileName}`, (err) => {
        if (err) throw err;
        
      })
    }
    
       
    res
      .status(200)
      .json({ successMessage: "PRODUCT_EDITED" });

  } catch (error) {
    console.log("Product edit error:", error);
    res.status(500).json({
      errorMessage: "SOMETHING_WENT_WRONG",
    });
  }
}