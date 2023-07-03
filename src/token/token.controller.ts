import { Controller, Get, Headers, Res } from "@nestjs/common";
import { TokenService } from "./token.service";
import { Response } from "express";

@Controller("token")
export class TokenController {
    constructor(
        private readonly tokenService : TokenService
    ) {}

    @Get("verify")
    async verifyToken(
        @Headers("authorization") authorization : string,
        @Res() response : Response
    ) : Promise<Response> {
        try {
            if (!authorization) {
                return response.status(401).json({
                    message: "Token não informado."
                });
            }
    
            const token : string = authorization.replace("Bearer ", "");
    
            const { message } = await this.tokenService.verifyToken(token);
    
            return response.status(200).json({
                message
            });
        } catch (error) {
            if (error instanceof Object) {
                return response.status(401).json({
                    message: "Token inválido."
                });
            }

            return response.status(500).json({
                message: "Erro interno no servidor."
            });
        }
    }
}