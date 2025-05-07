import { Module } from '@nestjs/common';
import { DetailCardService } from './detail-card.service';
import { DetailCardResolver } from './detail-card.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailCard } from './entities/detail-card.entity';
import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailCard, Card, User, Book])],
  providers: [DetailCardResolver, DetailCardService],
})
export class DetailCardModule {}
