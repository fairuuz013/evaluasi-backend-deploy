import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { createBook, deleteBook, getAllBooks, getBookById, searchBook, updateBook } from "../services/book.services";




export const getAll = (_req: Request, res: Response ) => {
    const { books, total } = getAllBooks()
    successResponse(
        res, "Daftar Buku",
        
        {
            jumlah: total,
            data: books
        }
    )

}


export const getById = (req: Request, res: Response) => {
    if (!req.params.id) {
        return errorResponse(
            res,
            "No parameter sir"
        )
    }
    const book = getBookById(req.params.id!,)

    successResponse(
        res, "Book found men",
        book
    )
}



export const search =  (req: Request, res: Response) => {
    const { judul, penulis } = req.query

    const result = searchBook(judul?.toString(),
    penulis?.toString())

    successResponse(
        res,
        'Books found',
        result
    )

}


export const create = (req: Request, res: Response) => {
    const { judul, penulis, release } = req.body;

    const books = createBook(judul,
        penulis, release
    )

    
    successResponse(
        res,
        "buku berasil di tambah",
        books,
        null,
        201
    )
}


export const update = (req: Request, res: Response) => {
   
    const book = updateBook(req.params.id!, req.body,)
    
    
  successResponse(
    res, 
    "update book",
    book
  )
}



export const remove = (req: Request, res: Response) => {
    
    const deleted = deleteBook(req.params.id!)
    
    successResponse(
        res,
        "Books delete",
        deleted
    )
}