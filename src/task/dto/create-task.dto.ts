import { IsBoolean, IsNumber, IsString, Min } from "class-validator"

export class CreateTaskDTO{
	@IsString()
	readonly nome: string

	@IsBoolean()
	readonly concluida: boolean

	@IsNumber()
	@Min(0)
	readonly elemento_pai: number
}