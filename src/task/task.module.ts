import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Description } from './entity/description.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
				Task,
				Description,
				User
			]
		),
	],
	controllers: [TaskController],
	providers: [TaskService]
})
export class TaskModule {}
