import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import config from "../utils/env"


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return errorResponse(res, 'Token tidak ditemukan', 401);
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return errorResponse(res, 'Token tidak valid', 401);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    req.user = decoded; 
    next();
  } catch (error) {
    return errorResponse(res, 'Token tidak valid', 401);
  }
};