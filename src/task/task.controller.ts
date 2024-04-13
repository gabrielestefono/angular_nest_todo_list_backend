import { CreateDescriptionDTO } from './dto/create-description.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { EditarNomeDTO } from './dto/editar-nome.dto';
import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService){}
	@Get()
	getAll(){
		return this.taskService.findAll();
	}

	@Get(':id')
	getOne(@Param('id') id: number){
		return this.taskService.findOne(id);
	}

	@Post()
	create(@Body() createTaskDTO: CreateTaskDTO){
		return this.taskService.create(createTaskDTO);
	}

	@Patch(':id')
	markAsConcluded(@Param('id') id: number){
		return this.taskService.update(id);
	}

	@Patch('nome/:id')
	editName(@Param('id') id: number, @Body('nome') editarNomeDTO: EditarNomeDTO){
		return this.taskService.updateName(id, editarNomeDTO)
	}

	@Patch('description/:id')
	createDescription(@Param('id') id: number, @Body() createDescriptionDTO: CreateDescriptionDTO){
		return this.taskService.updateDescription(id, createDescriptionDTO)
	}

	@Delete(':id')
	remove(@Param('id') id: number){
		return this.taskService.delete(id);
	}
}
