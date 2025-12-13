import type { NextFunction, Request, Response } from "express";
import { body, param, validationResult, type ValidationChain } from "express-validator";
import { errorResponse } from "../utils/response";

export const validate = (validations: ValidationChain[]) => { 
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorList = errors.array().map(err => ({
      field: err.type === 'field' ? err.path : 'unknown',
      message: err.msg
    }));

    return errorResponse(res, 'Validasi gagal', 400, errorList);
  };
};


export const createUserValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama buku wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama Judul user minimal 3 karakter'),
  
  body('city')
    .trim()
    .notEmpty().withMessage('asal wajib diisi'),
  
  body('age')
    .isNumeric().withMessage('release harus angka ngga boleh string')
    .custom(value => value > 0).withMessage('harus isi umur')
];

// Validasi untuk GET by ID produk
export const getUserByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];



