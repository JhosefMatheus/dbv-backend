import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Endpoint, Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserSignInData } from "src/types";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const requestMethod: string = request.method;
      const requestPath: string = request.path;

      const userData: UserSignInData = request['user'];

      const roleFromUser: Role & { endpoints: Array<{ endpoint: Endpoint }> } = await this.prismaService.role.findFirstOrThrow({
        where: {
          id: userData.role.id
        },
        include: {
          endpoints: {
            include: {
              endpoint: true
            }
          }
        }
      });

      const hasPermission: boolean = roleFromUser.endpoints.some((endpoint: { endpoint: Endpoint }) => {
        return endpoint.endpoint.method === requestMethod && endpoint.endpoint.url === requestPath;
      });

      return hasPermission;
    } catch (error: any) {
      console.log(error);

      return false;
    }
  }
}