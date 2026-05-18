import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import { generateToken } from "../utils/generateToken";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user._id.toString());

    res.json({
      token,
      user
    });
  } catch (error: any) {
  console.log("LOGIN ERROR:", error);

  res.status(500).json({
    message: "Server Error",
    error: error.message
  });

  }
};