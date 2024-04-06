import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('descriptions')
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;
}
