import { AuthService } from './../auth/auth.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/login.dto';
import { LoginInterface } from './interface/login.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	@InjectRepository(User)
	private readonly userRepository: Repository<User>;

	constructor(private authservice: AuthService){}


	async registrar(createUserDto: CreateUserDTO){
		const usuario = this.userRepository.create(createUserDto);
		return await this.userRepository.save(usuario);
	}

	async login(loginDto: LoginDTO): Promise<LoginInterface>
	{
		const user: User = await this.findByEmail(loginDto.email);
		const match = await this.checkPassword(loginDto.senha, user);
		if(!match){
			throw new NotFoundException("Credenciais Inválidas!");
		}
		const jwtToken = await this.authservice.criarTokenAcesso(user.id);
		return {
			nome: user.nome,
			email: user.email,
			jwtToken: jwtToken
		}
	}

	/* Funções de uso privado */
	private async findByEmail(email: string): Promise<User>
	{
		const user: User = await this.userRepository.findOne({
			where: { email }
		});
		if(!user){
			throw new NotFoundException("O usuário não existe!");
		}
		return user;
	}

	private async checkPassword(senha: string, user: User): Promise<boolean>
	{
		const match = await bcrypt.compare(senha, user.senha);
		if(!match){
			throw new NotFoundException("Senha não encontrada!");
		}
		return match;
	}
}
