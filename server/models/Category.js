import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    }
}, { timestamps: true })

export default mongoose.model('Category', categorySchema)
