import express from "express";

import { createCategory, getCategories, getCategory } from "../controllers/category.js"
import { authenticateJWT } from "../middleware/authenticator.js";

const router = express.Router();


router.post("/createCategory", authenticateJWT, createCategory);
router.get("/getCategories", getCategories);
router.get("/getCategory/:categoryId", getCategory);

export default router