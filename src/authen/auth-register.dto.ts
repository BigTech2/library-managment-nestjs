import GraphQLJSON from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthRegisterDto {
  @Field({ nullable: true })
  message: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data: any;
}
