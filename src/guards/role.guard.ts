import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Endpoint } from "../entities";
import { UserData } from "src/types";
import { Repository } from "typeorm";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @InjectRepository(Endpoint) private readonly endpointRepository: Repository<Endpoint>
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const requestMethod: string = request.method;
      const requestPath: string = request.path;

      const userData: UserData = request['user'];

      const hasPermission: boolean = await this.endpointRepository.exist({
        where: {
          method: requestMethod,
          url: requestPath,
          roles: {
            roleId: userData.role.id
          }
        }
      });

      return hasPermission;
    } catch (error: any) {
      console.log(error);

      return false;
    }
  }
}