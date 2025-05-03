import { CreateTopicInput } from './create-topic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field(() => Int)
  id: number;
}
