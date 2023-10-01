import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInResponse } from "./response.ts";
import { SignInDto } from "./dto/sign-in.dto.js";
import { FuncService } from "../func/func.service.js";
import { SeverityWarningEnum } from "../enum/SeverityWarning.enum.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly funcService: FuncService
    ) {}

    async signIn(signInDto: SignInDto): Promise<SignInResponse> {
        try {
            const hashedPassword: string = this.funcService.hashText(signInDto.password);

            await this.prismaService.user.findFirstOrThrow({
                where: {
                    AND: [
                        {
                            login: {
                                equals: signInDto.login
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
                message: "Usuário logado com sucesso.",
                severityWarning: SeverityWarningEnum.SUCCESS
            }
        } catch (error: any) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code = "P2025") {
                    throw new UnauthorizedException("Login ou senha inválidos.");
                }
            }

            throw error;
        }
    }
}