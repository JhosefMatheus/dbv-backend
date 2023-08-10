import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { SignInDto } from "./dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {}

    @Post("signIn")
    async signIn(
        @Res() res : Response,
        @Body() signInDto : SignInDto
    ) : Promise<Response> {
        try {
            const { message, token } = await this.authService.signIn(signInDto);

            return res.status(200).json({
                message,
                token
            });
        } catch (error) {
            console.log(error);

            if (error.code === "P2025") {
                return res.status(401).json({
                    message: "Login ou senha inválidas."
                });
            }
            
            return res.status(500).json({
                message: error.message
            });
        }
    }
}