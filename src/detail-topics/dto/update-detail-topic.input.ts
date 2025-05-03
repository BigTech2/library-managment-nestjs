import { CreateDetailTopicInput } from './create-detail-topic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailTopicInput extends PartialType(CreateDetailTopicInput) {
  @Field(() => Int)
  id: number;
}
