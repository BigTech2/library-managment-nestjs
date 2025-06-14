import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLoanDetailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
