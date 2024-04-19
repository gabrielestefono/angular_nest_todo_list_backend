import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt'){
	constructor(private readonly authService: AuthService){
		super({
			jwtFromRequest: authService.extrairTokenJWT(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate(opora: any): Promise<User>
	{
		const user = await this.authService.validarUsuario(opora.idUsuario);
		if(!user){
			throw new UnauthorizedException("Usuário não encontrado!");
		}
		return user;
	}
}