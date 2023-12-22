import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserSignInData } from "src/types";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  async generateToken(payload: object): Promise<string> {
    try {
      const token: string = await this.jwtService.signAsync(payload);

      return token;
    } catch (error: any) {
      throw error;
    }
  }

  async decodeToken(token: string): Promise<UserSignInData> {
    try {
      const payload: UserSignInData = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (error: any) {
      if (error.constructor.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Token inválido.");
      }

      throw error;
    }
  }
}