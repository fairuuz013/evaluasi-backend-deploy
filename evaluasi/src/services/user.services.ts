import * as userRepo from "../repositories/user.repository";

// ==============================
// GET ALL USERS (ADMIN)
// ==============================
export const getAllUsers = async () => {
  const users = await userRepo.findAllUsers();

  return {
    users,
    total: users.length,
  };
};

// ==============================
// GET USER BY ID
// ==============================
export const getUserById = async (id: string) => {
  const userId = Number(id);
  if (isNaN(userId)) {
    throw new Error("ID user tidak valid");
  }

  const user = await userRepo.findUserById(userId);

  if (!user || user.deletedAt) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};


// ==============================
// CREATE USER (REGISTER)
// ==============================
export const createUser = async (data: {
  email: string;
  username: string;
  password_hash: string;
  role?: string;
  profile: {
    name: string;
    address: string;
    gender: string;
    profile_picture_url?: string | null;
  };
}) => {
  if (!data.email || !data.password_hash) {
    throw new Error("Email dan password wajib diisi");
  }

  return userRepo.createUser({
    email: data.email,
    username: data.username,
    password_hash: data.password_hash,
    role: data.role || "MEMBER",
    profile: data.profile,
  });
};

// ==============================
// UPDATE USER PROFILE (MEMBER)
// ==============================
export const updateMyProfile = async (
  userId: number,
  data: {
    name?: string;
    address?: string;
    gender?: string;
    profile_picture_url?: string | null;
  }
) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Tidak ada data untuk diupdate");
  }

  return userRepo.updateUserProfile(userId, data);
};

// ==============================
// SOFT DELETE USER (ADMIN)
// ==============================
export const deleteUser = async (id: string) => {
  const userId = Number(id);
  if (isNaN(userId)) {
    throw new Error("ID user tidak valid");
  }

  return userRepo.softDeleteUser(userId);
};
