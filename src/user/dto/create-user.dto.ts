import { IsEmail, IsString, IsStrongPassword, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "IsPasswordMatching", async: false })
export class IsPasswordMatching implements ValidatorConstraintInterface {
    validate(confirmacao_senha: string, args: ValidationArguments) {
        const user = args.object as CreateUserDTO;
        return user.senha === confirmacao_senha; // compara a senha e a confirmação de senha
    }

    defaultMessage() {
        return "Senha e confirmação de senha não correspondem";
    }
}

export class CreateUserDTO{
    @IsString()
    nome: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsStrongPassword()
    senha: string

    @IsString()
    @IsStrongPassword()
    @Validate(IsPasswordMatching)
    confirmacao_senha: string
}
