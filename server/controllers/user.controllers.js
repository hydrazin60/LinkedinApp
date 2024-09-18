import User from "../models/userAuth.models.js";
import bcrypt from "bcrypt";

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
        message: "User already exists! Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 4);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: `Welcome ${newUser.name} to our community!`,
    });
  } catch (error) {
    console.log(`Register error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Register error: ${error.message}`,
    });
  }
};

 