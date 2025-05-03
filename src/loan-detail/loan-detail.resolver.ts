import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LoanDetailService } from './loan-detail.service';
import { LoanDetail } from './entities/loan-detail.entity';
import { CreateLoanDetailInput } from './dto/create-loan-detail.input';
import { UpdateLoanDetailInput } from './dto/update-loan-detail.input';

@Resolver(() => LoanDetail)
export class LoanDetailResolver {
  constructor(private readonly loanDetailService: LoanDetailService) {}

  @Mutation(() => LoanDetail)
  createLoanDetail(@Args('createLoanDetailInput') createLoanDetailInput: CreateLoanDetailInput) {
    return this.loanDetailService.create(createLoanDetailInput);
  }

  @Query(() => [LoanDetail], { name: 'loanDetail' })
  findAll() {
    return this.loanDetailService.findAll();
  }

  @Query(() => LoanDetail, { name: 'loanDetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.loanDetailService.findOne(id);
  }

  @Mutation(() => LoanDetail)
  updateLoanDetail(@Args('updateLoanDetailInput') updateLoanDetailInput: UpdateLoanDetailInput) {
    return this.loanDetailService.update(updateLoanDetailInput.id, updateLoanDetailInput);
  }

  @Mutation(() => LoanDetail)
  removeLoanDetail(@Args('id', { type: () => Int }) id: number) {
    return this.loanDetailService.remove(id);
  }
}
