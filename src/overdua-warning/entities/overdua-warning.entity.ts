import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OverduaWarning {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
