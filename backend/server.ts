import app from "./app"
import { connectDB, syncDB } from "./connect"

const port = 3001
const startServer = async () => {
  await connectDB()
  await syncDB()

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

startServer()
