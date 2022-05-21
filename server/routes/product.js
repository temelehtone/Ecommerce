import express from "express";

import { createProduct } from "../controllers/product.js"
import { authenticateJWT } from "../middleware/authenticator.js";
import { upload } from "../middleware/multer.js"

const router = express.Router();


router.post("/createProduct", authenticateJWT, upload.single('productImage'), createProduct);
// router.get("/getProducts", authenticateJWT, getCategories);

export default router