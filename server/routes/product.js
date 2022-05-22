import express from "express";

import { createProduct, getProducts, deleteProduct } from "../controllers/product.js"
import { authenticateJWT } from "../middleware/authenticator.js";
import { upload } from "../middleware/multer.js"

const router = express.Router();


router.post("/createProduct", authenticateJWT, upload.single('productImage'), createProduct);
router.get("/getProducts", getProducts);
router.delete("/deleteProduct/:productId", authenticateJWT, deleteProduct);

export default router