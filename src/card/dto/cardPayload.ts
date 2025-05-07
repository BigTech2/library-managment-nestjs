import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class CardPayload {
  @Field(() => String)
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data: any;
}
