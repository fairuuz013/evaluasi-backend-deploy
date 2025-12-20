import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const findAllUsers = async () => {
  return prisma.user.findMany({
    where: { deletedAt: null },
    include: { profile: true },
  });
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });
};


export const createUser = async (data: {
  email: string;
  password_hash: string;
  username: string;
  role?: string;
  profile: {
    name: string;
    address: string;
    gender: string;
    profile_picture_url?: string | null;
  };
}) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? "MEMBER",
      username: data.username ?? null,
      profile: {
        create: {
          name: data.profile.name,
          address: data.profile.address,
          gender: data.profile.gender,
          profile_picture_url: data.profile.profile_picture_url ?? null,
        },
      },
    },
    include: { profile: true },
  });
};


export const updateUserProfile = async (
  userId: number,
  data: {
    name?: string;
    address?: string;
    gender?: string;
    profile_picture_url?: string | null;
  }
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      profile: {
        update: data,
      },
    },
    include: { profile: true },
  });
};

export const softDeleteUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
