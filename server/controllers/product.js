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

    res
      .status(200)
      .json({
        successMessage: `Product ${newProduct.productName} created successfully.`,
        product: newProduct
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
      const products = await Product.find({}).populate('productCategory', 'category');
      res.status(200).json({ products, successMessage: 'Categories loaded successfully.' })
  } catch (error) {
      console.log("Product get error:", error);
      res.status(500).json({
          errorMessage: "Something went wrong, please try again later."
      })
  }
}
