import express from "express";

import { createProduct } from "../controllers/product.js"
import { authenticateJWT } from "../middleware/authenticator.js";

const router = express.Router();


router.post("/createProduct", authenticateJWT, createProduct);
// router.get("/getProducts", authenticateJWT, getCategories);

export default router