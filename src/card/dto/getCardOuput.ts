import { Field, ObjectType } from '@nestjs/graphql';
import { Card } from '../entities/card.entity';

@ObjectType()
export class getCardOutput {
  @Field(() => String)
  message: string;

  @Field(() => [Card], { nullable: true })
  data: Card[];
}
