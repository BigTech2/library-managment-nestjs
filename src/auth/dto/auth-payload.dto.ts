import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class AuthPayload {
  @Field()
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data: any;
}
