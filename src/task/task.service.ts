import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>
	){}

	async findAll(){
		return await this.taskRepository.find();
	}

	async findOne(id: number){
		const task = await this.taskRepository.findOne({
			where: { id }
		})
		if(!task){
			throw new NotFoundException('A tarefa não pôde ser encontrada');
		}
		return task;
	}

	async create(task: any){
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
