import type { Book } from "../generated/client";
import * as bookRepo from "../repositories/book.repository";

import type { Request, Response } from "express";
import { successResponse } from "../utils/response";

export const getAllBooks = async (
  req: Request<{}, {}, {}, any>,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string;
  const sortBy = req.query.sortBy as string;
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

  const result = await bookService.getAllBooks({
    page,
    limit,
    search,
    sortBy,
    sortOrder
  });

  const pagination = {
    page: result.currentPage,
    limit,
    total: result.total,
    totalPages: result.totalPages
  };

  successResponse(
    res,
    "Data buku berhasil diambil",
    result.books,
    pagination
  );
};



// ==============================
// GET ALL BOOKS
// ==============================
export const getAllBooksController = async (): Promise<{
  books: Book[];
  total: number;
}> => {
  const books = await bookRepo.findAllBooks();

  return {
    books,
    total: books.length,
  };
};

// ==============================
// GET BOOK BY ID
// ==============================
export const getBookByIdController = async (id: string): Promise<Book> => {
  const bookId = Number(id);

  if (isNaN(bookId)) {
    throw new Error("ID tidak valid");
  }

  const book = await bookRepo.findBookById(bookId);

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan");
  }

  return book;
};

// ==============================
// SEARCH BOOK
// ==============================
export const createBookController = async (
  query: any
): Promise<{ books: Book[]; total: number }> => {
  const { title, author, min_stock, max_stock } = query;

  const filter: any = {};

  if (title) {
    filter.title = {
      contains: String(title),
      mode: "insensitive",
    };
  }

  if (author) {
    filter.author = {
      contains: String(author),
      mode: "insensitive",
    };
  }

  if (min_stock || max_stock) {
    filter.stock = {
      ...(min_stock && { gte: Number(min_stock) }),
      ...(max_stock && { lte: Number(max_stock) }),
    };
  }

  const books = await bookRepo.searchBooks(filter);

  return {
    books,
    total: books.length,
  };
};

// ==============================
// CREATE BOOK
// ==============================
export const updateBookController = async (data: {
  title: string;
  author: string;
  stock: number;
}): Promise<Book> => {
  if (data.stock < 0) {
    throw new Error("Stock tidak boleh negatif");
  }

  return bookRepo.createBook(data);
};

// ==============================
// UPDATE BOOK
// ==============================
export const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const bookId = Number(id);

  const book = await bookRepo.findBookById(bookId);

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan");
  }

  return bookRepo.updateBookById(bookId, data);
};

// ==============================
// DELETE BOOK
// ==============================
export const deleteBookController = async (id: string): Promise<Book> => {
  const bookId = Number(id);

  const book = await bookRepo.findBookById(bookId);

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan atau sudah dihapus");
  }

  return bookRepo.softDeleteBook(bookId);
};
