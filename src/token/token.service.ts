import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenVerifyResponse } from "./interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService
    ) {}

    async verifyToken(
        token : string
    ) : Promise<TokenVerifyResponse> {
        try {
            const jwtSecret : string = this.configService.get<string>("JWT_SECRET");

            const verifyTokenResult = await this.jwtService.verifyAsync(token, {
                secret: jwtSecret
            });

            return {
                message: "Token válido."
            }
        } catch (error) {
            throw error;
        }
    }
}