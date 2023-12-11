import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserData } from "src/types";

export class SignUpGuard implements CanActivate {
  private readonly unauthorizedRoles: string[] = [
    "Conselheiro(a) Associado(a)",
    "Instrutor(a) Associado(a)",
    "Tesoureiro(a) Associado(a)"
  ]

  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const userData: UserData = request['user'];

      return !this.unauthorizedRoles.includes(userData.role.name);
    } catch (error: any) {
      console.log(error);

      return false;
    }
  }
}