import  type { Request, Response } from "express";
import * as userService from "../services/user.services";


// ==================================================
// Response Helpers
// ==================================================

const success = (
  res: Response,
  data: any,
  message: string = "OK",
  status: number = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const error = (
  res: Response,
  message: string = "Terjadi kesalahan",
  status: number = 500
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};


// ==================================================
// GET ALL USERS
// ==================================================
export const getAllUsersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const { users, total } = await userService.getAllUsers();

    return success(
      res,
      { users, total },
      "Berhasil mengambil semua user"
    );
  } catch (err: any) {
    return error(res, err.message);
  }
};


// ==================================================
// GET USER BY ID
// ==================================================

export const getUserByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.getUserByid(req.params.id!);

    return success(
      res,
      user,
      "User ditemukan"
    );
  } catch (err: any) {
    return error(res, err.message, 404);
  }
};


// ==================================================
// SEARCH USER
// ==================================================

export const searchUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, city, min_age, max_age } = req.query;

    const users = await userService.searchUser(
      name as string | undefined,
      city as string | undefined,
      min_age ? Number(min_age) : undefined,
      max_age ? Number(max_age) : undefined
    );

    return success(
      res,
      { users, total: users.length },
      "Hasil pencarian user"
    );
  } catch (err: any) {
    return error(res, err.message);
  }
};


// ==================================================
// CREATE USER
// ==================================================

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.createUser(req.body);

    return success(
      res,
      user,
      "User berhasil dibuat",
      201
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};


// ==================================================
// UPDATE USER
// ==================================================

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.updateUser(
      req.params.id!,
      req.body
    );

    return success(
      res,
      user,
      "User berhasil diupdate"
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};


// ==================================================
// DELETE USER (SOFT DELETE)
// ==================================================

export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.deleteUser(req.params.id!);

    return success(
      res,
      user,
      "User berhasil dihapus"
    );
  } catch (err: any) {
    return error(res, err.message, 404);
  }
};
