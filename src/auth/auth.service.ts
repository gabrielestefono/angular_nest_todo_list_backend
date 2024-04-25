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


	public async criarTokenAcesso(idUsuario: number, verified: boolean): Promise<string>
	{
		console.log(verified ? process.env.JWT_EXPIRATION : process.env.JWT_EXPIRATION_TMP);
		return sign({ idUsuario }, process.env.JWT_SECRET, {
			expiresIn: verified ? process.env.JWT_EXPIRATION : process.env.JWT_EXPIRATION_TMP
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
