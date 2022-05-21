import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 60,
    },
    productDescription: {
        type: String,
        trim: true,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)