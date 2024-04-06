import { IsString } from "class-validator"

export class CreateDescriptionDTO{
	@IsString()
	readonly description: string
}