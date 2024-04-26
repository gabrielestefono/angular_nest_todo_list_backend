import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class EmailService {
	@Inject()
	private readonly mailerService: MailerService;

	async confirmacao(user: User): Promise<any>
	{
		await this.mailerService.sendMail({
			to: user.email,
			subject: "Confirme o seu e-mail!",
			html: `<p>Olá, ${user.nome}, seja bem vindo à nossa To-Do List! Para confirmar o email, por favor, clique <a href="http://localhost:4200/confirmar">aqui</a></p>`,
		})
	}

	async recuperacaoSenha(user: User, token: string): Promise<any>
	{
		await this.mailerService.sendMail({
			to: user.email,
			subject: "Recuperação de Senha!",
			html: `<p>Olá, ${user.nome}!
							Recebemos uma solicitação de alteração de senha, caso tenha sido você a solicitar, aqui está o <a href="http://localhost:4200/user/recuperacao?token=${token}">link</a></p>.
						<p>Caso não tenha sido, por favor, ignore esse email</p>`,
		})
	}
}
