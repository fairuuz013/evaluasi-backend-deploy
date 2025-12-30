import { Router } from "express"


import { adminOnly } from "../middleware/admin.middleware"

import { BookRepository } from "../repository/book.repository"
import { BookServices } from "../services/book.service"
import { BookController } from "../controller/book.controller"
import prismaInstance from "../database"

const router = Router()


// DI
const bookRepo = new BookRepository(prismaInstance)
const bookService = new BookServices(bookRepo)
const bookController = new BookController(bookService)

/**
 * PUBLIC / AUTH USER
 */



/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Manajemen data buku
 */




/**
 * @swagger
 * /books:
 *   get:
 *     summary: Ambil daftar buku
 *     description: |
 *       Menampilkan daftar buku dengan fitur:
 *       - Pagination
 *       - Search (title, author)
 *       - Filter stok & tahun terbit
 *       - Sorting
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         example: Clean Code
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         example: Robert Martin
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         example: true
 *       - in: query
 *         name: yearFrom
 *         schema:
 *           type: integer
 *         example: 2015
 *       - in: query
 *         name: yearTo
 *         schema:
 *           type: integer
 *         example: 2023
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: desc
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil
 *       401:
 *         description: Unauthorized
 */
router.get("/",  bookController.list)






/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Ambil detail buku
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detail buku berhasil diambil
 *       404:
 *         description: Book tidak ditemukan
 */
router.get("/:id", bookController.getById)



/**
 * ADMIN ONLY
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tambah buku baru
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Clean Code
 *             author: Robert C. Martin
 *             stock: 10
 *             cover: https://image.com/cover.jpg
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Akses khusus admin
 */
router.post("/", adminOnly, bookController.create)








/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update data buku
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             stock: 20
 *     responses:
 *       200:
 *         description: Buku berhasil diupdate
 *       404:
 *         description: Book tidak ditemukan
 */
router.put("/:id",  adminOnly, bookController.update)





/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Hapus buku (soft delete)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Book tidak ditemukan
 */
router.delete("/:id",  adminOnly, bookController.remove)






export default router
