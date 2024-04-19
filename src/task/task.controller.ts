import { AuthGuard } from '@nestjs/passport';
import { CreateDescriptionDTO } from './dto/create-description.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { EditarNomeDTO } from './dto/editar-nome.dto';
import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService){}
	@Get()
	@UseGuards(AuthGuard('jwt'))
	getAll(){
		return this.taskService.findAll();
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	getOne(@Param('id') id: number){
		return this.taskService.findOne(id);
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	create(@Body() createTaskDTO: CreateTaskDTO){
		return this.taskService.create(createTaskDTO);
	}

	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	markAsConcluded(@Param('id') id: number){
		return this.taskService.update(id);
	}

	@Patch('nome/:id')
	@UseGuards(AuthGuard('jwt'))
	editName(@Param('id') id: number, @Body() editarNomeDTO: EditarNomeDTO){
		return this.taskService.updateName(id, editarNomeDTO)
	}

	@Patch('description/:id')
	@UseGuards(AuthGuard('jwt'))
	createDescription(@Param('id') id: number, @Body() createDescriptionDTO: CreateDescriptionDTO){
		return this.taskService.updateDescription(id, createDescriptionDTO)
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	remove(@Param('id') id: number){
		return this.taskService.delete(id);
	}
}
