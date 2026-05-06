import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

type TokenPayload = {
  userId: string;
};

export const requireAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("Authentication is required", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError("Authenticated user no longer exists", 401);
    }

    req.user = user;
    next();
  },
);
