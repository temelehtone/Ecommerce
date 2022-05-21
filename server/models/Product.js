import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    
}, { timestamps: true })

export default mongoose.model('Product', productSchema)