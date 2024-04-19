import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class LoginDTO{
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsStrongPassword()
    senha: string
}