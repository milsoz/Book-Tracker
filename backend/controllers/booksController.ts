import type { NextFunction, Request, Response } from "express";
const DB = require("../connect");
const AppError = require("../utils/appError");
const { promisify } = require("util");

type Book = {
  id: number;
  title: string;
  author: string;
  read: 0 | 1;
};

const dbAll = promisify(DB.all).bind(DB);
const dbGet = promisify(DB.get).bind(DB);
const dbRun = promisify(DB.run).bind(DB);

exports.getSavedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sql = `SELECT * FROM books`;

  try {
    const rows: Book[] = await dbAll(sql, []);
    res.status(200).json({
      status: "success",
      books: rows,
    });
  } catch (err) {
    return next(
      new AppError("Failed to get the books from our database.", 500)
    );
  }
};

exports.saveBook = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    author,
    read,
  }: { title: string; author: string; read: boolean } = req.body;

  if (!title || !author || typeof read === "undefined") {
    return next(new AppError("A book must have a title, and an author.", 400));
  }

  try {
    const existingBook: Book | undefined = await dbGet(
      "SELECT * FROM books WHERE title = ? AND author = ?",
      [title, author]
    );

    if (existingBook) {
      return next(
        new AppError(
          "There already is a book with this title in your list.",
          409
        )
      );
    }

    const sql = `INSERT INTO books(title,author,read) VALUES (?,?,?)`;
    await dbRun(sql, [title, author, read]);

    res.status(201).json({
      status: "success",
      data: {
        book: { title, author, read },
      },
    });
  } catch (err) {
    return next(new AppError("Failed to add the book to our database.", 500));
  }
};

exports.updateBookStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id }: { id: number } = req.body;

  if (!id) {
    return next(new AppError("Please provide an id.", 400));
  }

  try {
    const book: Book | undefined = await dbGet(
      "SELECT * FROM books WHERE id = ?",
      [id]
    );

    if (!book) {
      return next(
        new AppError("There is no book with this id in your list.", 400)
      );
    }

    const sql = `UPDATE books SET read = ? WHERE id = ?`;
    await dbRun(sql, [true, id]);

    res.status(200).json({
      status: "success",
      data: {
        book: { ...book, read: true },
      },
    });
  } catch (err) {
    return next(new AppError("Failed to update book status.", 500));
  }
};
