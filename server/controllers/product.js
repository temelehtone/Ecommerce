import Product from "../models/Product.js"

export const createProduct = async (req, res) => {
    const { productName, productDescription, productPrice, productCategory, productQuantity } = req.body;
    const productImage = req.file;

    

    try {
        
        res.status(200).json({ message: 'Product created successfully.'})
    } catch (error) {
        console.log("Product create error:", error);
        res.status(500).json({
            message: "Something went wrong, please try again later."
        })
    }
    
}