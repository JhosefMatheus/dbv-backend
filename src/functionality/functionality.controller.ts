import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { FunctionalityService } from "./functionality.service";
import { GetFunctionalitiesResponse } from "./response";
import { JwtGuard } from "src/guards/jwt.guard";
import { UserSignInData } from "src/types";

@UseGuards(JwtGuard)
@Controller("functionality")
export class FunctionalityController {
  constructor(
    private readonly functionalityService: FunctionalityService
  ) { }

  @Get()
  async getFunctionalities(
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    try {
      const userFromSession: UserSignInData = req['user'];

      const getFunctionalitiesResponse: GetFunctionalitiesResponse = await this.functionalityService.getFunctionalities(userFromSession);

      return res.status(200).json({
        ...getFunctionalitiesResponse
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro inesperado no servidor ao buscar pelas funcionalidades."
      });
    }
  }
}