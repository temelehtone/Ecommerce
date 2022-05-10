import express from "express";
import { signUpValidator, signInValidator, validatorResult } from "../middleware/validator.js";
import { createAccount, login } from "../controllers/auth.js";

const router = express.Router();


router.post("/createAccount", signUpValidator, validatorResult, createAccount);
router.post("/login", signInValidator, validatorResult, login);



export default router