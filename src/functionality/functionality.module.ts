import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { FunctionalityController } from "./functionality.controller";
import { FunctionalityService } from "./functionality.service";
import { GuardModule } from "src/guards/guard.module";
import { TokenModule } from "src/token/token.module";

@Module({
  imports: [
    PrismaModule,
    GuardModule,
    TokenModule
  ],
  controllers: [FunctionalityController],
  providers: [FunctionalityService]
})
export class FunctionalityModule {}