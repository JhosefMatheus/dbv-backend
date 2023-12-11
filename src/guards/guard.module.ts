import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenModule } from "src/token/token.module";
import { User } from "src/user/user.entity";
import { JwtGuard } from "./jwt.guard";
import { SignUpGuard } from "./sign-up.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule
  ],
  providers: [
    JwtGuard,
    SignUpGuard
  ],
  exports: [
    JwtGuard,
    SignUpGuard
  ]
})
export class GuardModule { }