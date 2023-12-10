import { Body, Controller, Post, Res, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";
import { SignInDto } from "./dto";
import { AuthService } from "./auth.service";
import { SignInResponse } from "./response";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const signInResponse: SignInResponse = await this.authService.signIn(signInDto);

      return res.status(200).json({
        ...signInResponse
      });
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          message: error.message
        });
      }

      return res.status(500).json({
        message: "Erro inesperado no servidor ao realizar login."
      });
    }
  }

  @Post('sign-up')
  async signUp(
    @Res() res: Response
  ): Promise<Response> {
    try {
      return res.status(200).json({
        message: "Cadastro realizado com sucesso."
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro inesperado no servidor ao realizar cadastro."
      });
    }
  }
}