import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Description } from './description.entity';
import { User } from 'src/user/entity/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  concluida: boolean;

  @Column()
  elemento_pai: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({nullable: true})
  updated_at: Date;

  @OneToOne(()=> Description, {nullable: true})
  @JoinColumn()
  description: Description;

  @ManyToOne(() => User, (user)=> user.tasks)
  user: User
}