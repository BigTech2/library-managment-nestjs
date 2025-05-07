import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { DetailTopicsModule } from 'src/detail-topics/detail-topics.module';
import { DetailCard } from 'src/detail-card/entities/detail-card.entity';
import { LoanDetail } from 'src/loan-detail/entities/loan-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, DetailCard, LoanDetail]),
    DetailTopicsModule,
  ],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
