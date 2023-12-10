import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenModule } from "src/token/token.module";
import { User } from "src/user/user.entity";
import { JwtGuard } from "./jwt.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule
  ],
  providers: [
    JwtGuard
  ],
  exports: [
    JwtGuard
  ]
})
export class GuardModule { }