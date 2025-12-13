import type { Book } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();


// ==================================================
// GET ALL BOOKS
// ==================================================
export const getAllBooks = async (): Promise<{ books: Book[]; total: number }> => {
  const books = await prisma.book.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      user: true,
    },
  });

  return {
    books,
    total: books.length,
  };
};


// ==================================================
// GET BOOK BY ID
// ==================================================
export const getBookById = async (id: string): Promise<Book> => {
  const numId = Number(id);

  const book = await prisma.book.findUnique({
    where: { id: numId },
    include: { user: true },
  });

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan");
  }

  return book;
};


// ==================================================
// SEARCH BOOK
// ==================================================
export const searchBook = async (
  title?: string,
  author?: string,
  min_stock?: number,
  max_stock?: number
): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: {
      deletedAt: null,

      ...(title && {
        title: {
          contains: title,
          mode: "insensitive",
        },
      }),

      ...(author && {
        author: {
          contains: author,
          mode: "insensitive",
        },
      }),

      ...(min_stock || max_stock
        ? {
            stock: {
              ...(min_stock && { gte: min_stock }),
              ...(max_stock && { lte: max_stock }),
            },
          }
        : {}),
    },
    include: {
      user: true,
    },
  });
};


// ==================================================
// CREATE BOOK
// ==================================================
export const createBook = async (data: {
  title: string;
  author: string;
  stock: number;
  userId?: number;
}): Promise<Book> => {
  return await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      stock: data.stock,
    },
  });
};


// ==================================================
// UPDATE BOOK
// ==================================================
export const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const numId = Number(id);

  return await prisma.book.update({
    where: {
      id: numId,
      deletedAt: null,
    },
    data,
  });
};


// ==================================================
// DELETE BOOK (SOFT DELETE)
// ==================================================
export const deleteBook = async (id: string): Promise<Book> => {
  const numId = Number(id);

  const book = await prisma.book.findUnique({
    where: { id: numId },
  });

  if (!book || book.deletedAt !== null) {
    throw new Error("Book tidak ditemukan atau sudah dihapus");
  }

  return await prisma.book.update({
    where: { id: numId },
    data: {
      deletedAt: new Date(),
    },
  });
};
