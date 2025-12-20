import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const findAllBoorows = async () => {
    return prisma.borrowRecord.findMany({
        include:{
            user: true,
            items: {
                include: { book: true }
            }
        }
    });
};

export const findBorrowById = async (id: number) => {
  return prisma.borrowRecord.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: { book: true }
      }
    }
  });
};



export const findBorrowsByUserId = async (userId: number) => {
  return prisma.borrowRecord.findMany({
    where: { userId },
    include: {
      items: {
        include: { book: true }
      }
    }
  });
};



export const createBorrowRecord = async (userId: number) => {
  return prisma.borrowRecord.create({
    data: { userId }
  });
};



export const createBorrowItems = async (
  items: {
    borrowId: number;
    bookId: number;
    qty: number;
  }[]
) => {
  return prisma.borrowItem.createMany({
    data: items
  });
};


export const updateBorrowStatus = async (
  borrowId: number,
  status: string
) => {
  return prisma.borrowRecord.update({
    where: { id: borrowId },
    data: { status }
  });
};



export const softDeleteBorrow = async (borrowId: number) => {
  return prisma.borrowRecord.update({
    where: { id: borrowId },
    data: { status: "DELETED" }
  });
};