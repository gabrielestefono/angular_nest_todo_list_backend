import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Description } from './entity/description.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { CreateDescriptionDTO } from './dto/create-description.dto';
import { EditarNomeDTO } from './dto/editar-nome.dto';

@Injectable()
export class TaskService {
	@InjectRepository(Task)
	private readonly taskRepository: Repository<Task>
	@InjectRepository(Description)
	private readonly descriptionRepository: Repository<Description>

	async findAll(){
		return await this.taskRepository.find();
	}

	async findOne(id: number){
		const task = await this.taskRepository.findOne({
			where: { id },
			relations: ['description']
		})
		if(!task){
			throw new NotFoundException('A tarefa não pôde ser encontrada');
		}
		return task;
	}

	async create(task: CreateTaskDTO){
		const newTask = this.taskRepository.create(task);
		return await this.taskRepository.save(newTask);
	}

	async update(id: number){
		const task = await this.taskRepository.findOne({
			where: { id }
		});
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		task.concluida = !task.concluida;
		return await this.taskRepository.save(task);
	}

	async updateName(id: number, editarNomeDTO: EditarNomeDTO){
		const task = await this.taskRepository.findOne({
			where: { id }
		});
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		task.nome = editarNomeDTO.nome;
		return await this.taskRepository.save(task);
	}

	async updateDescription(id: number, createDescriptionDTO: CreateDescriptionDTO){
		const task = await this.taskRepository.findOne({
			where: { id }
		});
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		const description = await this.descriptionRepository.save(createDescriptionDTO);
		task.description = description;
		return await this.taskRepository.save(task);
	}

	async delete(id: number){
		const task = await this.taskRepository.findOne({
			where: { id }
		});
		if(!task){
			throw new NotFoundException('Tarefa não encontrada!');
		}
		return await this.taskRepository.remove(task);
	}
}
