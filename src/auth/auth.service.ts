import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto } from "./dto";
import { SignInResponse } from "./interface";
import { User } from "@prisma/client";
import * as crypto from "crypto-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService
    ) {}

    
    private hashPassword(password: string) : string {
        const hashedPassword = crypto.SHA256(password).toString();

        return hashedPassword;
    }

    async signIn(
        signInDto: SignInDto
    ) : Promise<SignInResponse> {
        try {
            const login : string = signInDto.login;
            const password : string = signInDto.password;

            const hashedPassword : string = this.hashPassword(password);

            const searchedUser : User = await this.prismaService.user.findFirstOrThrow({
                where: {
                    AND: [
                        {
                            login: {
                                equals: login
                            }
                        },
                        {
                            password: {
                                equals: hashedPassword
                            }
                        }
                    ]
                }
            });

            return {
                message: "Usuário logado com sucesso."
            }
        } catch (error) {
            throw error;
        }
    }

    async signUp() : Promise<void> {}
}