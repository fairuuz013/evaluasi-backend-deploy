import type { Request, Response, NextFunction } from "express";


export const validateBorrowRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { items } = req.body;

  // items harus array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Items harus berupa array dan tidak boleh kosong"
    });
  }

  for (const item of items) {
    if (
      typeof item.bookId !== "number" ||
      typeof item.qty !== "number"
    ) {
      return res.status(400).json({
        message: "Setiap item harus memiliki bookId dan qty bertipe number"
      });
    }

    if (item.qty <= 0) {
      return res.status(400).json({
        message: "Qty harus lebih besar dari 0"
      });
    }
  }

  next();
};

/*
 */
export const validateBorrowIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({
      message: "Borrow ID harus berupa angka"
    });
  }

  next();
};
