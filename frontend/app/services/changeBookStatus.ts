async function changeBookStatus(id: number) {
  const response = await fetch("http://localhost:3001/api", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  }).then((res) => res.json())

  return response
}

export default changeBookStatus
