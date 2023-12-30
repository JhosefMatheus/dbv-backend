import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto";
import { ISignInResponse, ISignUpResponse } from "./response";
import { TokenService } from "src/token/token.service";
import { hashedText } from "src/funcs";
import { UserSignInData } from "src/types";
import { PrismaService } from "src/prisma/prisma.service";
import { Role, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RoleService } from "src/role/role.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService
  ) { }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    try {
      const hashedPassword: string = hashedText(signInDto.password);

      const user: User & { role: Role } = await this.prismaService.user.findFirstOrThrow({
        where: {
          email: signInDto.email,
          password: hashedPassword
        },
        include: {
          role: true
        }
      });

      const payload: object = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }

      const token: string = await this.tokenService.generateToken(payload);

      return {
        message: "Usuário logado com sucesso.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UnauthorizedException("E-mail ou senha inválidos.");
        }
      }
      throw error;
    }
  }

  async signUp(userFromSession: UserSignInData, signUpDto: SignUpDto): Promise<ISignUpResponse> {
    let roleFromNewUser: Role;

    try {
      roleFromNewUser = await this.roleService.getRoleById(signUpDto.roleId);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new ForbiddenException("O cargo selecionado não existe.");
        }
      }
      
      throw error;
    }

    try {
      const canGrant: boolean = await this.roleService.roleCanGrant(userFromSession.role.id, roleFromNewUser.id);

      console.log(canGrant)

      if (!canGrant) {
        throw new ForbiddenException("Você não tem permissão para cadastrar um usuário com esse cargo.");
      }

    } catch (error: any) {
      throw error;
    }

    try {
      const hashedPassword: string = hashedText(signUpDto.password);

      await this.prismaService.$transaction([
        this.prismaService.user.create({
          data: {
            name: signUpDto.name,
            email: signUpDto.email,
            password: hashedPassword,
            roleId: signUpDto.roleId
          }
        })
      ]);

      return {
        message: "Usuário cadastrado com sucesso."
      }
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Já existe um usuário cadastrado com esse e-mail.");
        }
      }

      throw error;
    }
  }
}