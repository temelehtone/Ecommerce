import mongoose from "mongoose";
import Category from "../models/Category.js"

export const createCategory = async (req, res) => {
    const { category } = req.body;
    
    try {
        const existingCategory = await Category.findOne({category})

        if (existingCategory) return res.status(400).json({ message: 'Category already exists.' })

        const newCategory = await Category.create({ category });

        res.status(200).json({ message: `Category ${newCategory.category} created successfully.`})

    } catch (error) {
        console.log("Category create error:", error);
        res.status(500).json({
            message: "Something went wrong, please try again later."
        })
    }
    
}