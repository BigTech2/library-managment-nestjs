import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanResolver } from './loan.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthenModule } from 'src/auth/authen.module';
import { LoanDetail } from 'src/loan-detail/entities/loan-detail.entity';
import { Card } from 'src/card/entities/card.entity';
import { DetailCard } from 'src/detail-card/entities/detail-card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan, User, LoanDetail, Card, DetailCard]),
    AuthenModule,
  ],
  providers: [LoanResolver, LoanService],
  exports: [],
})
export class LoanModule {}
