import { BadRequestException, Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	async confirmar(@Headers('authorization') authorization: string){
		const confirmacao = await this.userService.confirmarEmail(authorization);
		if(!confirmacao){
			throw new BadRequestException("Erro, por favor, tente novamente!");
		}
		return true;
	}

	@Post('recuperacao')
	@HttpCode(HttpStatus.OK)
	async recuperacao(@Body('email') email: string){
		return this.userService.recuperacaoSenha(email);
	}

	@Get('verificar-token')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	verificarToken(): boolean
	{
		return true;
	}

	@Post('mudar-senha')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(HttpStatus.OK)
	mudarSenha(@Headers('authorization') token: string, @Body('senha') senha: string)
	{
		return this.userService.mudarSenha(token, senha);
	}
}
