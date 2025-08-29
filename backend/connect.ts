const sqlite3 = require("sqlite3");
const AppError = require("./utils/appError");
const sql3 = sqlite3.verbose();

function connected(err: Error | null) {
  if (err) {
    return console.error(err);
  }
  console.log("Created or connected to the DB");
}

const DB = new sql3.Database(
  "./booksDatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  connected
);

let sql = `CREATE TABLE IF NOT EXISTS books(
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  read BOOLEAN NOT NULL CHECK (read IN (0, 1))
)`;

DB.run(sql, [], (err: Error | null) => {
  if (err) {
    throw new AppError(`Error creating books table`, 500);
  }
});

module.exports = DB;
