import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role, RoleGrant } from "../entities";
import { RoleService } from "./role.service";

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleGrant])],
  providers: [RoleService]
})
export class RoleModule {}