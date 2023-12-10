import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { TokenModule } from "src/token/token.module";
import { GuardModule } from "src/guards/guard.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule,
    GuardModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }