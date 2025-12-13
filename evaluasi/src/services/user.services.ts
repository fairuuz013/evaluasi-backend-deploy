import type { User } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

// ROUTE USER

// GET ALL 
export const getAllUsers = async (): Promise<{ users: User[]; total: number }> => {
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });

  return {
    users,
    total: users.length,
  };
};



// GET ById
export const getUserByid = async (id: string): Promise<User> => {
  const numId = parseInt(id)

  const user = await prisma.user.findUnique({
    where: { id: numId }
  })

  if (!user || user.deletedAt !== null) {
    throw new Error("User tidak ditemukan")
  }

  return user
};






// GET Search 
export const searchUser = async (
  name?: string,
  city?: string,
  min_age?: number,
  max_age?: number
): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      deletedAt: null,

      ...(name && {
        name: {
          contains: name,
          mode: "insensitive"
        }
      }),

      ...(city && {
        city: {
          contains: city,
          mode: "insensitive"
        }
      }),

      ...(min_age || max_age
        ? {
          age: {
            ...(min_age && { gte: min_age }),
            ...(max_age && { lte: max_age })

          }
        }
        : {})
    }
  })
}




// CREATE 
export const createUser = async (data: {
  name: string
  city: string
  age: number
}): Promise<User> => {
  return await prisma.user.create({
    data: {
      name: data.name,
      city: data.city,
      age: data.age
    }
  })
}



// UPDATE 
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const numId = parseInt(id)

  return await prisma.user.update({
    where: {
      id: numId,
      deletedAt: null
    },
    data
  })
}



// delete 
export const deleteUser = async (id: string): Promise<User> => {
  const numId = parseInt(id)

  const user = await prisma.user.findUnique({
    where: { id: numId }
  })

  if (!user || user.deletedAt !== null) {
    throw new Error("User tidak ditemukan atau sudah dihapus")
  }

  return await prisma.user.update({
    where: { id: numId },
    data: {
      deletedAt: new Date()
    }
  })
}