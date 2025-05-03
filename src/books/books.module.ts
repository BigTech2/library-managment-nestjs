import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { DetailTopicsService } from 'src/detail-topics/detail-topics.service';
import { DetailTopicsModule } from 'src/detail-topics/detail-topics.module';

@Module({
  imports:[TypeOrmModule.forFeature([Book]), DetailTopicsModule],
  providers: [BooksResolver, BooksService],
  exports:[BooksService]
})
export class BooksModule {}
