import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { RoleGrant } from "./role-grant.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleGrant])]
})
export class RoleModule {}