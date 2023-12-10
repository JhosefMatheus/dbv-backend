import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserData } from "src/types";

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

  async decodeToken(token: string): Promise<UserData> {
    try {
      const payload: UserData = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (error: any) {
      throw error;
    }
  }
}