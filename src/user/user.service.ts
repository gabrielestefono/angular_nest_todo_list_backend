import { EmailService } from './../email/email.service';
import { AuthService } from './../auth/auth.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dto/login.dto';
import { LoginInterface } from './interface/login.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
	@InjectRepository(User)
	private readonly userRepository: Repository<User>;

	constructor(
		private authservice: AuthService,
		private emailService: EmailService, 
	){}


	async registrar(createUserDto: CreateUserDTO){
		const usuario = this.userRepository.create(createUserDto);
		return await this.userRepository.save(usuario);
	}

	async login(loginDto: LoginDTO): Promise<LoginInterface>
	{
		const user: User = await this.findByEmail(loginDto.email);
		if(!user){
			throw new NotFoundException("O usuário não existe!");
		}
		const verifiedAt = user.verified_at;
		const verified = verifiedAt !== null;
		const match = await this.checkPassword(loginDto.senha, user);
		if(!match){
			throw new UnauthorizedException("Credenciais Inválidas!");
		}
		const jwtToken = await this.authservice.criarTokenAcesso(user.id, verified);
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

	async enviarEmailConfirmacao(authToken: string): Promise<string>
	{
		const [, token] = authToken.split(' ');
		const decodedJwt: any = jwt.decode(token);
		const user = await this.authservice.validarUsuario(decodedJwt.idUsuario);
		if(!user){
			throw new NotFoundException('O usuário não existe!')
		}
		this.emailService.confirmacao(user, token);
		return "Email enviado com sucesso!";
	}

	/**
	 * Envio de email de confirmação de email's
	 */
	async confirmarEmail(token: string): Promise<boolean>
	{
		const decodedJwt: any = jwt.decode(token);
		if (!jwt.verify(token, process.env.JWT_SECRET)) {
			throw new UnauthorizedException('O token expirou!');
		} else {
			const user = await this.authservice.validarUsuario(decodedJwt.idUsuario);
			if(!user){
				throw new NotFoundException('O usuário não existe!')
			}
			user.verified_at = new Date(Date.now());
			this.userRepository.save(user);
		}
		return true;
	}
}

