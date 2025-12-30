import { Router } from "express"


import { authenticate } from "../middleware/auth.middleware"
import { adminOnly } from "../middleware/admin.middleware"

import { UserRepository } from "../repository/user.repository"
import { ProfileRepository } from "../repository/profile.repository"

import { UserServices } from "../services/user.services"
import { ProfileServices } from "../services/profile.service"

import { UserController } from "../controller/user.controller"
import { ProfileController } from "../controller/profile.controller"
import prismaInstance from "../database"

const router = Router()


// DI
const userRepo = new UserRepository(prismaInstance)
const profileRepo = new ProfileRepository(prismaInstance)

const userService = new UserServices(userRepo)
const profileService = new ProfileServices(profileRepo)

const userController = new UserController(userService)
const profileController = new ProfileController(profileService)

/**
 * USER
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User & Profile Management
 */


/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Ambil data user yang sedang login
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data user berhasil diambil
 *       401:
 *         description: Token tidak valid / tidak ada
 */
router.get("/me", authenticate, userController.me)

/**
 * PROFILE
 */
/**
 * @swagger
 * /api/users/me/profile:
 *   get:
 *     summary: Ambil profile user sendiri
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile berhasil diambil
 *       401:
 *         description: Token tidak valid
 */
router.get("/me/profile", authenticate, profileController.me)

/**
 * @swagger
 * /api/users/me/profile:
 *   put:
 *     summary: Update atau buat profile user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile berhasil diperbarui
 *       401:
 *         description: Token tidak valid
 */
router.put("/me/profile", authenticate, profileController.update)


/**
 * ADMIN ONLY
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Ambil semua data user (ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List user berhasil diambil
 *       401:
 *         description: Token tidak valid
 *       403:
 *         description: Akses khusus ADMIN
 */
router.get("/", authenticate, adminOnly, userController.list)



/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Hapus user (soft delete) - ADMIN
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       401:
 *         description: Token tidak valid
 *       403:
 *         description: Akses khusus ADMIN
 */
router.delete("/:id", authenticate, adminOnly, userController.delete)


export default router
