import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv"
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") })

const app = express();

connectDB()

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
