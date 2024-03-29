import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import filterRoutes from "./routes/filter.js";
import { MONGODB_URI } from "./config/keys.js"
import { PORT } from "./config/dev.js"



const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

// Routes
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/filter", filterRoutes);

// For production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));
