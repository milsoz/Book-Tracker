async function fetchBooks() {
  const data = await fetch("http://localhost:3001/api").then((res) =>
    res.json()
  );

  return data;
}

export default fetchBooks;
