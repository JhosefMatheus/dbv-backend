import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUnityDto } from "./dto";

@Controller("unity")
export class UnityController {
  constructor() {}

  @Post()
  async createUnity(
    @Res() res: Response,
    @Body() createUnityDto: CreateUnityDto
  ): Promise<Response> {
    try {
      return res.status(201).json({
        message: "Unidade criada com sucesso."
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro inesperado no servidor ao criar unidade."
      });
    }
  }
}