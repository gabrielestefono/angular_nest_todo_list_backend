import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService){}
	@Get()
	getAll(){
		return this.taskService.findAll();
	}

	@Post()
	create(@Body() body: any){
		return this.taskService.create(body);
	}

	@Patch(':id')
	markAsConcluded(@Param('id') id: number){
		return this.taskService.update(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: number){
		this.taskService.delete(+id);
	}
}
