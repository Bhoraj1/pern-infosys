import adminModel from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  // console.log("Admin Details:", req.body);

  if (!username || !password || !email) {
    return next(errorHandler(400, "Username and password are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const admin = new adminModel({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await admin.save();
    res.json("Signup succesful");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validAdmin = await adminModel.findOne({ email });
    if (!validAdmin) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      { id: validAdmin._id, isAdmin: validAdmin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );
    const { password: pass, ...rest } = validAdmin._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// console.log("Generated Token:", token);
export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully signed out" });
  } catch (error) {
    next(error);
  }
};
