import app from "./src/app";
import { connectDB } from "./src/config/db";
import { env } from "./src/config/env";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
};

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
