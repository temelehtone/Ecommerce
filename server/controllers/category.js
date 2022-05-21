import Category from "../models/Category.js"

export const createCategory = async (req, res) => {
    const { category } = req.body;
    
    try {
        const existingCategory = await Category.findOne({category})

        if (existingCategory) return res.status(400).json({ errorMessage: `Category ${category} already exists.` })

        const newCategory = await Category.create({ category });

        res.status(200).json({ successMessage: `Category ${newCategory.category} created successfully.`})

    } catch (error) {
        console.log("Category create error:", error);
        res.status(500).json({
            errorMessage: "Something went wrong, please try again later."
        })
    }
    
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({ categories: categories, errorMessage: 'Categories loaded successfully.' })
    } catch (error) {
        console.log("Category get error:", error);
        res.status(500).json({
            successMessage: "Something went wrong, please try again later."
        })
    }
}