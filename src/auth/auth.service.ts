import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto";
import { ISignInResponse, ISignUpResponse } from "./response";
import { TokenService } from "src/token/token.service";
import { hashedText } from "src/funcs";
import { UserSignInData } from "src/types";
import { PrismaService } from "src/prisma/prisma.service";
import { Role, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService
  ) { }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    try {
      const hashedPassword: string = hashedText(signInDto.password);

      const user: User & { role: Role } = await this.prismaService.user.findFirstOrThrow({
        where: {
          email: signInDto.email,
          password: hashedPassword,
          deletedAt: null
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
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
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
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt
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

  async signUp(userFromSession: UserSignInData, signUpDto: SignUpDto): Promise<void> {
    try {
      // const roleFromNewUser: Role = await this.roleRepository.findOneOrFail({
      //   where: {
      //     id: signUpDto.roleId,
      //     deletedAt: null
      //   }
      // });

      // const roleGrantFlag: boolean = await this.roleGrantRepository.exist({
      //   where: {
      //     roleGrantingId: userFromSession.role.id,
      //     roleGrantedId: roleFromNewUser.id
      //   }
      // });

      // if (!roleGrantFlag) {
      //   throw new UnauthorizedException(`Você não tem permissão para cadastrar um usuário com o cargo ${roleFromNewUser.name}.`);
      // }

      // const hashedPassword: string = hashedText(signUpDto.password);

      // await queryRunner.manager.insert(User, {
      //   name: signUpDto.name,
      //   email: signUpDto.email,
      //   password: hashedPassword,
      //   roleId: signUpDto.roleId
      // });

      // await queryRunner.commitTransaction();

      // return {
      //   message: "Usuário cadastrado com sucesso."
      // }
    } catch (error: any) {
      // await queryRunner.rollbackTransaction();

      // if (error instanceof QueryFailedError) {
      //   if (error.driverError.code === 'ER_DUP_ENTRY') {
      //     throw new UnauthorizedException("E-mail já cadastrado.");
      //   }
      // }

      throw error;
    } finally {
      // await queryRunner.release();
    }
  }
}