import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { EntityNotFoundError, Repository } from "typeorm";
import { SignInDto } from "./dto";
import { SignInResponse } from "./response";
import { TokenService } from "src/token/token.service";
import { hashedText } from "src/funcs";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService
  ) { }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    try {
      const hashedPassword: string = hashedText(signInDto.password);

      const user: User = await this.userRepository.findOneByOrFail({
        email: signInDto.email,
        password: hashedPassword,
        deletedAt: null
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
        token
      }
    } catch (error: any) {
      if (error instanceof EntityNotFoundError) {
        throw new UnauthorizedException("E-mail ou senha inválidos.");
      }

      throw error;
    }
  }

  async signUp(): Promise<void> { }
}