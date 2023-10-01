import { Global, Module } from "@nestjs/common";
import { FuncService } from "./func.service";

@Global()
@Module({
    providers: [FuncService],
    exports: [FuncService]
})
export class FuncModule {}