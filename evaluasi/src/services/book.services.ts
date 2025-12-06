import { books, type Books } from "../models/books.model"

export const getAllBooks = () => {
    return { books, total: books.length }
}



export const getBookById = (id: string) => {
    const numId = parseInt(id)
    const book = books.find(b => b.id === numId);

    if (!book) {
        throw new Error("Not found book")
    }
    return book

}


export const searchBook = (judul?: string, penulis?: string) => {
    let result = books;

    if (judul) {
        result = result.filter(b =>
            b.judul.toLowerCase().includes(judul.toLowerCase())
        );
    }

    if (penulis) {
        result = result.filter(b =>
            b.penulis.toLowerCase().trim() === penulis.toLowerCase().trim()
        );
    }

    return result;
}



export const createBook = (judul: string,
    penulis: string, release: number) => {

    const newBook: Books = {
        id: books.length + 1,
        judul,
        penulis,
        release
    };
    books.push(newBook);

    return books
}



export const updateBook = (id: string, data: any) => {
    const numId = parseInt(id)
    const index = books.findIndex(b => b.id === numId)

    if (index === -1) {
        throw new Error("buku tidak di temukan")
    }
    books[index] = { ...books[index], ...data }
    return books[index]
}




export const deleteBook = (id: string) => {
    const numId = parseInt(id);
    const index = books.findIndex(s => s.id === numId);


    if (index === -1) {
        throw new Error, "Book success delete"
    }
    const deleted = books.splice(index, 1)

    return deleted
}