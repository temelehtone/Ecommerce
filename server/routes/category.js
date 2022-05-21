import express from "express";

import { createCategory, getCategories } from "../controllers/category.js"
import { authenticateJWT } from "../middleware/authenticator.js";

const router = express.Router();


router.post("/createCategory", authenticateJWT, createCategory);
router.get("/getCategories", authenticateJWT, getCategories);

export default router