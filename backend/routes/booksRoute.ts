const express = require("express");
const {
  getSavedBooks,
  saveBook,
  updateBookStatus,
} = require("../controllers/booksController");

const router = express.Router();

router.route("/").get(getSavedBooks).post(saveBook).patch(updateBookStatus);
module.exports = router;
