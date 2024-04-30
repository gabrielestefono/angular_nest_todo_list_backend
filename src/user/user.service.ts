import { EmailService } from './../email/email.service';
import { AuthService } from './../auth/auth.service';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
		const needVerify = verifiedAt == null;
		const match = await this.checkPassword(loginDto.senha, user);
		if(!match){
			throw new UnauthorizedException("Credenciais Inválidas!");
		}
		const jwtToken = await this.authservice.criarTokenAcesso(user.id, false, needVerify);
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
			throw new UnauthorizedException("Credenciais Inválidas!");
		}
		return match;
	}

	async enviarEmailConfirmacao(authToken: string): Promise<boolean>
	{
		const [, token] = authToken.split(' ');
		const decodedJwt: any = jwt.decode(token);
		const user = await this.authservice.validarUsuario(decodedJwt.idUsuario);
		if(!user){
			throw new NotFoundException('O usuário não existe!')
		}
		const result = await this.emailService.confirmacao(user);
		if(!result){
			return false;
		}
		return true;
	}

	/**
	 * Envio de email de confirmação de email's
	 */
	async confirmarEmail(authToken: string): Promise<boolean>
	{
		const [, token] = authToken.split(' ');
		const decodedJwt: any = jwt.decode(token);
		if (!jwt.verify(token, process.env.JWT_SECRET)) {
			throw new UnauthorizedException('O token expirou!');
		} else {
			if(!decodedJwt.confirmation){
				throw new BadRequestException('A conta não pede confirmação!')
			}
			const user = await this.authservice.validarUsuario(decodedJwt.idUsuario);
			if(!user){
				throw new NotFoundException('O usuário não existe!')
			}
			user.verified_at = new Date(Date.now());
			this.userRepository.save(user);
		}
		return true;
	}

	async recuperacaoSenha(email: string): Promise<boolean>
	{
		const user = await this.userRepository.findOne({
			where: { email }
		});
		if(!user){
			throw new NotFoundException("Usuário não existe");
		}
		const token = await this.authservice.criarTokenAcesso(user.id, true, false);
		const result = await this.emailService.recuperacaoSenha(user, token);
		if(!result){
			return false;
		}
		return true;
	}

	async mudarSenha(authToken: string, senha: string)
	{
		const [, token] = authToken.split(' ');
		const tokenDecoded: any = jwt.decode(token);
		if (!jwt.verify(token, process.env.JWT_SECRET)) {
			throw new UnauthorizedException('O token expirou!');
		} else {
			if(!tokenDecoded.recovery){
				throw new BadRequestException('Não há solicitação para troca de senhas!')
			}
			const user = await this.authservice.validarUsuario(tokenDecoded.idUsuario);
			if(!user){
				throw new NotFoundException('O usuário não existe!')
			}
			senha = await bcrypt.hash(senha, 10);
			user.senha = senha;
			this.userRepository.save(user);
		}
		return true;
	}
}

