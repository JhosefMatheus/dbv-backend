import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetFunctionalitiesResponse } from "./response";
import { Functionality } from "@prisma/client";
import { UserSignInData } from "src/types";

@Injectable()
export class FunctionalityService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getFunctionalities(userFromSession: UserSignInData): Promise<GetFunctionalitiesResponse> {
    try {
      const functionalities: Functionality[] = await this.prismaService.functionality.findMany({
        where: {
          roles: {
            some: {
              role: {
                id: userFromSession.role.id
              }
            }
          }
        }
      });

      return {
        message: "Funcionalidades encontradas com sucesso.",
        functionalities
      };
    } catch (error: any) {
      throw error;
    }
  }
}