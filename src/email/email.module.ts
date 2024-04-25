import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.MAILER_HOST,
				port: parseInt(process.env.MAILER_PORT),
				secure: process.env.MAILER_SECURE.toLowerCase() === 'true',
				auth: {
					user: process.env.MAILER_AUTH_USER,
					pass: process.env.MAILER_AUTH_PASS,
				}
			},
			defaults: {
				from: `"${process.env.MAILER_AUTH_FROM}" <${process.env.MAILER_AUTH_EMAIL}>`
			}
		})
	],
	providers: [EmailService]
})
export class EmailModule {}
