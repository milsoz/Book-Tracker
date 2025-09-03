import { Router } from "express";

import express from "express";
import {
  getSavedBooks,
  saveBook,
  updateBookStatus,
} from "../controllers/booksController";

const router: Router = express.Router();

router.route("/").get(getSavedBooks).post(saveBook).patch(updateBookStatus);
export default router;
