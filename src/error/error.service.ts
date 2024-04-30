import { EmailService } from 'src/email/email.service';
import { SendMailErrorDTO } from './dto/send-mail-error.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
	constructor(
		private emailService: EmailService,
	){}
	async enviarEmailErro(sendMailErrorDTO: SendMailErrorDTO): Promise<boolean>
	{
		const result = await this.emailService.erroDesconhecido(sendMailErrorDTO);
		if(!result){
			return false;
		}
		return true;
	}
}