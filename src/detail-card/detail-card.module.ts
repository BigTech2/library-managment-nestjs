import { Module } from '@nestjs/common';
import { DetailCardService } from './detail-card.service';
import { DetailCardResolver } from './detail-card.resolver';

@Module({
  providers: [DetailCardResolver, DetailCardService],
})
export class DetailCardModule {}
