import { CreateBookInput } from './create-book.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int, { description: 'Book ID to update' })
  id: number;
}
