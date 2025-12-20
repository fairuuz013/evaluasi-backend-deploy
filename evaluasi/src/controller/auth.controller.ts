import type { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";

// ==============================
// REGISTER
// ==============================
export const registerController = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        return successResponse(res,
            "Register berhasil",
            user,
            null,
            201
        );
    } catch (err: any) {
        return errorResponse(res, err.message, 400);
    }
};

// ==============================
// LOGIN
// ==============================
export const loginController = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body);
        return successResponse(
            res,
            "Login berhasil",
            result,
            null,
            201
        );
    } catch (err: any) {
        return errorResponse(res, err.message, 401);
    }
};
