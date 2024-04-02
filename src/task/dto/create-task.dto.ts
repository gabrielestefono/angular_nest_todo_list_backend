import { IsBoolean, IsString } from "class-validator"

export class CreateTaskDTO{
	@IsString()
	readonly nome: string

	@IsBoolean()
	readonly concluida: boolean
}