import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.routes.js";
import User from "./models/userAuth.models.js";
import { verifyEmail } from "./controllers/user.controllers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/linkdinapp/api/v1/user", userRoute);

 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
