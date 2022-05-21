import Product from "../models/Product.js";

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
        .json({ message: `Product ${productName} already exists.` });

    const newProduct = await Product.create({
      fileName: filename,
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      productCategory: productCategory,
      productQuantity: productQuantity,
      productQuantity: productQuantity,
    });

    res
      .status(200)
      .json({
        message: `Product ${newProduct.productName} created successfully.`,
        newProduct
      });
  } catch (error) {
    console.log("Product create error:", error);
    res.status(500).json({
      message: "Something went wrong, please try again later.",
    });
  }
};
