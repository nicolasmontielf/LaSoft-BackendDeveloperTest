import express from "express";
import logger from "morgan";
import * as path from "path";
import dotenv from "dotenv"
import connectToMongoDB from "./database/connection"

// Initialize dotenv and database connection
dotenv.config()
connectToMongoDB()

// Routes
import { index } from "./routes/index";

// Create Express server
const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", index);

app.listen(port, onListening);
app.on("error", onError);

function onError (error: any) {
    throw error;
};

function onListening() {
    console.log(`Listening on ${port}`);
}