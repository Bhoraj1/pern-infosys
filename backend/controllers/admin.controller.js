import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.connect.js";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // console.log("Admin Details:", req.body);

    if (!username || !password || !email) {
      return next(errorHandler(400, "All fields are required"));
    }

    const checkResult = await db.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(400).send("Email already exists. Try logging in.");
    }

    const hashedPassword = bcryptjs.hashSync(password, 7);
    const result = await db.query(
      "INSERT INTO admin(username, email, password) VALUES($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    // console.log(result.rows);
    res.status(201).send("User registered successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const result = await db.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found.");
    }
    const user = result.rows[0];
    const storedHashPassword = user.password;
    const isPasswordMatch = await bcryptjs.compareSync(
      password,
      storedHashPassword
    );
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "90d",
        }
      );
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 90 * 24 * 60 * 60 * 1000,
      });
      const { password, ...userWithoutPassword } = user;
      res.json({
        message: "Login Successfully !",
        user: userWithoutPassword,
      });
    } else {
      res.status(401).send("Incorrect Password.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("An error occurred while logging in.");
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
