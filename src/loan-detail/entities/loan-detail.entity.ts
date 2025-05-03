import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LoanDetail {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
