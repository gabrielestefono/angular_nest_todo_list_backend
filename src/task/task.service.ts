import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
	tasks = [
		{
			id: 1,
			nome: "Task 01",
			concluida: false,
			deletedAt: null
		},
		{
			id: 2,
			nome: "Task 02",
			concluida: false,
			deletedAt: null
		},
		{
			id: 3,
			nome: "Task 03",
			concluida: false,
			deletedAt: null
		},
		{
			id: 4,
			nome: "Task 04",
			concluida: false,
			deletedAt: null
		}
	]

	findAll(){
		return this.tasks;
	}

	create(task: any){
		this.tasks.push(task);
		return task;
	}

	update(id: number){
		const task = this.tasks.find(task => task.id === id);
		task.concluida = !task.concluida;
		return task;
	}

	delete(id: number){
		const task = this.tasks.findIndex(task => task.id === id);
		if(task >= 0){
			this.tasks.splice(task, 1);
			return;
		}
		throw new NotFoundException('Tarefa não encontrada!');
	}
}
