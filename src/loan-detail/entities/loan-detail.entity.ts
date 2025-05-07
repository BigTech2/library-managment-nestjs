import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Loan } from '../../loan/entities/loan.entity';

@ObjectType()
@Entity()
export class LoanDetail {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.loanDetails)
  book: Book;

  @Field(() => Loan)
  @ManyToOne(() => Loan, (loan) => loan.loanDetails)
  loan: Loan;
}
