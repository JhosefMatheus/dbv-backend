import { Body, Controller, ForbiddenException, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response, Request } from "express";
import { SignInDto, SignUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { ISignInResponse, ISignUpResponse } from "./response";
import { JwtGuard } from "src/guards/jwt.guard";
import { UserSignInData } from "src/types";
import { RoleGuard } from "src/guards/role.guard";

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
          message: error.message
        });
      }

      return res.status(500).json({
        message: "Erro inesperado no servidor ao realizar login."
      });
    }
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const userSession: UserSignInData = req['user'];

      const signUpResponse: ISignUpResponse = await this.authService.signUp(userSession, signUpDto);

      return res.status(200).json({
        ...signUpResponse
      });
    } catch (error: any) {
      if (error instanceof ForbiddenException) {
        return res.status(403).json({
          message: error.message
        });
      }

      return res.status(500).json({
        message: "Erro inesperado no servidor ao realizar cadastro."
      });
    }
  }
}