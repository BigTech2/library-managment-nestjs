import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTopicInput {
  @Field({ description: 'Topic name)' })
  topicName: string;
}
