import Product from "../models/Product.js"

export const createProduct = async (req, res) => {
    const { image, name, description, price, category, quantity } = req.body;
    
    try {
        console.log(name, description, price, category, quantity)
        res.status(200).json({ message: 'Product created successfully.'})
    } catch (error) {
        console.log("Product create error:", error);
        res.status(500).json({
            message: "Something went wrong, please try again later."
        })
    }
    
}