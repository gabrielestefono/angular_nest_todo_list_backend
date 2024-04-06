import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('descriptions')
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({nullable: true})
  updated_at: Date;
}