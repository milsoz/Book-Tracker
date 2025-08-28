import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import addBook from "~/services/addBook";
import changeBookStatus from "~/services/changeBookStatus";
import getBooks from "~/services/getBooks";

type Book = {
  id: number;
  title: string;
  author: string;
  read: 0 | 1;
};

function List() {
  const [books, setBooks] = useState<Book[] | []>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [read, setRead] = useState(false);

  async function loadBooks() {
    const booksData = await getBooks();
    setBooks(booksData.books);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await addBook({ title, author, read });
    if (response.status !== "success") {
      return toast.error(response.message);
    }
    toast.success("Book successfully added!");

    setTitle("");
    setAuthor("");
    setRead(false);
    await loadBooks();
  }

  async function handleChangeRead(id: number) {
    const response = await changeBookStatus(id);

    if (response.status !== "success") {
      return toast.error(response.message);
    }
    toast.success("Status successfully changed!");
    await loadBooks();
  }

  return (
    <main className="w-screen h-full">
      <div className="w-max mt-6 mx-auto grid grid-flow-row grid-cols-3 gap-6">
        <form
          className="p-2 rounded-lg col-span-3 text-zinc-50 bg-zinc-800 flex items-center justify-center"
          onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-lg mr-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border-1 border-zinc-50 mr-10 h-5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="author" className="text-lg mr-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="border-1 border-zinc-50 mr-10 h-5"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="read" className="text-lg mr-2 select-none">
            Have read
          </label>
          <input
            type="checkbox"
            id="read"
            name="read"
            className="w-4 h-4 mr-4"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
          />
          <button
            type="submit"
            className="cursor-pointer bg-green-800 w-40 rounded-lg mx-auto">
            Add book +
          </button>
        </form>

        {books &&
          books.map((book) => (
            <div
              key={book.id}
              className="w-[300px] h-[150px] flex flex-col bg-zinc-800 items-start justify-center text-zinc-50 p-4 rounded-2xl">
              <h1 className="text-2xl">{book.title}</h1>
              <h2 className="text-lg">{book.author}</h2>
              {book.read === 1 ? (
                <p className="text-green-400 mt-2">Read</p>
              ) : (
                <div className="flex gap-2 items-center justify-center mt-2">
                  <label htmlFor="markRead" className="mr-2 select-none">
                    Mark as read
                  </label>
                  <input
                    type="checkbox"
                    id="markRead"
                    name="markRead"
                    className="w-4 h-4 mr-4"
                    onChange={(e: React.ChangeEvent) => {
                      e.preventDefault();

                      handleChangeRead(book.id);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}

export default List;
