import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/env";
import type { IAuthRepository } from "../repository/auth.repository";

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  async register(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const existing = await this.authRepo.findByEmail(data.email);
    if (existing) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.authRepo.createUser({
      username: data.username,
      email: data.email,
      password_hash: hashedPassword,
      role: "MEMBER",
    });
  }

  async login(email: string, password: string) {
    const user = await this.authRepo.findByEmail(email);
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new Error("Email atau password salah");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token };
  }
}
