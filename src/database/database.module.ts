import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entity/task.entity';

@Module({
 imports: [
   TypeOrmModule.forRootAsync({
     useFactory: () => ({
       type: 'postgres',
       host: process.env.POSTGRES_HOST,
       port: 5432,
       username: process.env.POSTGRES_USER,
       password: process.env.POSTGRES_PASSWORD,
       database: process.env.POSTGRES_DATABASE,
       entities: [Task],
       synchronize: true,
       ssl: true,
     }),
   }),
 ],
})
export class DatabaseModule {}
