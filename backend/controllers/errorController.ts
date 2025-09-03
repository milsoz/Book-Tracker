import type { NextFunction, Request, Response } from "express"

interface AppError extends Error {
  statusCode?: number
  status?: string
}

export default function (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}
