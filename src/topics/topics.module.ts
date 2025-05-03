import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsResolver } from './topics.resolver';
import { Topic } from './entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Topic])],
  providers: [TopicsResolver, TopicsService],
})
export class TopicsModule {}
