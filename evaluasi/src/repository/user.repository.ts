import type { PrismaClient, User } from "../generated"

export interface IUserRepository {
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  softDelete(id: number): Promise<User>
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      include: { profile: true }
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      include: { profile: true }
    })
  }

  softDelete(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  }
}
