import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text') // Changed from default string type to TEXT type
  message: string;

  @Column()
  isBot: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
