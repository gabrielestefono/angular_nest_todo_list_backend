import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
	providers: [AuthService, JWTStrategy],
	imports: [TypeOrmModule.forFeature([
		User
	])],
})
export class AuthModule {}
