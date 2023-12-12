import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenModule } from "src/token/token.module";
import { User } from "../entities";
import { JwtGuard } from "./jwt.guard";
import { RoleGuard } from "./role.guard";
import { Endpoint } from "src/entities/endpoint.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Endpoint]),
    TokenModule
  ],
  providers: [
    JwtGuard,
    RoleGuard
  ],
  exports: [
    JwtGuard,
    RoleGuard
  ]
})
export class GuardModule { }