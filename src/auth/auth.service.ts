import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	@InjectRepository(User)
	private readonly userRepository: Repository<User>;


	public async criarTokenAcesso(idUsuario: number, recovery: boolean, confirmation: boolean): Promise<string>
	{
		let time = confirmation ? process.env.JWT_EXPIRATION_CONFIRMATION :  process.env.JWT_EXPIRATION;
		time = recovery ? process.env.JWT_EXPIRATION_RECOVERY : time;
		return sign({ idUsuario, recovery, confirmation }, process.env.JWT_SECRET, {
			expiresIn: time,
		});
	}

	public async validarUsuario(id: number): Promise<User>
	{
		const user = await this.userRepository.findOne({
			where: { id }
		});
		if(!user){
			throw new UnauthorizedException("Usuário não encontrado!");
		}
		return user;
	}

	private static extratorJWT(request: Request): string
	{
		const authHeader = request.headers.authorization;
		if(!authHeader){
			throw new BadRequestException("Token Inválido!");
		}
		const [, token] = authHeader.split(' ');
		return token;
	}

	public extrairTokenJWT(): (request: Request) => string
	{
		return AuthService.extratorJWT;
	}
}
