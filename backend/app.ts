import type { NextFunction, Request, Response } from "express";
const errorController = require("./controllers/errorController");
const express = require("express");
const DB = require("./connect");
const AppError = require("./utils/appError");
const bookRouter = require("./routes/booksRoute");

const app = express();

app.use(express.json());

app.use("/api", bookRouter);

app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
