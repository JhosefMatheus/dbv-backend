import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { SignInDto, SignUpDto } from "./dto";
import { ISignInResponse } from "./response";
import { TokenService } from "src/token/token.service";
import { hashedText } from "src/funcs";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService
  ) { }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    try {
      const hashedPassword: string = hashedText(signInDto.password);

      const user: User = await this.userRepository.findOneOrFail({
        where: {
          email: signInDto.email,
          password: hashedPassword,
          deletedAt: null
        },
        relations: {
          role: true
        }
      });

      if (!user) {
        throw new UnauthorizedException("E-mail ou senha inválidos.");
      }

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
      throw error;
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      
    } catch (error: any) {
      console.log(error);

      throw error;
    }
  }
}