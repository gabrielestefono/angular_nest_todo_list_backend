import { CreateTaskDTO } from './dto/create-task.dto';
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
	create(@Body() createTaskDTO: CreateTaskDTO){
		return this.taskService.create(createTaskDTO);
	}

	@Patch(':id')
	markAsConcluded(@Param('id') id: number){
		return this.taskService.update(id);
	}

	@Delete(':id')
	remove(@Param('id') id: number){
		return this.taskService.delete(id);
	}
}
