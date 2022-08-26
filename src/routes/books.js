import express from "express";
import {
  getAllBooks,
  createBook,
  updateBookById,
  deleteBookById,
  getBookByID,
} from "../controllers/books";
const router = express.Router();
router.get("/", getAllBooks);
router.get("/:id", getBookByID);
router.post("/", createBook);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);
export default router;
