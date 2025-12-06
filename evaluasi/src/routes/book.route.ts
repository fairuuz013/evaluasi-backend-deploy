import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/book.controller";
import { createBookValidation, getBookByIdValidation, validate } from "../middleware/book.validasion";


const router = Router()

router.get('/', getAll)

router.get('/search', search)

router.get('/:id', validate(getBookByIdValidation),  getById)

router.post('/', validate(createBookValidation), create );

router.put('/:id', update)

router.delete('/:id', remove)



export default router