import { Controller, Get, Req, Res, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "./token.service";
import { Response, Request } from "express";

@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService
  ) {}

  @Get('verify')
  async verify(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const authorizationHeader: any = req.headers.authorization;

      if (!authorizationHeader) throw new UnauthorizedException("Token não informado.");

      const token: string = authorizationHeader.replace('Bearer ', '').trim();

      await this.tokenService.decodeToken(token);

      return res.status(200).json({
        message: "Token válido."
      });
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          message: error.message
        });
      }

      return res.status(500).json({
        message: "Erro inesperado no servidor ao verificar token."
      });
    }
  }
}