import Product from "../models/Product.js";

export const getNewArrivals = async (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "desc";
  const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(3);

  try {
    const newArrivals = await Product.find({})
      .sort({ createdAt: sortBy })
      .limit(limit);

    res
      .status(200)
      .json({
        newArrivals,
        successMessage: "New Arrivals loaded successfully.",
      });
  } catch (error) {
    console.log("GetNewArrivals error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
};

export const searchProducts = async (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : "desc";
  const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(5);
  const searchTerm = req.query.searchTerm ? req.query.searchTerm : "";
 
  if (searchTerm === "")
    return res
      .status(204)
      .json({ searchResults: {}, successMessage: "No Content." });

  try {
  const searchResults = await Product.find({ "productName": { $regex: searchTerm, $options: 'i' } })
      .sort({ createdAt: sortBy })
      .limit(limit);
    console.log(searchResults.length);
    res
      .status(200)
      .json({
        searchResults,
        successMessage: "Search results loaded successfully.",
      });
  } catch (error) {
    console.log("SearchProducts error:", error);
    res.status(500).json({
      errorMessage: "Something went wrong, please try again later.",
    });
  }
};
