import express from "express";
import { successResponse } from "./utils/response";
import bookRouter from "./routes/book.route";
import userRouter from "./routes/user.route"
import { apiKey, logging } from "./middleware/book.validasion";
import { errorHandler } from "./middleware/error.handler";


const app = express();
app.use(express.json());

app.use (apiKey)

app.use (logging)

// route utama
app.get('/', (_req, res) => {
    successResponse(res, "Welcome to API Perpustakaan", {
        hari: 4,
        status: "Server Hidup"
    });    
});    


app.use (errorHandler)

// DAFTARIN ROUTE BUKU D DI SINI
app.use('/api/users', userRouter)
app.use('/api/books', bookRouter);


// middleware 404 (jangan throw error!)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} tidak ditemukan`
    });
});

export default app;
