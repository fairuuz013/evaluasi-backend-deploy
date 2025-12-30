import { PrismaClient, Prisma } from "../generated";
import type { IBorrowRepository } from "../repository/borrow.repository";


interface BorrowItemInput {
  bookId: number
  qty: number
};

interface BorrowFilter {
  status?: "BORROWED" | "RETURNED"
  memberName?: string
  startDate?: Date
  endDate?: Date
}


interface BorrowParams {
  page: number
  limit: number
  filters?: BorrowFilter
};

export interface IBorrowService {
  list(params: BorrowParams): Promise<any>
  getById(id: string): Promise<any>
  borrow(userId: number, items: BorrowItemInput[]): Promise<any>
  returnBorrow(id: string): Promise<any>
};


export class BorrowServices implements IBorrowService {
  constructor(
    private borrowRepo: IBorrowRepository,
    private prisma: PrismaClient
  ) { };

  async list({ page, limit, filters }: BorrowParams) {
    const skip = (page - 1) * limit

    const where: Prisma.BorrowRecordWhereInput = { }

    // 🔹 filter status
    if (filters?.status) {
      where.status = filters.status
    }

    // 🔹 filter tanggal peminjaman
    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {}

      if (filters.startDate) {
        where.createdAt.gte = filters.startDate
      }

      if (filters.endDate) {
        where.createdAt.lte = filters.endDate
      }
    }

    // 🔹 filter nama member (relasi user)
    // 🔹 filter nama member (relasi user)
    if (filters?.memberName) {
      where.user = {
        is: {
          username: {
            contains: filters.memberName,
            mode: "insensitive"
          }
        }
      }
    }

    const borrows = await this.borrowRepo.list(
      skip,
      limit,
      where,
      { createdAt: "desc" }
    )

    const total = await this.borrowRepo.countAll(where)

    return {
      borrows,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    }
  }



  async getById(id: string) {
    const borrow = await this.borrowRepo.findById(Number(id))

    if (!borrow) {
      throw new Error("Data peminjaman tidak ditemukan")
    };

    return borrow
  };

  async borrow(userId: number, items: BorrowItemInput[]) {
    if (!items.length) {
      throw new Error("Item peminjaman kosong")
    };

    return this.prisma.$transaction(async (tx) => {
      // 1. Ambil semua buku
      const books = await tx.book.findMany({
        where: {
          id: { in: items.map(i => i.bookId) },
          deletedAt: null
        }
      })

      // 2. validasi 
      for (const item of items) {
        const book = books.find(b => b.id === item.bookId)
        if (!book) throw new Error("Buku tidak ditemukan")
        if (book.stock < item.qty) {
          throw new Error(`Stok buku ${book.title} tidak mencukupi`)
        };
      };


      // 3. Create borrow record
      const berrowRecord = await tx.borrowRecord.create({
        data: {
          userId,
          status: "BORROWED"
        }
      });


      // 4 Create Borrow items 
      await tx.borrowItem.createMany({
        data: items.map(item => ({
          borrowId: berrowRecord.id,
          bookId: item.bookId,
          qty: item.qty
        }))
      });

      // 5 Update stock
      for (const item of items) {
        const book = books.find(b => b.id === item.bookId)!
        await tx.book.update({
          where: { id: book.id },
          data: { stock: book.stock - item.qty }
        })
      };

      return berrowRecord
    });

  };


  async returnBorrow(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const borrow = await tx.borrowRecord.findUnique({
        where: { id: Number(id) },
        include: { items: true }
      })

      if (!borrow) {
        throw new Error("Data peminjaman tidak ditemukan")
      }

      if (borrow.status === "RETURNED") {
        throw new Error("Buku sudah dikembalikan")
      }

      // kembalikan stok
      for (const item of borrow.items) {
        await tx.book.update({
          where: { id: item.bookId },
          data: { stock: { increment: item.qty } }
        })
      }

      return tx.borrowRecord.update({
        where: { id: borrow.id },
        data: { status: "RETURNED" }
      })
    })
  }


};