import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class EmailService {
	@Inject()
	private readonly mailerService: MailerService;

	async confirmacao(user: User, token: string): Promise<any>
	{
		await this.mailerService.sendMail({
			to: user.email,
			subject: "Confirme o seu e-mail!",
			html: `<p>Olá, ${user.nome}, seja bem vindo à nossa To-Do List! Para confirmar o email, por favor, clique <a href="http://localhost:3000/user/confirmar?token=${token}">aqui</a></p>`,
		})
	}
}
