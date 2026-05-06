import cors from "cors";
import express from "express";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Blog API is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
