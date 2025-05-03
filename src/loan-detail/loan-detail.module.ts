import { Module } from '@nestjs/common';
import { LoanDetailService } from './loan-detail.service';
import { LoanDetailResolver } from './loan-detail.resolver';

@Module({
  providers: [LoanDetailResolver, LoanDetailService],
})
export class LoanDetailModule {}
