import type { IUserRepository } from "../repository/user.repository"

export interface IUserService {
  getMe(userId: number): Promise<any>
  listUsers(): Promise<any[]>
  deleteUser(id: string): Promise<any>
}

export class UserServices implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async getMe(userId: number) {
    const user = await this.userRepo.findById(userId)
    if (!user) throw new Error("User tidak ditemukan")
    return user
  }

  async listUsers() {
    return this.userRepo.findAll()
  }

  async deleteUser(id: string) {
    return this.userRepo.softDelete(Number(id))
  }
}
