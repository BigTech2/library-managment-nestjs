import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';

@ObjectType()
export class BooksPaginationResult {
  @Field(() => [Book], { description: 'List of books' })
  items: Book[];

  @Field(() => Int, { description: 'Total number of books matching the criteria' })
  total: number;

  @Field(() => Int, { description: 'Number of items skipped/offset' })
  offset: number;

  @Field(() => Int, { description: 'Number of items per page/limit' })
  limit: number;

  @Field(() => Boolean, { description: 'Whether there are more items to fetch' })
  hasMore: boolean;
}