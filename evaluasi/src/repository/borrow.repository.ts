// repository/borrow.repository.ts
import type { Prisma, PrismaClient, BorrowRecord, Book } from "../generated"

export interface IBorrowRepository {
  list(
    skip: number,
    take: number,
    where: Prisma.BorrowRecordWhereInput,
    orderBy: Prisma.BorrowRecordOrderByWithRelationInput
  ): Promise<BorrowRecord[]>

  countAll(where: Prisma.BorrowRecordWhereInput): Promise<number>

  findById(id: number): Promise<BorrowRecord | null>

  createBorrowRecord(data: Prisma.BorrowRecordCreateInput): Promise<BorrowRecord>

  createBorrowItems(data: Prisma.BorrowItemCreateManyInput[]): Promise<void>

  updateBookStock(bookId: number, stock: number): Promise<Book>

  updateStatus(id: number, status: string): Promise<BorrowRecord>
}
export class BorrowRepository implements IBorrowRepository {
  constructor(private prisma: PrismaClient) { }

  async list(
    skip: number,
    take: number,
    where: Prisma.BorrowRecordWhereInput,
    orderBy: Prisma.BorrowRecordOrderByWithRelationInput
  ): Promise<BorrowRecord[]> {
    return this.prisma.borrowRecord.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        items: {
          include: { book: true }
        },
        user: true
      }
    })
  }

  async countAll(where: Prisma.BorrowRecordWhereInput): Promise<number> {
    return this.prisma.borrowRecord.count({ where })
  }

  async findById(id: number): Promise<BorrowRecord | null> {
    return this.prisma.borrowRecord.findUnique({
      where: { id },
      include: {
        items: { include: { book: true } },
        user: true
      }
    })
  }

  async createBorrowRecord(data: Prisma.BorrowRecordCreateInput): Promise<BorrowRecord> {
    return this.prisma.borrowRecord.create({ data })
  }

  async createBorrowItems(data: Prisma.BorrowItemCreateManyInput[]): Promise<void> {
    await this.prisma.borrowItem.createMany({ data })
  }

  async updateBookStock(bookId: number, stock: number): Promise<Book> {
    return this.prisma.book.update({
      where: { id: bookId, deletedAt: null },
      data: { stock }
    })
  }

  async updateStatus(id: number, status: string): Promise<BorrowRecord> {
    return this.prisma.borrowRecord.update({
      where: { id },
      data: { status }
    })
  }
}
