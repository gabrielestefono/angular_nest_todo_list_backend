import { BadRequestException, Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { LoginDTO } from './dto/login.dto';
import { LoginInterface } from './interface/login.interface';
import { AuthGuard } from '@nestjs/passport';

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

	@Post('enviar-confirmacao')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async confirmacao(@Headers() header: any){
		return this.userService.enviarEmailConfirmacao(header.authorization)
	}

	@Get('confirmar')
	@HttpCode(HttpStatus.OK)
	async confirmar(@Query() token: any){
		const confirmacao = await this.userService.confirmarEmail(token.token);
		if(!confirmacao){
			throw new BadRequestException("Erro, por favor, tente novamente!");
		}
		return "Email confirmado com sucesso!";
	}
}
