import { Module } from '@nestjs/common';
import { LoanDetailService } from './loan-detail.service';
import { LoanDetailResolver } from './loan-detail.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanDetail } from './entities/loan-detail.entity';
import { Loan } from 'src/loan/entities/loan.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanDetail, Loan, Book])],
  providers: [LoanDetailResolver, LoanDetailService],
})
export class LoanDetailModule {}
