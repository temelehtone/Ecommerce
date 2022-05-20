import express from "express";

import { createCategory } from "../controllers/category.js"
import { authenticateJWT } from "../middleware/authenticator.js";

const router = express.Router();


router.post("/createCategory", authenticateJWT, createCategory);

export default router