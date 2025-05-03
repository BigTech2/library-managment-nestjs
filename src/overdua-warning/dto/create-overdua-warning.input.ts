import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOverduaWarningInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
