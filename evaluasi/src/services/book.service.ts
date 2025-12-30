import type { Book, Prisma } from "../generated"
import type { IBookRepository } from "../repository/book.repository"

interface FindAllBookParams {
  page: number
  limit: number
  search?: {
    title?: string
    author?: string
  }
  filters?: {
    inStock?: boolean
    yearFrom?: number
    yearTo?: number
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}


export interface BookListResponse {
  books: Book[]
  total: number
  totalPages: number
  currentPage: number
}


export interface IBookService {
  list(params: FindAllBookParams): Promise<BookListResponse>
  getById(id: string): Promise<Book>
  create(data: {
    title: string
    author: string
    stock: number
    cover?: string
  }): Promise<Book>
  update(id: string, data: Partial<Book>): Promise<Book>
  delete(id: string): Promise<Book>
}

export class BookServices implements IBookService {
  constructor(private bookRepo: IBookRepository) { }

  async list(params: FindAllBookParams): Promise<BookListResponse> {
    const { page, limit, search, filters, sortBy, sortOrder } = params

    const skip = (page - 1) * limit

    const where: Prisma.BookWhereInput = {
      deletedAt: null
    }

    // 🔍 search
    if (search?.title) {
      where.title = { contains: search.title, mode: "insensitive" }
    }

    if (search?.author) {
      where.author = { contains: search.author, mode: "insensitive" }
    }

    if (filters?.inStock) {
      where.stock = { gt: 0 }
    }

  if (filters?.yearFrom || filters?.yearTo) {
  where.publishedYear = {}

  if (filters.yearFrom !== undefined) {
    where.publishedYear.gte = filters.yearFrom
  }

  if (filters.yearTo !== undefined) {
    where.publishedYear.lte = filters.yearTo
  }
}


    const orderBy: Prisma.BookOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { createdAt: "desc" }

    const books = await this.bookRepo.list(skip, limit, where, orderBy)
    const total = await this.bookRepo.countAll(where)

    return {
      books,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    }
  }

  async getById(id: string): Promise<Book> {
    const book = await this.bookRepo.findById(Number(id))

    if (!book) {
      throw new Error("Book tidak ditemukan")
    }

    return book
  }

  async create(data: {
    title: string
    author: string
    stock: number
    cover?: string
  }): Promise<Book> {
    return this.bookRepo.create(data)
  }

  async update(id: string, data: Partial<Book>): Promise<Book> {
    return this.bookRepo.update(Number(id), data)
  }

  async delete(id: string): Promise<Book> {
    const book = await this.bookRepo.findById(Number(id))

    if (!book) {
      throw new Error("Book tidak ditemukan atau sudah dihapus")
    }

    return this.bookRepo.softDelete(Number(id))
  }
}
