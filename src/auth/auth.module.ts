import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenModule } from "src/token/token.module";
import { GuardModule } from "src/guards/guard.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    GuardModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }