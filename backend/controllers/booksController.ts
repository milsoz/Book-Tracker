import type { NextFunction, Request, Response } from "express";
const DB = require("../connect");
const AppError = require("../utils/appError");

type Book = {
  id: number;
  title: string;
  author: string;
  read: 0 | 1;
};

exports.getSavedBooks = (req: Request, res: Response, next: NextFunction) => {
  const sql = `SELECT * FROM books`;

  DB.all(sql, [], (err: Error, rows: Book[]) => {
    if (err) {
      return next(
        new AppError("Failed to get the books from our database.", 500)
      );
    }

    res.status(200).json({
      status: "success",
      books: rows,
    });
  });
};

exports.saveBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author, read } = req.body;

  if (!title || !author || typeof read === "undefined") {
    return next(new AppError("A book must have a title, and an author.", 400));
  }

  DB.get(
    "SELECT * FROM books WHERE title = ? AND author = ?",
    [title, author],
    (err: Error, row: Book) => {
      if (err) {
        return next(
          new AppError(
            "Failed to check if book is already in our database.",
            500
          )
        );
      }

      if (row) {
        return next(
          new AppError(
            "There already is a book with this title in your list.",
            400
          )
        );
      }

      const sql = `INSERT INTO books(title,author,read) VALUES (?,?,?)`;

      DB.run(sql, [title, author, read], (err: Error) => {
        if (err) {
          return next(
            new AppError("Failed to add the book to our database.", 500)
          );
        }

        res.status(201).json({
          status: "success",
          data: {
            book: { title, author, read },
          },
        });
      });
    }
  );
};

exports.updateBookStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  if (!id) {
    return next(new AppError("Please provide an id.", 400));
  }

  DB.get("SELECT * FROM books WHERE id = ?", [id], (err: Error, row: Book) => {
    if (err) {
      return next(
        new AppError("Failed to check if book is in our database.", 500)
      );
    }

    if (!row) {
      return next(
        new AppError(
          "There is no book with this title and author in our database",
          500
        )
      );
    }

    const sql = `UPDATE books SET read = ? WHERE id = ?`;
    DB.run(sql, [1, id], (err: Error) => {
      if (err) {
        return next(
          new AppError("Failed to update the book in our database.", 500)
        );
      }

      res.status(200).json({
        status: "success",
        data: {
          book: { ...row, read: 1 },
        },
      });
    });
  });
};
