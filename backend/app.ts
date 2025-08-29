import type { NextFunction, Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
const bookRouter = require("./routes/booksRoute");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", bookRouter);

app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
