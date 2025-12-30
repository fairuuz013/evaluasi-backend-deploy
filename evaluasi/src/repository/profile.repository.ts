import type { Prisma, PrismaClient, Profile } from "../generated"

export interface IProfileRepository {
  findByUserId(userId: number): Promise<Profile | null>
  create(data: Prisma.ProfileCreateInput): Promise<Profile>
  update(userId: number, data: Prisma.ProfileUpdateInput): Promise<Profile>
}

export class ProfileRepository implements IProfileRepository {
  constructor(private prisma: PrismaClient) {}

  findByUserId(userId: number) {
    return this.prisma.profile.findUnique({
      where: { userId }
    })
  }

  create(data: Prisma.ProfileCreateInput) {
    return this.prisma.profile.create({ data })
  }

  update(userId: number, data: Prisma.ProfileUpdateInput) {
    return this.prisma.profile.update({
      where: { userId },
      data
    })
  }
}
