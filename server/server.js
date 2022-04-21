import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv"
import findConfig from "find-config";
import bodyParser from "body-parser";
import cors from "cors"

import authRoutes from "./routes/auth.js"

dotenv.config({ path: findConfig(".env") })

const app = express();


// Middleware
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/auth", authRoutes);

// Connect database
connectDB()

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
