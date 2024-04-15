import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
	@InjectRepository(User)
	private readonly userRepository: Repository<User>;

	async registrar(createUserDto: CreateUserDTO){
		const usuario = this.userRepository.create(createUserDto);
		return await this.userRepository.save(usuario);
	}
}
