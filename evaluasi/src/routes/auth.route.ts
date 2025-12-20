import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controller/auth.controller";

const router = Router();

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

export default router;
