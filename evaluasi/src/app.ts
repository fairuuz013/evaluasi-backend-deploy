import express from "express";
import { successResponse } from "./utils/response";
import bookRouter from "./routes/book.route";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middleware/error.handler";

const app = express();

app.use(express.json());

// =====================
// ROOT
// =====================
app.get("/", (_req, res) => {
  successResponse(res, "Welcome to API Perpustakaan", {
    hari: 4,
    status: "Server Hidup",
  });
});

// =====================
// ROUTES
// =====================
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
});

// =====================
// ERROR HANDLER (PALING BAWAH)
// =====================
app.use(errorHandler);

export default app