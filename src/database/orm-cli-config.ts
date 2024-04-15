import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { Task } from 'src/task/entity/task.entity';
import { Description } from 'src/task/entity/description.entity';
import { Taskstable1712404983358 } from './migrations/1712404983358-taskstable';
import { Descriptionstable1712405461443 } from './migrations/1712405461443-descriptionstable';
import { User } from 'src/user/entity/user.entity';
import { Userstable1713146005294 } from './migrations/1713146005294-userstable';

export const dataSource = new DataSource({
	type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Task, Description, User],
  synchronize: false,
  ssl: true,
	migrations: [Taskstable1712404983358,
    Descriptionstable1712405461443,
    Userstable1713146005294
  ]
})