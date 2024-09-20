import express from "express";
import {
  Login,
  Register,
  verifyEmail,
} from "../controllers/user.controllers.js";

const userRoute = express.Router();

userRoute.post("/register", Register);
userRoute.get("/verify/:token", verifyEmail);
userRoute.post("/login", Login);

export default userRoute;
