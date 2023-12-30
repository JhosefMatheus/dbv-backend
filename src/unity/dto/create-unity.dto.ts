import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUnityDto {
  @IsString({
    message: "O nome da unidade deve ser uma string."
  })
  @IsNotEmpty({
    message: "O nome da unidade é obrigatório."
  })
  name: string;

  @IsInt({
    message: "Os ids dos conselheiros deve ser um array de números inteiros.",
    each: true
  })
  advisorsId: number[];

  @IsInt({
    message: "Os ids dos conselheiros associados deve ser um array de números inteiros.",
    each: true
  })
  associateAdvisorsId: number[];
}