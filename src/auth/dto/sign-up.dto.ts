import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @IsString({
    message: "O campo 'name' deve ser uma string."
  })
  @IsNotEmpty({
    message: "O campo 'name' deve ser preenchido."
  })
  name: string;

  @IsString({
    message: "O campo 'email' deve ser uma string."
  })
  @IsNotEmpty({
    message: "O campo 'email' deve ser preenchido."
  })
  email: string;

  @IsString({
    message: "O campo 'password' deve ser uma string."
  })
  @IsNotEmpty({
    message: "O campo 'password' deve ser preenchido."
  })
  password: string;

  @IsInt({
    message: "O campo 'roleId' deve ser um número inteiro."
  })
  @IsNotEmpty({
    message: "O campo 'roleId' deve ser preenchido."
  })
  roleId: number;
}