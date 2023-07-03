import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto, SignUpDto } from "./dto";
import { SignInResponse } from "./interface";
import { PendingRegister, Prisma, PrismaClient, User } from "@prisma/client";
import * as crypto from "crypto-js";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { SignUpResponse } from "./interface/SignUp.interface";

@Injectable()
export class AuthService {
    private readonly prisma : PrismaClient;

    constructor(
        private readonly prismaService : PrismaService,
        private readonly configService : ConfigService,
        private readonly jwtService : JwtService
    ) {
        this.prisma = new PrismaClient();
    }

    
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
    ) : Promise<SignUpResponse> {
        try {
            const name : string = signUpDto.name;
            const login : string = signUpDto.login;
            const password : string = signUpDto.password;

            const hashedPassword : string = this.hashPassword(password);

            const user : User = await this.prismaService.user.findFirst({
                where: {
                    login: {
                        equals: login
                    }
                }
            });

            const pendingRegister : PendingRegister = await this.prismaService.pendingRegister.findFirst({
                where: {
                    AND: [
                        {
                            login: {
                                equals: login
                            }
                        }
                    ]
                }
            });

            if (user || pendingRegister) {
                throw new PrismaClientKnownRequestError("Já existe um usuário com este login.", "P2002", Prisma.prismaVersion.client);
            }

            const [createdPendingRegister] = await this.prisma.$transaction([
                this.prismaService.pendingRegister.create({
                    data: {
                        name,
                        login,
                        password: hashedPassword
                    }
                })
            ]);

            return {
                message: "Pedido de registro cadastrado com sucesso. Espere seu diretor aprovar seu cadastro."
            }
        } catch (error) {
            throw error;
        }
    }
}