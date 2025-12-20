import { getPrisma } from "../prisma";
import * as borrowRepo from "../repositories/borrow.repository";

const prisma = getPrisma();

/**
 * ============================
 * 1️⃣ ADMIN – lihat semua
 * ============================
 */
export const getAllBorrows = async () => {
  return borrowRepo.findAllBoorows();
};

/**
 * ============================
 * 2️⃣ DETAIL (ADMIN / OWNER)
 * ============================
 */
export const getBorrowById = async (
  borrowId: number,
  userId: number,
  role: string
) => {
  const borrow = await borrowRepo.findBorrowById(borrowId);

  if (!borrow) {
    throw new Error("Data peminjaman tidak ditemukan");
  }

  if (role !== "ADMIN" && borrow.userId !== userId) {
    throw new Error("Tidak punya akses");
  }

  return borrow;
};

/**
 * ============================
 * 3️⃣ MEMBER – riwayat sendiri
 * ============================
 */
export const getBorrowsByUserId = async (userId: number) => {
  return borrowRepo.findBorrowsByUserId(userId);
};

/**
 * ============================
 * 4️⃣ MEMBER – pinjam buku
 * ============================
 */
export const borrowBooks = async (
  userId: number,
  items: { bookId: number; qty: number }[]
) => {
  if (!items || items.length === 0) {
    throw new Error("Item peminjaman tidak boleh kosong");
  }

  return prisma.$transaction(async (tx) => {
    // 1. Ambil buku
    const books = await tx.book.findMany({
      where: { id: { in: items.map(i => i.bookId) } }
    });

    // 2. Validasi stok
    for (const item of items) {
      const book = books.find(b => b.id === item.bookId);
      if (!book || book.stock < item.qty) {
        throw new Error(`Stok buku tidak cukup (ID: ${item.bookId})`);
      }
    }

    // 3. Buat borrow record
    const borrow = await tx.borrowRecord.create({
      data: { userId }
    });

    // 4. Buat borrow items
    await tx.borrowItem.createMany({
      data: items.map(item => ({
        borrowId: borrow.id,
        bookId: item.bookId,
        qty: item.qty
      }))
    });

    // 5. Kurangi stok buku
    for (const item of items) {
      const book = books.find(b => b.id === item.bookId)!;
      await tx.book.update({
        where: { id: book.id },
        data: { stock: book.stock - item.qty }
      });
    }

    return borrow;
  });
};

/**
 * ============================
 * 5️⃣ MEMBER / ADMIN – return
 * ============================
 */
export const returnBorrow = async (borrowId: number) => {
  return prisma.$transaction(async (tx) => {
    const borrow = await tx.borrowRecord.findUnique({
      where: { id: borrowId },
      include: { items: true }
    });

    if (!borrow || borrow.status === "RETURNED") {
      throw new Error("Data peminjaman tidak valid");
    }

    // Tambah stok kembali
    for (const item of borrow.items) {
      await tx.book.update({
        where: { id: item.bookId },
        data: { stock: { increment: item.qty } }
      });
    }

    // Update status
    return tx.borrowRecord.update({
      where: { id: borrowId },
      data: { status: "RETURNED" }
    });
  });
};

/**
 * ============================
 * 6️⃣ ADMIN – soft delete
 * ============================
 */
export const deleteBorrow = async (borrowId: number) => {
  const borrow = await borrowRepo.findBorrowById(borrowId);

  if (!borrow) {
    throw new Error("Data peminjaman tidak ditemukan");
  }

  return borrowRepo.softDeleteBorrow(borrowId);
};
