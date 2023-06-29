import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { SignInDto } from "./dto";
import { NotFoundError } from "@prisma/client/runtime";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signIn")
    async signIn(
        @Res() response: Response,
        @Body() signInDto: SignInDto
    ) : Promise<Response> {
        try {
            const { message } = await this.authService.signIn(signInDto);

            return response.status(200).json({
                message
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return response.status(401).json({
                    message: "Login ou senha inválidos."
                });
            }

            return response.status(500).json({
                message: "Erro interno do servidor."
            });
        }
    }

    @Post("signUp")
    async signUp(
        @Res() response: Response
    ) : Promise<Response> {
        return response.status(200).json({
            message: "Sign up"
        });
    }
}