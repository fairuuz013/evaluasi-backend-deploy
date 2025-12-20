import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import * as borrowService from "../services/borrow.services";

export const borrowBooks = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const { items } = req.body;

    const borrow = await borrowService.borrowBooks(user.id, items);

    successResponse(res, "Buku berhasil dipinjam", borrow, null, 201);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};

export const returnBorrow = async (req: Request, res: Response) => {
  try {
    const borrowId = Number(req.params.id);

    const result = await borrowService.returnBorrow(borrowId);

    successResponse(res, "Buku berhasil dikembalikan", result);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};

export const getMyBorrows = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const borrows = await borrowService.getBorrowsByUserId(user.id);

    successResponse(res, "Riwayat peminjaman berhasil diambil", borrows);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};

export const getBorrowById = async (req: Request, res: Response) => {
  try {
    const borrowId = Number(req.params.id);
    const user = req.user!;

    const borrow = await borrowService.getBorrowById(
      borrowId,
      user.id,
      user.role
    );

    successResponse(res, "Detail peminjaman berhasil diambil", borrow);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};

export const getAllBorrows = async (_req: Request, res: Response) => {
  try {
    const borrows = await borrowService.getAllBorrows();

    successResponse(res, "Semua data peminjaman berhasil diambil", borrows);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};

export const deleteBorrow = async (req: Request, res: Response) => {
  try {
    const borrowId = Number(req.params.id);

    const deleted = await borrowService.deleteBorrow(borrowId);

    successResponse(res, "Peminjaman berhasil dihapus", deleted);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};
