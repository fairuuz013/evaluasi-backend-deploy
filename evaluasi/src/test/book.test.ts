// import request from "supertest"
// import jwt from "jsonwebtoken"
// import app from "../app"
// import config from "../utils/env"

// describe("BOOK API", () => {

//   /**
//    * =========================
//    * GET /api/books
//    * =========================
//    */
// //   describe("GET /api/books", () => {

// //     it("✅ should return 200 and list of books", async () => {
// //       const res = await request(app)
// //         .get("/api/books")
// //         .query({ page: 1, limit: 10 })

// //       expect(res.statusCode).toBe(200)
// //       expect(res.body.success).toBe(true)
// //       expect(Array.isArray(res.body.data)).toBe(true)
// //       expect(res.body.meta).toHaveProperty("page")
// //       expect(res.body.meta).toHaveProperty("total")
// //     })

// //     it("❌ should return empty array if no book found", async () => {
// //       const res = await request(app)
// //         .get("/api/books")
// //         .query({ title: "judul-yang-ga-ada" })

// //       expect(res.statusCode).toBe(200)
// //       expect(res.body.success).toBe(true)
// //       expect(Array.isArray(res.body.data)).toBe(true)
// //       expect(res.body.data.length).toBe(0)
// //     })
// //   })

// //   /**
// //    * =========================
// //    * POST /api/books
// //    * =========================
// //    */
// //   describe("POST /api/books", () => {
// //     const token = jwt.sign(
// //       { id: 1, role: "ADMIN" },
// //       config.JWT_SECRET
// //     )

// //     it("❌ should return 401 if no token provided", async () => {
// //       const res = await request(app)
// //         .post("/api/books")
// //         .send({
// //           title: "Clean Code",
// //           author: "Robert C. Martin",
// //           stock: 10
// //         })

// //       expect(res.statusCode).toBe(401)
// //       expect(res.body.success).toBe(false)
// //     })

// //     it("✅ should return 201 and created book", async () => {
// //       const res = await request(app)
// //         .post("/api/books")
// //         .set("Authorization", `Bearer ${token}`)
// //         .send({
// //           title: "Clean Architecture",
// //           author: "Robert C. Martin",
// //           stock: 5
// //         })

// //       expect(res.statusCode).toBe(201)
// //       expect(res.body.success).toBe(true)
// //       expect(res.body.data).toHaveProperty("id")
// //       expect(res.body.data.title).toBe("Clean Architecture")
// //     })
// //   })

// //   /**
// //    * =========================
// //    * GET /api/books/:id
// //    * =========================
// //    */
// //   describe("GET /api/books/:id", () => {

// //     it("✅ should return 201 and book detail", async () => {
// //       const res = await request(app)
// //         .get("/api/books/1")

// //       expect(res.statusCode).toBe(201)
// //       expect(res.body.success).toBe(true)
// //       expect(res.body.data).toHaveProperty("id")
// //       expect(res.body.data).toHaveProperty("title")
// //     })

// //     it("❌ should return error if book not found", async () => {
// //       const res = await request(app)
// //         .get("/api/books/99999")

// //       expect(res.statusCode).toBe(500) // sesuai implementasi kamu (throw Error)
// //       expect(res.body.success).toBe(false)
// //     })
// //   })

// })
