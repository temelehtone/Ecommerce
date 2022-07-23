import Category from "../models/Category.js"

export const createCategory = async (req, res) => {
    const { category } = req.body;
    
    try {
        const existingCategory = await Category.findOne({category})

        if (existingCategory) return res.status(400).json({ errorMessage: `Category ${category} already exists.` })

        const newCategory = await Category.create({ category });

        res.status(200).json({ successMessage: `Category ${newCategory.category} created successfully.`, category: newCategory })

    } catch (error) {
        console.log("Category create error:", error);
        res.status(500).json({
            errorMessage: "SOMETHING_WENT_WRONG"
        })
    }
    
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({ categories: categories, successMessage: 'Categories loaded successfully.' })
    } catch (error) {
        console.log("Categories get error:", error);
        res.status(500).json({
            errorMessage: "SOMETHING_WENT_WRONG"
        })
    }
}

export const getCategory = async (req, res) => {

    const categoryId = req.params.categoryId;

    try {
        const category = await Category.findById(categoryId)
        res.status(200).json({ category , successMessage: 'Category loaded successfully.' })
    } catch (error) {
        console.log("Category get error:", error);
        res.status(500).json({
            errorMessage: "SOMETHING_WENT_WRONG"
        })
    }
}