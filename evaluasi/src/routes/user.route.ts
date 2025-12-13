import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  searchUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controller/user.controller";
import { createUserValidation, getUserByIdValidation, validate } from "../middleware/user.validasion";

const router = Router();


// ==================================================
// USER ROUTES
// ==================================================

// GET /users
router.get("/", getAllUsersController);

// GET /users/search?name=&city=&min_age=&max_age=
router.get("/search", searchUserController);

// GET /users/:id
router.get("/:id", validate(getUserByIdValidation), getUserByIdController);

// POST /users
router.post("/", validate(createUserValidation), createUserController);

// PUT /users/:id
router.put("/:id", updateUserController);

// DELETE /users/:id (soft delete)
router.delete("/:id", deleteUserController);


export default router;
