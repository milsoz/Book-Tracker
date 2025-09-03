async function addBook(book: { title: string; author: string; read: boolean }) {
  const response = await fetch("http://localhost:3001/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  }).then((res) => res.json())

  return response
}

export default addBook
