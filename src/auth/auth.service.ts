import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";
import { SignInResponse } from "./interface";
import { User } from "@prisma/client";
import * as crypto from "crypto-js";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService : PrismaService,
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService
    ) {}

    
    private hashPassword(
        password : string
    ) : string {
        const hashedPassword : string = crypto.SHA256(password).toString();

        return hashedPassword;
    }

    private async generateToken(
        user : User
    ) : Promise<string> {
        const payload : object = {
            id: user.id,
            login: user.login,
            name: user.name,
            roleId: user.roleId
        }

        const jwtOptions : object = {
            secret: this.configService.get<string>("JWT_SECRET"),
            expiresIn: "2d"
        }

        const token : string  = await this.jwtService.signAsync(payload, jwtOptions);

        return token;
    }

    async signIn(
        signInDto : SignInDto
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

            const token : string = await this.generateToken(searchedUser);

            return {
                message: "Usuário logado com sucesso.",
                token
            }
        } catch (error) {
            throw error;
        }
    }

    async signUp(
        signUpDto : SignUpDto
    ) : Promise<void> {
        try {

        } catch (error) {
            throw error;
        }
    }
}