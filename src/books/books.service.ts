import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailTopic } from 'src/detail-topics/entities/detail-topic.entity';
import { DetailTopicsService } from 'src/detail-topics/detail-topics.service';
import { PaginationBookInput } from './dto/pagination-book.input';
import { BooksPaginationResult } from './dto/books-pagination.result';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly detailBookService: DetailTopicsService,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    try {
      const { topicDetailId, ...bookData } = createBookInput;

      // Create new book entity
      const book = this.bookRepository.create(bookData);

      // If topicDetailId is provided, link the book to the detail topic
      if (topicDetailId) {
        const detailTopic = await this.detailBookService.findOne(topicDetailId);
        if (!detailTopic) {
          throw new Error(`Detail topic with ID ${topicDetailId} not found`);
        }
        book.detailTopic = detailTopic;
      }

      // Save the book to the database
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find({
        relations: ['detailTopic', 'detailTopic.topic'],
      });
      return books;
    } catch (error) {
      throw new Error(`Failed to get books: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Book | null> {
    try {
      const book = await this.bookRepository.findOne({
        where: { id },
        relations: ['detailTopic', 'detailTopic.topic'],
      });
      return book;
    } catch (error) {
      throw new Error(`Failed to get book: ${error.message}`);
    }
  }

  async update(updateBookInput: UpdateBookInput): Promise<Book> {
    try {
      const { id, topicDetailId, ...bookData } = updateBookInput;

      // Find existing book
      const book = await this.bookRepository.findOne({
        where: { id },
        relations: ['detailTopic', 'detailTopic.topic'],
      });

      if (!book) {
        throw new Error(`Book with ID ${id} not found`);
      }

      // Update book properties
      Object.assign(book, bookData);

      // Update topic detail relation if provided
      if (topicDetailId !== undefined) {
        if (topicDetailId) {
          const detailTopic =
            await this.detailBookService.findOne(topicDetailId);
          if (!detailTopic) {
            throw new Error(`Detail topic with ID ${topicDetailId} not found`);
          }
          book.detailTopic = detailTopic;
        } else {
          // If topicDetailId is explicitly set to null, remove the relationship
          book.detailTopic = null;
        }
      }
      // Save updated book
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new Error(`Failed to update book: ${error.message}`);
    }
  }

  async remove(id: number): Promise<Book | null> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });

      if (!book) {
        return null;
      }

      await this.bookRepository.delete(id);
      return book; // ✅ Return the deleted book data
    } catch (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }

  async paginateBooks(
    paginationInput: PaginationBookInput,
  ): Promise<BooksPaginationResult> {
    const { offset, limit, title, author, topicDetailId } = paginationInput;

    // Build query with filters
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.detailTopic', 'detailTopic')
      .leftJoinAndSelect('detailTopic.topic', 'topic')
      .skip(offset)
      .take(limit);

    // Apply filters if provided
    if (title) {
      queryBuilder.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }

    if (author) {
      queryBuilder.andWhere('book.author LIKE :author', {
        author: `%${author}%`,
      });
    }

    if (topicDetailId) {
      queryBuilder.andWhere('detailTopic.id = :topicDetailId', {
        topicDetailId,
      });
    }

    // Get total count for pagination metadata
    const total = await queryBuilder.getCount();

    // Get paginated results
    const items = await queryBuilder.getMany();

    // Return formatted result
    return {
      items,
      total,
      offset,
      limit,
      hasMore: offset + limit < total,
    };
  }
}
