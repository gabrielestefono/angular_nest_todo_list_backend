import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { Task } from 'src/task/entity/task.entity';
import { Description } from 'src/task/entity/description.entity';
import { Taskstable1712404983358 } from './migrations/1712404983358-taskstable';
import { Descriptionstable1712405461443 } from './migrations/1712405461443-descriptionstable';

export const dataSource = new DataSource({
	type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Task, Description],
  synchronize: false,
  ssl: true,
	migrations: [Taskstable1712404983358,
    Descriptionstable1712405461443
  ]
})