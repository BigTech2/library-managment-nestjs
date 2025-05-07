import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Card } from '../../card/entities/card.entity';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
@Entity()
export class DetailCard {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.detailCards)
  book: Book;

  @Field(() => Card)
  @ManyToOne(() => Card, (card) => card.detailCards)
  card: Card;
}
