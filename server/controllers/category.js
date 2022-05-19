

export const createCategory = async (req, res) => {
    const { category } = req.body;
    setTimeout(() => res.status(200).json({category, message: "Working"}), 5000)
    
}