import { getPrisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/env";

const prisma = getPrisma();

// =======================
// REGISTER
// =======================
export const register = async (data: {
    username: string;
    email: string;
    password: string;
    role?: string
}) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
    if (existingUser) {
        throw new Error("Email sudah terdaftar")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password_hash: hashedPassword,
            role: data.role || "USER"
        },
    })

    return {
        email: user.email,
        name: user.username,
        role: user.role
    }
}





export const login = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Email atau password salah");
  }

  const isValid = await bcrypt.compare(data.password, user.password_hash);
  if (!isValid) {
    throw new Error("Email atau password salah");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role ?? "USER",
    },
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};
