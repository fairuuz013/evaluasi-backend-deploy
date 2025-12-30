import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IUserService } from "../services/user.services"

export class UserController {
  constructor(private userService: IUserService) {}

  me = async (req: Request, res: Response) => {
    const user = await this.userService.getMe(req.user!.id)
    successResponse(res, "Data user", user)
  }

  list = async (_req: Request, res: Response) => {
    const users = await this.userService.listUsers()
    successResponse(res, "List user", users)
  }

  delete = async (req: Request, res: Response) => {
    const user = await this.userService.deleteUser(req.params.id!)
    successResponse(res, "User dihapus", user)
  }
}
