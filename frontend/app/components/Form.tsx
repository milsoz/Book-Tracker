import { useState } from "react";
import toast from "react-hot-toast";
import addBook from "~/services/addBook";

function Form({ loadBooks }: { loadBooks: any }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [read, setRead] = useState(false);

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

  return (
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
  );
}

export default Form;
