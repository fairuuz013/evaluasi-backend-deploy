import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/user.controller";
import { createUserValidation, getUserByIdValidation, validate } from "../middleware/user.validasion";


const router = Router()

router.get('/', getAll)

router.get('/search', search)

router.get('/:id', validate(getUserByIdValidation), getById)

router.post('/',  validate(createUserValidation)    , create)

router.put('/:id', update)

router.delete('/:id', remove)




export default router
