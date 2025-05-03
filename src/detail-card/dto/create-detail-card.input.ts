import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDetailCardInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
