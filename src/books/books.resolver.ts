import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { role } from '../auth/role.decorator';
import { PaginationBookInput } from './dto/pagination-book.input';
import { BooksPaginationResult } from './dto/books-pagination.result';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard, RoleGuard)
  @role('ADMIN')
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<Book> {
    try {
      return await this.booksService.create(createBookInput);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Query(() => BooksPaginationResult, { name: 'paginatedBooks' })
  async paginateBooks(
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationBookInput,
  ): Promise<BooksPaginationResult> {
    const pagination = paginationInput || { offset: 0, limit: 10 };
    return this.booksService.paginateBooks(pagination);
  }

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard, RoleGuard)
  @role('ADMIN')
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput);
  }

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard, RoleGuard)
  @role('ADMIN')
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }
}
