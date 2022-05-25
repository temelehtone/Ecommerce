import Product from "../models/Product.js";

export const getNewArrivals = async (req, res) => {

    const sortBy = req.query.sortBy ? req.query.sortBy : 'desc';
    const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(3);

    console.log(limit)

    try {
    
        const newArrivals = await Product.find({}).sort({ createdAt: sortBy }).limit(limit)

      res
        .status(200)
        .json({ newArrivals, successMessage: "New Arrivals loaded successfully." });
    } catch (error) {
      console.log("GetNewArrivals error:", error);
      res.status(500).json({
        errorMessage: "Something went wrong, please try again later.",
      });
    }
  };