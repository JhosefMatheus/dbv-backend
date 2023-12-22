import { Module } from "@nestjs/common";
import { TokenModule } from "src/token/token.module";
import { JwtGuard } from "./jwt.guard";
import { RoleGuard } from "./role.guard";

@Module({
  imports: [
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