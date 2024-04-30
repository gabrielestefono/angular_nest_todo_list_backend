import { AuthGuard } from '@nestjs/passport';
import { CreateDescriptionDTO } from './dto/create-description.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { EditarNomeDTO } from './dto/editar-nome.dto';
import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService){}
	@Get()
	@UseGuards(AuthGuard('jwt'))
	getAll(@Req() requisicao: Request){
		return this.taskService.findAll(requisicao);
	}

	@Get(':id')
	@UseGuards(AuthGuard('jwt'))
	getOne(@Param('id') id: number, @Req() requisicao: Request){
		return this.taskService.findOne(id, requisicao);
	}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	create(@Body() createTaskDTO: CreateTaskDTO, @Req() requisicao: Request){
		return this.taskService.create(createTaskDTO, requisicao);
	}

	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	markAsConcluded(@Param('id') id: number, @Req() requisicao: Request){
		return this.taskService.maskAsConcluded(id, requisicao);
	}

	@Patch('nome/:id')
	@UseGuards(AuthGuard('jwt'))
	editName(@Param('id') id: number, @Body() editarNomeDTO: EditarNomeDTO, @Req() requisicao: Request){
		return this.taskService.updateName(id, editarNomeDTO, requisicao)
	}

	@Patch('description/:id')
	@UseGuards(AuthGuard('jwt'))
	createDescription(@Param('id') id: number, @Body() createDescriptionDTO: CreateDescriptionDTO, @Req() requisicao: Request){
		return this.taskService.updateDescription(id, createDescriptionDTO, requisicao)
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	remove(@Param('id') id: number, @Req() requisicao: Request){
		return this.taskService.delete(id, requisicao);
	}
}
