

export const createCategory = async (req, res) => {
    const { category } = req.body;
    
    res.status(200).json({category, message: "Working"})
    
}