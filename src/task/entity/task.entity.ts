import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nome: string;

	@Column()
	concluida: boolean;
}