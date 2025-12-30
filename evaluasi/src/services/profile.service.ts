import type { IProfileRepository } from "../repository/profile.repository"

export interface IProfileService {
  upsertProfile(userId: number, data: any): Promise<any>
  getMyProfile(userId: number): Promise<any>
}

export class ProfileServices implements IProfileService {
  constructor(private profileRepo: IProfileRepository) {}

  async getMyProfile(userId: number) {
    return this.profileRepo.findByUserId(userId)
  }

  async upsertProfile(userId: number, data: any) {
    const profile = await this.profileRepo.findByUserId(userId)

    if (profile) {
      return this.profileRepo.update(userId, data)
    }

    return this.profileRepo.create({
      ...data,
      user: { connect: { id: userId } }
    })
  }
}
