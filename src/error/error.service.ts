import { EmailService } from 'src/email/email.service';
import { SendMailErrorDTO } from './dto/send-mail-error.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
	constructor(
		private emailService: EmailService,
	){}
	async enviarEmailErro(sendMailErrorDTO: SendMailErrorDTO){
		await this.emailService.erroDesconhecido(sendMailErrorDTO);
		return true;
	}
}