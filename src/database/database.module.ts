import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Description } from 'src/task/entity/description.entity';
import { Task } from 'src/task/entity/task.entity';
import { DataSourceOptions } from 'typeorm';

export const dataBaseOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Task, Description],
  synchronize: false,
  ssl: true,
}

@Module({
 imports: [
   TypeOrmModule.forRootAsync({
    useFactory: ()=>{
      return {
        ...dataBaseOptions
      }
    }
   }),
 ],
})
export class DatabaseModule {}
