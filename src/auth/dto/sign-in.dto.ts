import {
    IsString,
    IsNotEmpty
} from "class-validator";

export class SignInDto {
    @IsString({
        message: "O login deve ser uma string."
    })
    @IsNotEmpty({
        message: "O login não pode estar vazio."
    })
    login: string;

    @IsString({
        message: "A senha deve ser uma string."
    })
    @IsNotEmpty({
        message: "A senha não pode estar vazia."
    })
    password: string;
}