import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

type MongoDuplicateError = Error & {
  code?: number;
  keyValue?: Record<string, string>;
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    message = error.message;
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired";
  } else if ((error as MongoDuplicateError).code === 11000) {
    statusCode = 409;
    const fields = Object.keys((error as MongoDuplicateError).keyValue ?? {});
    message = `${fields.join(", ") || "Value"} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
