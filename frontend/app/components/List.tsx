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
      <div className="bg-zinc-800 w-full h-full">
        <form
          className="lg:max-w-[1100px] max-w-[300px] mx-auto p-2 col-span-3 text-zinc-50 grid grid-cols-1 gap-4 lg:grid-cols-4"
          onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center justify-start">
            <label htmlFor="title" className="text-lg w-max">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border-1 border-zinc-50 h-6 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center justify-start">
            <label htmlFor="author" className="text-lg w-max">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="border-1 border-zinc-50 h-6 w-full "
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center justify-center max-w-[160px] mx-auto">
            <label htmlFor="read" className="text-lg select-none">
              Have read
            </label>
            <input
              type="checkbox"
              id="read"
              name="read"
              className="w-4 h-4"
              checked={read}
              onChange={(e) => setRead(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-green-800 w-40 rounded-lg mx-auto">
            Add book +
          </button>
        </form>
      </div>

      <div className="w-max mt-6 mx-auto grid grid-flow-row gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {books &&
          books.map((book) => (
            <div
              key={book.id}
              className="w-[250px] h-auto flex flex-col bg-zinc-800 text-zinc-50 p-4 rounded-2xl">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl break-word leading-snug">
                  {book.title}
                </h1>
                <h2 className="text-lg break-word text-zinc-300">
                  {book.author}
                </h2>
              </div>

              {book.read === 1 ? (
                <p className="text-green-400 mt-2">Read</p>
              ) : (
                <div className="flex gap-2 items-center mt-auto">
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
