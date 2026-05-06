import { Request, Response } from "express";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { generateToken } from "../utils/generateToken";
import { sendSuccess } from "../utils/sendResponse";

const toSafeUser = (user: {
  _id: unknown;
  name: string;
  email: string;
  image?: string;
  provider: string;
  createdAt: Date;
}) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  image: user.image,
  provider: user.provider,
  createdAt: user.createdAt,
});

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Name, email, and password are required", 400);
    }

    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("A user with this email already exists", 409);
    }

    const user = await User.create({
      name,
      email,
      password,
      image,
      provider: "credentials",
    });

    sendSuccess(
      res,
      201,
      "User registered successfully",
      {
        user: toSafeUser(user),
        token: generateToken(user.id),
      },
    );
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  sendSuccess(res, 200, "User logged in successfully", {
    user: toSafeUser(user),
    token: generateToken(user.id),
  });
});
