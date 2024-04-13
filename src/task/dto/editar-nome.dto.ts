import { IsString } from "class-validator"

export class EditarNomeDTO{
	@IsString()
	readonly nome: string
}