import express from "express";

import { getNewArrivals, searchProducts } from "../controllers/filter.js"

const router = express.Router();


router.get('/getNewArrivals', getNewArrivals)
router.get('/searchProducts', searchProducts)

export default router