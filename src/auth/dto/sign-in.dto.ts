import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail({}, {
    message: "O campo 'email' deve ser um email válido."
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
}