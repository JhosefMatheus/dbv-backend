import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response, Request } from "express";
import { SignInDto, SignUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { ISignInResponse } from "./response";
import { JwtGuard } from "src/guards/jwt.guard";
import { UserData } from "src/types";
import { AlertVariant } from "src/enums";
import { SignUpGuard } from "src/guards/sign-up.guard";

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
      const signInResponse: ISignInResponse = await this.authService.signIn(signInDto);

      return res.status(200).json({
        ...signInResponse
      });
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          message: error.message,
          alertVariant: AlertVariant.WARNING
        });
      }

      return res.status(500).json({
        message: "Erro inesperado no servidor ao realizar login.",
        alertVariant: AlertVariant.DANGER
      });
    }
  }

  @UseGuards(JwtGuard, SignUpGuard)
  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const userFromRequest: UserData = req['user'];

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