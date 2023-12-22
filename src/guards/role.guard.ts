import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserSignInData } from "src/types";
import { Repository } from "typeorm";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return true;

      // const request = context.switchToHttp().getRequest();

      // const requestMethod: string = request.method;
      // const requestPath: string = request.path;

      // const userData: UserSignInData = request['user'];

      // const hasPermission: boolean = await this.endpointRepository.exist({
      //   where: {
      //     method: requestMethod,
      //     url: requestPath,
      //     roles: {
      //       roleId: userData.role.id
      //     }
      //   }
      // });

      // return hasPermission;
    } catch (error: any) {
      console.log(error);

      return false;
    }
  }
}