import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Description } from './entity/description.entity';

@Module({
	imports: [TypeOrmModule.forFeature([
		Task, Description
	])],
	controllers: [TaskController],
	providers: [TaskService]
})
export class TaskModule {}
