import express from "express";
import { Register, verifyEmail } from "../controllers/user.controllers.js";

const userRoute = express.Router();

userRoute.post("/register", Register);
userRoute.get("/verify/:token", verifyEmail);

export default userRoute;
