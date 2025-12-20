import type { Book, Prisma } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

/**
 * =========================
 * GET ALL (pagination, search, sorting)
 * =========================
 */
export const findAllBooks = async (params: {
  skip: number;
  take: number;
  where: Prisma.BookWhereInput;
  orderBy: Prisma.BookOrderByWithRelationInput;
}): Promise<Book[]> => {
  const { skip, take, where, orderBy } = params;

  return prisma.book.findMany({
    skip,
    take,
    where,
    orderBy,
  });
};

/**
 * =========================
 * COUNT BOOKS (pagination)
 * =========================
 */
export const countBooks = async (
  where: Prisma.BookWhereInput
): Promise<number> => {
  return prisma.book.count({
    where,
  });
};

/**
 * =========================
 * GET BY ID
 * =========================
 */
export const findBookById = async (
  id: number
): Promise<Book | null> => {
  return prisma.book.findUnique({
    where: { id },
  });
};

/**
 * =========================
 * SEARCH (non-pagination, optional)
 * =========================
 */
export const searchBooks = async (
  filter: Prisma.BookWhereInput
): Promise<Book[]> => {
  return prisma.book.findMany({
    where: {
      deletedAt: null,
      ...filter,
    },
  });
};

/**
 * =========================
 * CREATE
 * =========================
 */
export const createBook = async (data: {
  title: string;
  author: string;
  stock: number;
}): Promise<Book> => {
  return prisma.book.create({
    data,
  });
};

/**
 * =========================
 * UPDATE
 * =========================
 */
export const updateBookById = async (
  id: number,
  data: Partial<Book>
): Promise<Book> => {
  return prisma.book.update({
    where: { id },
    data,
  });
};

/**
 * =========================
 * SOFT DELETE
 * =========================
 */
export const softDeleteBook = async (
  id: number
): Promise<Book> => {
  return prisma.book.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
