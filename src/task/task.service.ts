import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Description } from './entity/description.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { CreateDescriptionDTO } from './dto/create-description.dto';
import { EditarNomeDTO } from './dto/editar-nome.dto';
import { verify } from 'jsonwebtoken';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class TaskService {
	@InjectRepository(Task)
	private readonly taskRepository: Repository<Task>
	@InjectRepository(Description)
	private readonly descriptionRepository: Repository<Description>
	@InjectRepository(User)
	private readonly UserRepository: Repository<User>

	async findAll(requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario: number = decodedJwt['idUsuario'];
		return await this.taskRepository
		.createQueryBuilder('task')
		.innerJoinAndSelect('task.user', 'user')
		.where('task.elemento_pai = :elemento_pai', { elemento_pai: 0 })
		.andWhere('user.id = :usuario', { usuario })
		.getMany();
	}

	async findOne(id: number, requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario = decodedJwt['idUsuario'];
		const task = await this.taskRepository
		.createQueryBuilder('task')
		.leftJoinAndSelect('task.description', 'description')
		.andWhere('task.id = :id', { id })
		.andWhere('task.userId = :userId', { userId: usuario })
		.getOne();
		if(!task){
			throw new NotFoundException('A tarefa não pôde ser encontrada');
		}

		const tasksFilhas = await this.taskRepository
		.createQueryBuilder('task')
		.innerJoinAndSelect('task.user', 'user')
		.where('task.elemento_pai = :elemento_pai', { elemento_pai: id })
		.andWhere('user.id = :usuario', { usuario })
		.getMany();
		return { ...task, filhos: tasksFilhas };
	}

	async create(task: CreateTaskDTO, requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario = decodedJwt['idUsuario'];
		const user = await this.UserRepository.findOne({where: {id: usuario}})
		if(!user){
			throw new BadRequestException('Algo deu errado!');
		}
		const newTask = this.taskRepository.create(task);
		newTask.user = user;
		return await this.taskRepository.save(newTask);
	}

	async maskAsConcluded(id: number, requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario = decodedJwt['idUsuario'];
		const task = await this.taskRepository
		.createQueryBuilder('task')
		.leftJoinAndSelect('task.description', 'description')
		.andWhere('task.id = :id', { id })
		.andWhere('task.userId = :userId', { userId: usuario })
		.getOne();
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		const tasksFilhas: Task[] = await this.taskRepository.find({
			where: {
				elemento_pai: id
			}
		});
		const taskPai: Task = await this.taskRepository.findOne({
			where: {
				id: task.elemento_pai,
			},
			relations: ['description']
		});
		const tasksIrmas: Task[] = await this.taskRepository.find({
			where: {
				elemento_pai: task.elemento_pai,
			},
			relations: ['description']
		});
		const tasksIrmasFiltradas: Task[] = tasksIrmas.filter(el => !el.concluida);
		const numeroIrmas: number = tasksIrmasFiltradas.length;
		if(tasksFilhas){
			let todasConcluidas: boolean = true;
			tasksFilhas.forEach(el => {
				if(!el.concluida){
					todasConcluidas = false;
				}
			});
			console.log(numeroIrmas);
			if(!todasConcluidas){
				return task;
			}else if(task.elemento_pai != 0 && taskPai.concluida){
				taskPai.concluida = false;
				this.taskRepository.save(taskPai);
			}else if(numeroIrmas == 1){
				console.log(numeroIrmas);
				taskPai.concluida = true;
				this.taskRepository.save(taskPai);
			}
		}
		task.concluida = !task.concluida;
		return await this.taskRepository.save(task);
	}

	async updateName(id: number, editarNomeDTO: EditarNomeDTO, requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario = decodedJwt['idUsuario'];
		const task = await this.taskRepository
		.createQueryBuilder('task')
		.leftJoinAndSelect('task.description', 'description')
		.andWhere('task.id = :id', { id })
		.andWhere('task.userId = :userId', { userId: usuario })
		.getOne();
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		task.nome = editarNomeDTO.nome;
		return await this.taskRepository.save(task);
	}

	async updateDescription(id: number, createDescriptionDTO: CreateDescriptionDTO, requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario = decodedJwt['idUsuario'];
		const task = await this.taskRepository
		.createQueryBuilder('task')
		.leftJoinAndSelect('task.description', 'description')
		.andWhere('task.id = :id', { id })
		.andWhere('task.userId = :userId', { userId: usuario })
		.getOne();
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		const description = await this.descriptionRepository.save(createDescriptionDTO);
		task.description = description;
		return await this.taskRepository.save(task);
	}

	async delete(id: number, requisicao: Request){
		const token = requisicao.headers['authorization'].split(' ')[1];
		const decodedJwt = verify(token, process.env.JWT_SECRET);
		const usuario = decodedJwt['idUsuario'];
		const task = await this.taskRepository
		.createQueryBuilder('task')
		.leftJoinAndSelect('task.description', 'description')
		.andWhere('task.id = :id', { id })
		.andWhere('task.userId = :userId', { userId: usuario })
		.getOne();
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		const tasks = await this.taskRepository.find({
			where: {
				elemento_pai: id,
			}
		});
		if(tasks){
			tasks.forEach(el => {
				el.elemento_pai = task.elemento_pai
				this.taskRepository.save(el);
			});
		}
		return await this.taskRepository.remove(task);
	}
}
