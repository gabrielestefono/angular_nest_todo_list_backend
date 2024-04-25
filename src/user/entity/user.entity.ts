import { Task } from "src/task/entity/task.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({nullable: true})
  updated_at: Date;

  @Column({nullable: true})
  verified_at: Date;

  @OneToMany(() => Task, (task)=> task.user)
	tasks: Task[]

  @BeforeInsert()
  async hashPassword(){
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}