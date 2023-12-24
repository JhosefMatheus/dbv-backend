import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async getRoleById(id: number): Promise<Role> {
    try {
      const role: Role = await this.prismaService.role.findFirstOrThrow({
        where: {
          id,
          deletedAt: null
        }
      });

      return role;
    } catch (error: any) {
      throw error;
    }
  }

  async roleCanGrant(roleGrantingId: number, roleGrantedId: number): Promise<boolean> {
    try {
      await this.getRoleById(roleGrantingId);
      await this.getRoleById(roleGrantedId);

      const roleGranting: Role & { roleGrantings: Array<{ roleGranted: Role }> } = await this.prismaService.role.findFirstOrThrow({
        where: {
          id: roleGrantingId,
          deletedAt: null
        },
        include: {
          roleGrantings: {
            include: {
              roleGranted: true
            }
          }
        }
      });

      const canGrant: boolean = roleGranting.roleGrantings.some((roleGranting: { roleGranted: Role }) => roleGranting.roleGranted.id === roleGrantedId);

      return canGrant;
    } catch (error: any) {
      throw error;
    }
  }
}