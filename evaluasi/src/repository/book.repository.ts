// repository/book.repository.ts
import type { Prisma, Book, PrismaClient } from "../generated";

export interface IBookRepository {
  list(
    skip: number,
    take: number,
    where: Prisma.BookWhereInput,
    orderBy: Prisma.BookOrderByWithRelationInput
  ): Promise<Book[]>

  countAll(where: Prisma.BookWhereInput): Promise<number>

  findById(id: number): Promise<Book | null>

  create(data: Prisma.BookCreateInput): Promise<Book>

  update(id: number, data: Prisma.BookUpdateInput): Promise<Book>

  softDelete(id: number): Promise<Book>
};



export class BookRepository implements IBookRepository {
  constructor(private prisma: PrismaClient) { };

  async list(
    skip: number,
    take: number,
    where: Prisma.BookWhereInput,
    orderBy: Prisma.BookOrderByWithRelationInput
  ): Promise<Book[]> {
    return this.prisma.book.findMany({
      skip,
      take,
      where,
      orderBy
    });
  };

  async countAll(where: Prisma.BookWhereInput): Promise<number> {
    return this.prisma.book.count({ where })
  };

  async findById(id: number): Promise<Book | null> {

    return this.prisma.book.findUnique({
      where: { id, deletedAt: null }
    });
  };


  async create ( data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({ data });
  };


  async update(id: number, data: Prisma.BookUpdateInput): Promise <Book> {
      return this.prisma.book.update({
      where: { id, deletedAt: null },
      data
    });
  };


  async softDelete(id: number): Promise<Book> {
    return this.prisma.book.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() }
    })
  }

}