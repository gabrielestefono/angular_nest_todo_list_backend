import { Module } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [ErrorController],
  providers: [ErrorService, EmailService]
})
export class ErrorModule {}
