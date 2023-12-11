import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { RoleGrant } from "./role-grant.entity";
import { RoleService } from "./role.service";

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleGrant])],
  providers: [RoleService]
})
export class RoleModule {}