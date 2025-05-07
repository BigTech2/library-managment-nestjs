import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import { LoanService } from './loan.service';
import { Loan } from './entities/loan.entity';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
import { LoanPayload } from './dto/loan-payload';

@Resolver(() => Loan)
export class LoanResolver {
  constructor(private readonly loanService: LoanService) {}

  @Query(() => LoanPayload, { name: 'loan' })
  @UseGuards(GqlAuthGuard)
  async findAll(): Promise<{ Message: string; Data: any }> {
    const getAllLoanResult = await this.loanService.getAllLoan();
    console.log(getAllLoanResult);

    if (getAllLoanResult.Message !== 'Oke') {
      throw new InternalServerErrorException('Failed to get all Loan');
    }
    return {
      Message: 'Get all Loan Successfully!',
      Data: getAllLoanResult.Data,
    };
  }

  @Query(() => LoanPayload)
  @UseGuards(GqlAuthGuard)
  async findLoansForUser(
    @Context() context: any,
  ): Promise<{ Message: string; Data: any }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const uesr_email = context.req.user.email;
    const result = await this.loanService.getAllLoanWithUserID(uesr_email);
    if (result.Data == 'Error') {
      throw new InternalServerErrorException('Failed to get all Loan for user');
    }
    return {
      Message: 'Get loan for user successfully',
      Data: result.Data,
    };
  }

  @Query(() => LoanPayload)
  @UseGuards(GqlAuthGuard)
  async findLoanOnlyForUser(
    @Args('id') id: number,
    @Context() context: any,
  ): Promise<{ Message: string; Data: any }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user_email = context.req.user.email;
    const results = await this.loanService.getLoanOnlyForUser(user_email, id);
    if (results.Message !== 'Oke') {
      throw new InternalServerErrorException(
        'Failed to get only Loan for user',
      );
    }
    return {
      Message: 'Get only loan for user successfully',
      Data: results.Data,
    };
  }

  @Mutation(() => LoanPayload)
  @UseGuards(GqlAuthGuard)
  async updateLoanStatus(
    @Args('status') status: number,
    @Args('loan_id') loan_id: number,
  ): Promise<{ Message: string; Data: any }> {
    const results = await this.loanService.uploadLoanStatus(status, loan_id);
    if (results.Message !== 'Oke') {
      throw new InternalServerErrorException('Failed to upload loan status');
    }
    return {
      Message: 'upload loan status successfully',
      Data: results.Data,
    };
  }

  @Mutation(() => LoanPayload)
  @UseGuards(GqlAuthGuard)
  async createLoan(
    @Context() context,
    @Args('card_id') card_id: number,
    @Args('returnDate') returnDate: Date,
  ): Promise<{ Message: string; Data: any }> {
    // Get user email from context
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user_email = context.req.user.email;

    const result = await this.loanService.createLoan(
      user_email,
      card_id,
      returnDate,
    );

    if (!result.data) {
      throw new Error(result.message);
    }

    return {
      Message: result.message,
      Data: result.data,
    };
  }
}
