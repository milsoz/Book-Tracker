import type { Route } from "./+types/home"
import { useEffect, useState } from "react"
import Form from "~/components/Form"
import List from "~/components/List"
import getBooks from "~/services/getBooks"

export type Book = {
  id: number
  title: string
  author: string
  read: 1 | 0 // booleans are saved as 0 and 1 in SQLite
}

type ResponseData =
  | { book: Book; books?: never }
  | { books: Book[]; book?: never }

export type ResponseObj = {
  status: string
  data?: ResponseData
  error?: {
    status: string
    statusCode: number
  }
  message?: string
  stack?: string
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Tracker" },
    { name: "description", content: "Very simple book tracker" },
  ]
}

export default function Home() {
  const [books, setBooks] = useState<Book[] | []>([])

  async function loadBooks(): Promise<void> {
    const booksData = await getBooks()

    if (booksData.data) setBooks(booksData.data.books ?? [])
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <main>
      <nav className="bg-zinc-800 w-full h-full">
        <Form loadBooks={loadBooks} />
      </nav>
      <List books={books} loadBooks={loadBooks} />
    </main>
  )
}
