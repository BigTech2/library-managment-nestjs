import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class LoanPayload {
  @Field()
  Message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  Data: any;
}
