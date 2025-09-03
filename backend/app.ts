import type { NextFunction, Request, Response, Express } from "express";
import type { CorsOptions } from "cors";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorController from "./controllers/errorController";
import AppError from "./utils/appError";
import bookRouter from "./routes/booksRoute";

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH"],
  allowedHeaders: ["Content-Type"],
};

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", bookRouter);

app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

export default app;
