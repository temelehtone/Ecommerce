import express from "express";

import { createCategory } from "../controllers/category.js"

const router = express.Router();


router.post("/createCategory", createCategory);

export default router