import { CreateLoanDetailInput } from './create-loan-detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLoanDetailInput extends PartialType(CreateLoanDetailInput) {
  @Field(() => Int)
  id: number;
}
