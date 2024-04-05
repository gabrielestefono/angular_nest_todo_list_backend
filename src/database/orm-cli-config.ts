import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { TaskTable1712339474350 } from './migrations/1712339474350-TaskTable';
import { Task } from 'src/task/entity/task.entity';
import { TaskDescriptionTable1712344668572 } from './migrations/1712344668572-TaskDescriptionTable';

export const dataSource = new DataSource({
	type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Task],
  synchronize: false,
  ssl: true,
	migrations: [
		TaskTable1712339474350,
    TaskDescriptionTable1712344668572
	]
})