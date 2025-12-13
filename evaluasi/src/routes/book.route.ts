import { Router } from "express";
import {
  getAllBooksController,
  getBookByIdController,
  searchBookController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controller/book.controller";
import { createBookValidation, getBookByIdValidation, validate } from "../middleware/book.validasion";
import { getUserByIdValidation } from "../middleware/user.validasion";

const router = Router();


// ==================================================
// BOOK ROUTES
// ==================================================

// GET /books
router.get("/", getAllBooksController);

// GET /books/search?title=&author=&min_stock=&max_stock=
router.get("/search", searchBookController);

// GET /books/:id
router.get("/:id", validate(getBookByIdValidation), getBookByIdController);

// POST /books
router.post("/", validate(createBookValidation),  createBookController);

// PUT /books/:id
router.put("/:id", updateBookController);

// DELETE /books/:id (soft delete)
router.delete("/:id", deleteBookController);


export default router;
