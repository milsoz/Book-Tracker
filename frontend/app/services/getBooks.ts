import type { ResponseObj } from "~/routes/home"

async function fetchBooks() {
  const response: ResponseObj = await fetch("http://localhost:3001/api").then(
    (res) => res.json()
  )

  return response
}

export default fetchBooks
