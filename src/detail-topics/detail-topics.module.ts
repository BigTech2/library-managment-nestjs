import { Module } from '@nestjs/common';
import { DetailTopicsService } from './detail-topics.service';
import { DetailTopicsResolver } from './detail-topics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailTopic } from './entities/detail-topic.entity';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetailTopic]), TopicsModule],
  providers: [DetailTopicsResolver, DetailTopicsService],
  exports: [DetailTopicsService],
})
export class DetailTopicsModule {}
