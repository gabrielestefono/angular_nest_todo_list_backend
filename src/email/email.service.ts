import { SendMailErrorDTO } from './../error/dto/send-mail-error.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class EmailService {
  @Inject()
  private readonly mailerService: MailerService;

  async confirmacao(user: User): Promise<any> {
    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Confirme o seu e-mail!',
        html: `<p>Olá, ${user.nome}, seja bem vindo à nossa To-Do List! Para confirmar o email, por favor, clique <a href="https://angular-nest-todo-list-eight.vercel.app/confirmar">aqui</a></p>`,
      });
      return result;
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }
  }

  async recuperacaoSenha(user: User, token: string): Promise<any> {
    try {
      const result = await this.mailerService.sendMail({
        to: user.email,
        subject: 'Recuperação de Senha!',
        html: `<p>Olá, ${user.nome}!
								Recebemos uma solicitação de alteração de senha, caso tenha sido você a solicitar, aqui está o <a href="https://angular-nest-todo-list-eight.vercel.app/recuperar?token=${token}">link</a>.</p>
							<p>Caso não tenha sido, por favor, ignore esse email</p>`,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async erroDesconhecido(sendMailErrorDTO: SendMailErrorDTO) {
    try {
      const result = await this.mailerService.sendMail({
        to: 'gabrielestefono@hotmail.com',
        subject: 'Erro desconhecido!',
        html: `
				<h2>Olá, Gabriel! No projeto To Do List em Angular e Nest.JS ocorreu um erro desconhecido</h2>
				<p>Código do Erro: ${sendMailErrorDTO.status}</p>
				<p>Página: ${sendMailErrorDTO.pagina}</p>
				<p>Descrição: ${sendMailErrorDTO.descricao}</p>
				`,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
