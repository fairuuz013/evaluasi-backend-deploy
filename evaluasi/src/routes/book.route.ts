import { Router } from "express";
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controller/book.controller";

import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

// PUBLIC / MEMBER
router.get("/", authenticate, getAllBooksController);
router.get("/:id", authenticate, getBookByIdController);

// ADMIN ONLY
router.post("/", authenticate, adminOnly, createBookController);
router.put("/:id", authenticate, adminOnly, updateBookController);
router.delete("/:id", authenticate, adminOnly, deleteBookController);

export default router;
