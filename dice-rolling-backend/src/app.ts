import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressValidator from "express-validator";
dotenv.config();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const diceRoutes = require("./routes/dice");

const app: Application = express();
const port = process.env.PORT || 3000;
const db: string = process.env.DATABASE!;

/**
 * TODO LIST:
 * 1. Create CRUD for dice presets
 * 2. When we throw the cubes - calculate which hand is stronger
 * Then for the current user (Ryan) push a new object that represent the history:
 * {value: 1-6, isVictory: boolean}
 *
 */

mongoose.connect(db);
mongoose.connection.once("open", (_) => {
  console.log("Database connected:", db);
});

mongoose.connection.on("error", (err) => {
  console.error("connection error:", err);
});

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", diceRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
