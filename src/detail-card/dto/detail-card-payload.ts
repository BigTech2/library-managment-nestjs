import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class DetailCardPayload {
  @Field(() => String)
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data: any;
}
