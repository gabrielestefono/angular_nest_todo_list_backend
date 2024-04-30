import { ErrorService } from './error.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SendMailErrorDTO } from './dto/send-mail-error.dto';

@Controller('error')
export class ErrorController {
	constructor(
		private readonly errorService:ErrorService,
	){}

	@Post()
	enviarEmailErro(@Body() sendMailErrorDTO: SendMailErrorDTO){
		return this.errorService.enviarEmailErro(sendMailErrorDTO);
	}
}
