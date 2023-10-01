import {
    Body,
    Controller,
    Post,
    Res,
    UnauthorizedException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { SeverityWarningEnum } from "src/enums";
import { SignInDto } from "./dto";
import { SignInResponse } from "./response.ts";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("signIn")
    async signIn(
        @Res() res: Response,
        @Body() signInDto: SignInDto
    ): Promise<Response> {
        try {
            const signInRespponse: SignInResponse = await this.authService.signIn(signInDto);

            return res.status(200).json({
                ...signInRespponse
            });
        } catch (error: any) {
            if (error instanceof UnauthorizedException) {
                return res.status(401).json({
                    message: error.message,
                    severityWarning: SeverityWarningEnum.WARNING
                });
            }

            return res.status(500).json({
                messae: "Erro inesperado no servidor ao realizar o login.",
                severityWarning: SeverityWarningEnum.ERROR
            });
        }
    }
}