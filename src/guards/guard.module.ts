import { Module } from "@nestjs/common";
import { TokenModule } from "src/token/token.module";
import { JwtGuard } from "./jwt.guard";
import { RoleGuard } from "./role.guard";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    TokenModule,
    PrismaModule
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