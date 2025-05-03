import { Module } from '@nestjs/common';
import { DetailTopicsService } from './detail-topics.service';
import { DetailTopicsResolver } from './detail-topics.resolver';

@Module({
  providers: [DetailTopicsResolver, DetailTopicsService],
})
export class DetailTopicsModule {}
