import  type{ Request, Response } from "express";
import * as userService from "../services/user.services";
import { successResponse, errorResponse } from "../utils/response";

// ==============================
// GET ALL USERS (ADMIN)
// ==============================
export const getAllUsersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await userService.getAllUsers();
    return successResponse(res, "Berhasil ambil semua user", result);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

// ==============================
// GET USER BY ID
// ==============================
export const getUserByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id!);

    return successResponse(res, "Berhasil ambil user", user);
  } catch (error: any) {
    return errorResponse(res, error.message, 404);
  }
};

// ==============================
// CREATE USER (REGISTER)
// ==============================
export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      username,
      password,
      role,
      profile,
    } = req.body;

    if (!password) {
      throw new Error("Password wajib diisi");
    }

    const user = await userService.createUser({
      email,
      username: username ?? null, // 🔥 penting
      password_hash: password, // nanti hash di auth service
      role,
      profile,
    });

    return successResponse(res, "User berhasil dibuat", user,);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

// ==============================
// UPDATE MY PROFILE (MEMBER)
// ==============================
export const updateMyProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id; // dari middleware authenticate
    const updated = await userService.updateMyProfile(userId, req.body);

    return successResponse(res, "Profile berhasil diupdate", updated);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

// ==============================
// DELETE USER (ADMIN)
// ==============================
export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id!);

    return successResponse(res, "User berhasil dihapus", result);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
