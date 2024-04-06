import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Description } from './description.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  concluida: boolean;

  @OneToOne(()=> Description, {nullable: true})
  @JoinColumn()
  description: Description;
}