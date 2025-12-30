import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IProfileService } from "../services/profile.service"

export class ProfileController {
  constructor(private profileService: IProfileService) {}

  me = async (req: Request, res: Response) => {
    const profile = await this.profileService.getMyProfile(req.user!.id)
    successResponse(res, "Profile saya", profile)
  }

  update = async (req: Request, res: Response) => {
    const profile = await this.profileService.upsertProfile(req.user!.id, req.body)
    successResponse(res, "Profile diperbarui", profile)
  }
}
