import type { Request, Response } from "express";
import * as bookService from "../services/book.services";


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
// GET ALL BOOKS
// ==================================================

export const getAllBooksController = async (
  _req: Request,
  res: Response
) => {
  try {
    const { books, total } = await bookService.getAllBooks();

    return success(
      res,
      { books, total },
      "Berhasil mengambil semua book"
    );
  } catch (err: any) {
    return error(res, err.message);
  }
};


// ==================================================
// GET BOOK BY ID
// ==================================================

export const getBookByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const book = await bookService.getBookById(req.params.id!);

    return success(
      res,
      book,
      "Book ditemukan"
    );
  } catch (err: any) {
    return error(res, err.message, 404);
  }
};


// ==================================================
// SEARCH BOOK
// ==================================================

export const searchBookController = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, author, min_stock, max_stock } = req.query;

    const books = await bookService.searchBook(
      title as string | undefined,
      author as string | undefined,
      min_stock ? Number(min_stock) : undefined,
      max_stock ? Number(max_stock) : undefined
    );

    return success(
      res,
      { books, total: books.length },
      "Hasil pencarian book"
    );
  } catch (err: any) {
    return error(res, err.message);
  }
};


// ==================================================
// CREATE BOOK
// ==================================================

export const createBookController = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, author, stock, userId } = req.body;

    const book = await bookService.createBook({
      title,
      author,
      stock,
      userId,
    });

    return success(
      res,
      book,
      "Book berhasil dibuat",
      201
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};


// ==================================================
// UPDATE BOOK
// ==================================================

export const updateBookController = async (
  req: Request,
  res: Response
) => {
  try {
    const book = await bookService.updateBook(
      req.params.id!,
      req.body
    );

    return success(
      res,
      book,
      "Book berhasil diupdate"
    );
  } catch (err: any) {
    return error(res, err.message, 400);
  }
};


// ==================================================
// DELETE BOOK (SOFT DELETE)
// ==================================================

export const deleteBookController = async (
  req: Request,
  res: Response
) => {
  try {
    const book = await bookService.deleteBook(req.params.id!);

    return success(
      res,
      book,
      "Book berhasil dihapus"
    );
  } catch (err: any) {
    return error(res, err.message, 404);
  }
};
