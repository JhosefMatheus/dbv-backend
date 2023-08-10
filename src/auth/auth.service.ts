import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto";
import { SignInResponse } from "./interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as CryptoJs from "crypto-js";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService : PrismaService,
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService
    ) {}

    private hashPassword(password : string) : string {
        const hashedPassword = CryptoJs.SHA256(password).toString();

        return hashedPassword;
    }

    private async generateToken(user : User) : Promise<string> {
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            login: user.login
        }

        const jwtOptions : { expiresIn : string; secret : string } = {
            expiresIn: "2d",
            secret: this.configService.get<string>("JWT_SECRET")
        }

        const token : string = await this.jwtService.signAsync(payload, jwtOptions);

        return token;
    }

    async signIn(
        signInDto : SignInDto
    ) : Promise<SignInResponse> {
        try {
            const { login, password } = signInDto;

            const hashedPassword : string = this.hashPassword(password);

            const user : User = await this.prismaService.user.findFirstOrThrow({
                where: {
                    login: {
                        equals: login
                    },
                    password: {
                        equals: hashedPassword
                    }
                }
            });

            const token : string = await this.generateToken(user);

            return {
                message: "Usuário logado com sucesso.",
                token
            }
        } catch (error) {
            throw error;
        }
    }
}