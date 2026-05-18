import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use(helmet());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Leads API is running"
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;