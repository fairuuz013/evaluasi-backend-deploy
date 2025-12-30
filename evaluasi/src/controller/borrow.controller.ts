// controller/borrow.controller.ts
import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IBorrowService } from "../services/borrow.services"

export class BorrowController {
  constructor(private borrowService: IBorrowService) {
    this.list = this.list.bind(this)
    this.getById = this.getById.bind(this)
    this.borrow = this.borrow.bind(this)
    this.returnBorrow = this.returnBorrow.bind(this)
  }

  async list(req: Request, res: Response) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const filters: {
    status?: "BORROWED" | "RETURNED"
    memberName?: string
    startDate?: Date
    endDate?: Date
  } = {}

  // status
  if (
    req.query.status === "BORROWED" ||
    req.query.status === "RETURNED"
  ) {
    filters.status = req.query.status
  }

  // member name
  if (typeof req.query.memberName === "string") {
    filters.memberName = req.query.memberName
  }

  // start date
  if (req.query.startDate) {
    const d = new Date(req.query.startDate as string)
    if (!isNaN(d.getTime())) {
      filters.startDate = d
    }
  }

  // end date
  if (req.query.endDate) {
    const d = new Date(req.query.endDate as string)
    if (!isNaN(d.getTime())) {
      filters.endDate = d
    }
  }

  const result = await this.borrowService.list({
    page,
    limit,
    filters
  })

  successResponse(res, "Data peminjaman berhasil diambil", result.borrows, {
    page: result.currentPage,
    limit,
    total: result.total
  })
}

  async getById(req: Request, res: Response) {
    const data = await this.borrowService.getById(req.params.id!)
    successResponse(res, "Detail peminjaman", data, null, 201)
  }

  async borrow(req: Request, res: Response) {
    const userId = req.user!.id
    const items = req.body.items

    const data = await this.borrowService.borrow(userId, items)

    successResponse(res, "Peminjaman berhasil", data, null, 201)
  }

  async returnBorrow(req: Request, res: Response) {
    const data = await this.borrowService.returnBorrow(req.params.id!)
    successResponse(res, "Buku berhasil dikembalikan", data)
  }
}
