import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTopicInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
