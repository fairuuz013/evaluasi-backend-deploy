import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);
    successResponse(res, "Register berhasil", user, null, 201);
  };

  login = async (req: Request, res: Response) => {
    const result = await this.authService.login(
      req.body.email,
      req.body.password
    );
    successResponse(res, "Login berhasil", result);
  };
}
