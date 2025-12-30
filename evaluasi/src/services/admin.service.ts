import { PrismaClient } from "../generated"

export class AdminService {
  constructor(private prisma: PrismaClient) {}

  async getStats() {
    // 1. total buku tersedia (stok > 0 & belum dihapus)
    const totalBooksAvailable = await this.prisma.book.count({
      where: {
        stock: { gt: 0 },
        deletedAt: null
      }
    })

    // 2. total peminjaman aktif
    const activeBorrows = await this.prisma.borrowRecord.count({
      where: {
        status: "BORROWED"
      }
    })

    // 3. buku paling populer
    const mostPopular = await this.prisma.borrowItem.groupBy({
      by: ["bookId"],
      _sum: {
        qty: true
      },
      orderBy: {
        _sum: {
          qty: "desc"
        }
      },
      take: 1
    })

    let popularBook = null

const [top] = mostPopular

if (top) {
  popularBook = await this.prisma.book.findUnique({
    where: { id: top.bookId }
  })
}
    return {
      totalBooksAvailable,
      activeBorrows,
      mostPopularBook: popularBook
    }
  }
}
