import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService){}

	@Post('registrar')
	registrar(@Body() createUserDto: CreateUserDTO){
		return this.userService.registrar(createUserDto);
	}
}
