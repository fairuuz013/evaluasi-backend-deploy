import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { AdminService } from "../services/admin.service"

export class AdminController {
  constructor(private adminService: AdminService) {
    this.stats = this.stats.bind(this)
  }

  async stats(_req: Request, res: Response) {
    const data = await this.adminService.getStats()
    successResponse(res, "Statistik admin", data)
  }
}
