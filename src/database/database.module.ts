import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dados.db',
      entities: [],
      synchronize: true,
    })
	]
})
export class DatabaseModule {}
