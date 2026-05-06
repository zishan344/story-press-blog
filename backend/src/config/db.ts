import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(env.DATABASE_URL);

  console.log(`MongoDB connected: ${connection.connection.host}`);
};
