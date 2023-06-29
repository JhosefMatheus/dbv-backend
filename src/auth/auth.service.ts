import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto } from "./dto";
import { SignInResponse } from "./interface";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async signIn(
        signInDto: SignInDto
    ) : Promise<SignInResponse> {
        try {
            const login : string = signInDto.login;
            const password : string = signInDto.password;

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
                                equals: password
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