import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationBookInput {
  @Field(() => Int, { defaultValue: 0, description: 'Number of items to skip' })
  offset: number;

  @Field(() => Int, { defaultValue: 10, description: 'Number of items to take' })
  limit: number;

  @Field({ nullable: true, description: 'Search by book title' })
  title?: string;

  @Field({ nullable: true, description: 'Search by book author' })
  author?: string;

  @Field(() => Int, { nullable: true, description: 'Filter by topic detail ID' })
  topicDetailId?: number;
}