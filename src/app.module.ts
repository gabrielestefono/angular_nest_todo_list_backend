import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ErrorModule } from './error/error.module';

@Module({
  imports: [TaskModule, DatabaseModule, UserModule, AuthModule, EmailModule, ErrorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
