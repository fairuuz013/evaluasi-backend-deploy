import type { Book } from "../generated/client";
import * as bookRepo from "../repositories/book.repository";






interface FindAllBookParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface BookListResponse {
  books: Book[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllBooks = async (
  params: FindAllBookParams
): Promise<BookListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;

  const skip = (page - 1) * limit;

  const whereClause: Prisma.BookWhereInput = {
    deletedAt: null,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.BookOrderByWithRelationInput =
    sortBy
      ? { [sortBy]: sortOrder ?? "desc" }
      : { createdAt: "desc" };

  const total = await bookRepo.countBooks(whereClause);

  const books = await bookRepo.findAllBooks({
    skip,
    take: limit,
    where: whereClause,
    orderBy,
  });

  return {
    books,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};






export const getBookById = async (id: string): Promise<Book> => {
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

export const searchBooks = async (query: any) => {
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
export const createBook = async (data: {
  title: string;
  author: string;
  stock: number;
}) => {
  if (data.stock < 0) {
    throw new Error("Stock tidak boleh negatif");
  }

  return bookRepo.createBook(data);
};

export const updateBook = async (
  id: string,
  data: Partial<Book>
) => {
  const bookId = Number(id);

  const book = await bookRepo.findBookById(bookId);

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan");
  }

  return bookRepo.updateBookById(bookId, data);
};

export const deleteBook = async (id: string) => {
  const bookId = Number(id);

  const book = await bookRepo.findBookById(bookId);

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan atau sudah dihapus");
  }

  return bookRepo.softDeleteBook(bookId);
};
