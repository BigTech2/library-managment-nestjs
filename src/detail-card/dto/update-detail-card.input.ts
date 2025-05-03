import { CreateDetailCardInput } from './create-detail-card.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailCardInput extends PartialType(CreateDetailCardInput) {
  @Field(() => Int)
  id: number;
}
