import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";


export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return errorResponse(res, "Akses khusus ADMIN", 403);
  }

  next();
};