import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userame: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
