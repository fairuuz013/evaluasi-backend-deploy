import { PrismaClient } from "../generated";

export interface IAuthRepository {
  findByEmail(email: string): Promise<any | null>;
  createUser(data: {
    username: string;
    email: string;
    password_hash: string;
    role: string;
  }): Promise<any>;
}

export class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaClient) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  createUser(data: {
    username: string;
    email: string;
    password_hash: string;
    role: string;
  }) {
    return this.prisma.user.create({ data });
  }
}
