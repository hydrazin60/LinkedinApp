import User from "../models/userAuth.models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(409).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered! Please login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    await newUser.save();
    await sendVerificationEmail(newUser.email, newUser.verificationToken);
    return res.status(201).json({
      success: true,
      message: `Registered successfully! Please verify your email. Click on the link sent to your email.`,
    });
  } catch (error) {
    console.log(`Register error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Register error: ${error.message}`,
    });
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      text: `Click on the link to verify your email: http://localhost:4000/linkdinapp/api/v1/user/verify/${verificationToken}`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending the verification email:", error.message);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.verified = true;
    user.verificationToken = "";
    await user.save();
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name}, your email is verified.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Email verification failed: ${error.message}`,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please register",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password does not match!",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(`Login failed: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Login failed: ${error.message}`,
    });
  }
};
