import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field({ description: 'Book title' })
  title: string;

  @Field({ description: 'Book author' })
  author: string;

  @Field({ description: 'Book cover image path', nullable: true })
  bookCover?: string;

  @Field({ description: 'Book cover mime type', nullable: true })
  bookCoverMimeType?: string;

  @Field({ description: 'Book description', nullable: true })
  description?: string;

  @Field(() => Int, { description: 'Topic detail ID', nullable: true })
  topicDetailId?: number;
}
