// controller/book.controller.ts
import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IBookService } from "../services/book.service"

export class BookController {
  constructor(private bookService: IBookService) {
    this.list = this.list.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }


  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const filters: {
      inStock?: boolean
      yearFrom?: number
      yearTo?: number
    } = {}

    if (req.query.inStock !== undefined) {
      filters.inStock = req.query.inStock === "true"
    }

    const yearFrom = Number(req.query.yearFrom)
    if (!isNaN(yearFrom)) {
      filters.yearFrom = yearFrom
    }

    const yearTo = Number(req.query.yearTo)
    if (!isNaN(yearTo)) {
      filters.yearTo = yearTo
    }

    const result = await this.bookService.list({
      page,
      limit,
      search: {
        title: req.query.title as string,
        author: req.query.author as string
      },
      filters,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as "asc" | "desc"
    })

    successResponse(res, "Book berhasil diambil", result.books, {
      page: result.currentPage,
      limit,
      total: result.total
    })
  }




  async getById(req: Request, res: Response) {
    const book = await this.bookService.getById(req.params.id!)
    successResponse(res, "Book berhasil diambil", book, null, 201)
  }

  async create(req: Request, res: Response) {
    const book = await this.bookService.create(req.body)
    successResponse(res, "Book berhasil ditambahkan", book, null, 201)
  }

  async update(req: Request, res: Response) {
    const book = await this.bookService.update(req.params.id!, req.body)
    successResponse(res, "Book berhasil diupdate", book)
  }

  async remove(req: Request, res: Response) {
    const book = await this.bookService.delete(req.params.id!)
    successResponse(res, "Book berhasil dihapus", book)
  }
}
