import type { Book } from "~/routes/home"
import toast from "react-hot-toast"
import changeBookStatus from "~/services/changeBookStatus"

function List({
  books,
  loadBooks,
}: {
  books: Book[]
  loadBooks: () => Promise<void>
}) {
  async function handleChangeRead(id: number) {
    const response = await changeBookStatus(id)

    if (response.status !== "success" && response.message) {
      return toast.error(response.message)
    }
    toast.success("Status successfully changed!")
    await loadBooks()
  }
  return (
    <div className="w-max mt-6 mx-auto grid grid-flow-row gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {books &&
        books.map((book) => (
          <div
            key={book.id}
            className="w-[250px] h-auto flex flex-col bg-zinc-800 text-zinc-50 p-4 rounded-2xl"
          >
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl break-word leading-snug">{book.title}</h1>
              <h2 className="text-lg break-word text-zinc-300">
                {book.author}
              </h2>
            </div>

            {book.read === true ? (
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
                    e.preventDefault()
                    handleChangeRead(book.id)
                  }}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default List
