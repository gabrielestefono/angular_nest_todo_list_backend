import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { LoginDTO } from './dto/login.dto';
import { LoginInterface } from './interface/login.interface';

@Controller('user')
export class UserController {
	constructor(private userService: UserService){}

	@Post('registrar')
	@HttpCode(HttpStatus.CREATED)
	async registrar(@Body() createUserDto: CreateUserDTO): Promise<User>
	{
		return this.userService.registrar(createUserDto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginDto: LoginDTO): Promise<LoginInterface>
	{
		return this.userService.login(loginDto);
	}
}
