import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDetailTopicInput {
  @Field()
  name: string;

  @Field(() => Int, { description: 'Topic ID', nullable: true })
  topicId?: number;


}
