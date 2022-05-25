import express from "express";

import { getNewArrivals } from "../controllers/filter.js"
import { authenticateJWT } from "../middleware/authenticator.js";

const router = express.Router();


router.get('/getNewArrivals', getNewArrivals)

export default router