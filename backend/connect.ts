// import { Sequelize, DataTypes } from "sequelize";
import sqlite3 from "sqlite3"
import AppError from "./utils/appError"
const sql3 = sqlite3.verbose()

// const sequelize = new Sequelize("./booksDatabase.db");
// const Book = sequelize.define("Book", {
//   id: DataTypes.INTEGER,
//   title: DataTypes.STRING,
//   author: DataTypes.STRING,
//   read: DataTypes.BOOLEAN,
// });

function connected(err: Error | null) {
  if (err) {
    return console.error(err)
  }
  console.log("Created or connected to the DB")
}

const DB = new sql3.Database(
  "./booksDatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  connected
)

const sql = `CREATE TABLE IF NOT EXISTS books(
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  read BOOLEAN NOT NULL CHECK (read IN (0, 1))
)`

DB.run(sql, [], (err: Error | null) => {
  if (err) {
    throw new AppError(`Error creating books table`, 500)
  }
})

export default DB
