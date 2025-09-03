import { Sequelize } from "sequelize"
import AppError from "./utils/appError"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./booksDatabase.db",
  logging: false,
})

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log("✅ Database connected successfully")
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err)
    throw new AppError("Database connection failed", 500)
  }
}

export const syncDB = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: true })
    console.log("✅ Database synced successfully")
  } catch (err) {
    console.error("❌ Unable to sync the database:", err)
    throw new AppError("Database sync failed", 500)
  }
}

export default sequelize
