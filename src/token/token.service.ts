import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

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
}