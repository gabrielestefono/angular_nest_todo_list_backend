import { IsNumber, IsString } from "class-validator";

export class SendMailErrorDTO{
	@IsNumber()
	readonly status: number

	@IsString()
	readonly descricao: string

	@IsString()
	readonly pagina: string
}