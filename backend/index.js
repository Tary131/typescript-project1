import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";
import logger from "./logger.js";
import router from "./routes/authRoute.js";


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use('/books', bookRoute);
app.use('/auth', router);

// Database connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        logger.info("App connected to DB");
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error("Error connecting to database:", err.message);
        process.exit(1);
    });

