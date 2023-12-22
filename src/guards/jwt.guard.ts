import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "src/token/token.service";
import { UserSignInData } from "src/types";
import { Repository } from "typeorm";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return true;

      // const request = context.switchToHttp().getRequest();

      // const authorizationHeader: any = request.headers.authorization;

      // if (!authorizationHeader) return false;

      // const token: string = authorizationHeader.replace('Bearer ', '').trim();

      // const tokenPayload: UserSignInData = await this.tokenService.decodeToken(token);
      
      // const user: User = await this.userRepository.findOneOrFail({
      //   where: {
      //     id: tokenPayload['id'],
      //     deletedAt: null
      //   },
      //   relations: {
      //     role: true
      //   },
      //   select: {
      //     id: true,
      //     name: true,
      //     email: true,
      //     createdAt: true,
      //     updatedAt: true,
      //     deletedAt: true,
      //     role: {
      //       id: true,
      //       name: true,
      //       createdAt: true,
      //       updatedAt: true,
      //       deletedAt: true
      //     }
      //   }
      // });

      // request.user = user;

      // return true;
    } catch (error: any) {
      return false;
    }
  }
}