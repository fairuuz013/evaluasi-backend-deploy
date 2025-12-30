import { Router } from "express"

import { authenticate } from "../middleware/auth.middleware"

import { BorrowRepository } from "../repository/borrow.repository"
import { BorrowServices } from "../services/borrow.services"
import { BorrowController } from "../controller/borrow.controller"
import prismaInstance from "../database"

const router = Router()


const borrowRepo = new BorrowRepository(prismaInstance)
const borrowService = new BorrowServices(borrowRepo, prismaInstance)
const borrowController = new BorrowController(borrowService)
    
/**
 * USER
 */


/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API peminjaman buku
 */

router.post("/", authenticate, borrowController.borrow)
/**
 * @swagger
 * /api/borrows:
 *   post:
 *     summary: Pinjam buku
 *     description: User melakukan peminjaman satu atau lebih buku
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [bookId, qty]
 *                   properties:
 *                     bookId:
 *                       type: integer
 *                       example: 1
 *                     qty:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Peminjaman berhasil
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Token tidak ditemukan
 *       500:
 *         description: Server error
 */


router.post("/:id/return", authenticate, borrowController.returnBorrow)
/**
 * @swagger
 * /api/borrows/{id}/return:
 *   post:
 *     summary: Kembalikan buku
 *     description: User mengembalikan buku yang dipinjam
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Buku berhasil dikembalikan
 *       404:
 *         description: Data peminjaman tidak ditemukan
 *       401:
 *         description: Unauthorized
 */



/**
 * ADMIN
 */
router.get("/", authenticate, borrowController.list)
/**
 * @swagger
 * /api/borrows:
 *   get:
 *     summary: List semua peminjaman (Admin)
 *     description: Admin dapat melihat dan memfilter data peminjaman
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [BORROWED, RETURNED]
 *       - in: query
 *         name: memberName
 *         schema:
 *           type: string
 *           example: fairuuz
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Data peminjaman berhasil diambil
 *       403:
 *         description: Akses khusus ADMIN
 *       401:
 *         description: Unauthorized
 */



export default router
