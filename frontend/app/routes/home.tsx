import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import Form from "~/components/Form";
import List from "~/components/List";
import getBooks from "~/services/getBooks";

export type Book = {
  id: number;
  title: string;
  author: string;
  read: 0 | 1;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Tracker" },
    { name: "description", content: "Very simple book tracker" },
  ];
}

export default function Home() {
  const [books, setBooks] = useState<Book[] | []>([]);

  async function loadBooks() {
    const booksData = await getBooks();
    setBooks(booksData.books);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <main>
      <nav className="bg-zinc-800 w-full h-full">
        <Form loadBooks={loadBooks} />
      </nav>
      <List books={books} loadBooks={loadBooks} />
    </main>
  );
}
