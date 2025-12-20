import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateMyProfileController,
  deleteUserController,
} from "../controller/user.controller";

import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

// ==============================
// ROOT: /api/users
// ==============================

// ADMIN → lihat semua user
router.get("/", authenticate, adminOnly, getAllUsersController);

// MEMBER / ADMIN → lihat user by id
router.get("/:id", authenticate, getUserByIdController);

// REGISTER (optional kalau auth dipisah)
router.post("/", createUserController);

// MEMBER → update profile sendiri
router.put("/me/profile", authenticate, updateMyProfileController);

// ADMIN → soft delete user
router.delete("/:id", authenticate, adminOnly, deleteUserController);

export default router;
