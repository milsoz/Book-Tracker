import type { NextFunction, Request, Response } from "express"
import AppError from "../utils/appError"
import Book from "../models/book"

type HandlerFunctionType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

const getSavedBooks: HandlerFunctionType = async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.status(200).json({
      status: "success",
      data: {
        books,
      },
    })
  } catch (err) {
    return next(new AppError("Failed to get the books from our database.", 500))
  }
}

const saveBook: HandlerFunctionType = async (req, res, next) => {
  const {
    title,
    author,
    read,
  }: { title: string; author: string; read: boolean } = req.body

  if (!title || !author || typeof read === "undefined") {
    return next(new AppError("A book must have a title, and an author.", 400))
  }

  try {
    const existingBook = await Book.findOne({ where: { title, author } })

    if (existingBook) {
      return next(
        new AppError(
          "There already is a book with this title in your list.",
          409
        )
      )
    }

    const newBook = await Book.create({ title, author, read })

    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    })
  } catch (err) {
    return next(new AppError("Failed to add the book to our database.", 500))
  }
}

const updateBookStatus: HandlerFunctionType = async (req, res, next) => {
  const id = Number(req.body.id)

  if (!id || isNaN(id)) {
    return next(new AppError("Please provide a valid numeric id.", 400))
  }

  try {
    const book = await Book.findByPk(id)

    if (!book) {
      return next(
        new AppError("There is no book with this id in your list.", 400)
      )
    }

    book.set({
      read: true,
    })
    await book.save()

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    })
  } catch (err) {
    return next(new AppError("Failed to update book status.", 500))
  }
}

export { getSavedBooks, saveBook, updateBookStatus }
