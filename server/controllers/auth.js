import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import express from 'express';

import { JWT_SECRET_KEY, JWT_EXPIRE } from '../config/keys.js'
import User from "../models/user.js"

const router = express.Router();


export const createAccount = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body 

    try {
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({ errorMessage: "User already exist." })

        if (password !== confirmPassword) return res.status(400).json({ errorMessage: "Passwords don't match" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email: email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({ user: {id: result._id} }, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRE })

        res.status(200).json({result: { _id: result._id, email: result.email, role: result.role, name: result.name }, token, successMessage: "Signed Up Succesfully!" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong." });
    }
    
}
export const login = async (req, res) => {
    
    const { password, email } = req.body;
    try {
        const existingUser = await User.findOne({email})
        if (!existingUser) return res.status(404).json({ errorMessage: "Invalid credentials." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({errorMessage: "Invalid credentials."})

        const token = jwt.sign({ user: {id: existingUser._id} }, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRE })

        res.status(200).json({result: { _id: existingUser._id, email: existingUser.email, role: existingUser.role, name: existingUser.name }, token })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ errorMessage: "Something went wrong." });
    }
    
}

export default router;