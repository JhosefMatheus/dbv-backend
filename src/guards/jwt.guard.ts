import { CanActivate, ExecutionContext } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "src/token/token.service";
import { UserData } from "src/types";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";

export class JwtGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader: any = request.headers.authorization;

      if (!authorizationHeader) return false;

      const token: string = authorizationHeader.replace('Bearer ', '').trim();

      const tokenPayload: UserData = await this.tokenService.decodeToken(token);
      
      const user: User = await this.userRepository.findOneOrFail({
        where: {
          id: tokenPayload['id'],
          deletedAt: null
        },
        relations: {
          role: true
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          role: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true
          }
        }
      });

      request.user = user;

      return true;
    } catch (error: any) {
      console.log(error)

      return false;
    }
  }
}