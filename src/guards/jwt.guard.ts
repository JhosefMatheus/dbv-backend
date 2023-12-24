import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenService } from "src/token/token.service";
import { UserSignInData } from "src/types";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader: any = request.headers.authorization;

      if (!authorizationHeader) return false;

      const token: string = authorizationHeader.replace('Bearer ', '').trim();

      const tokenPayload: UserSignInData = await this.tokenService.decodeToken(token);

      const user: UserSignInData = await this.prismaService.user.findFirstOrThrow({
        where: {
          id: tokenPayload.id,
          deletedAt: null
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          role: true
        }
      });

      request.user = user;

      return true;
    } catch (error: any) {
      return false;
    }
  }
}