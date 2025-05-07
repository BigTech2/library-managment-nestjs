import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusLoanBookEnum } from '../dto/status-loan';
import { LoanDetail } from 'src/loan-detail/entities/loan-detail.entity';

@ObjectType()
@Entity('loan')
export class Loan {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @Column({ type: 'datetime', nullable: false })
  brrowDate: Date;

  @Field(() => Date)
  @Column({ type: 'datetime', nullable: false })
  returnDate: Date;

  @Field(() => StatusLoanBookEnum)
  @Column({
    type: 'enum',
    enum: StatusLoanBookEnum,
    default: StatusLoanBookEnum.LOANING,
  })
  status: StatusLoanBookEnum;

  @Field(() => Int)
  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.loans)
  user_id: User;

  @Field(() => [LoanDetail])
  @OneToMany(() => LoanDetail, (loanDetail) => loanDetail.loan)
  loanDetails: LoanDetail[];
}
