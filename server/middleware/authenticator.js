import jwt from "jsonwebtoken"

import { JWT_SECRET_KEY } from "../config/keys.js"

export const authenticateJWT = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token. Authorization denied"});
    

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        req.user = decoded.user;

        next();
    } catch (error) {
        console.log(error)
        res.status(401).sjon({ message: "Invalid token." })
    }

    
}