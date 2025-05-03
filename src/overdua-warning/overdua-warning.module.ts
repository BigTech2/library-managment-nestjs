import { Module } from '@nestjs/common';
import { OverduaWarningService } from './overdua-warning.service';
import { OverduaWarningResolver } from './overdua-warning.resolver';

@Module({
  providers: [OverduaWarningResolver, OverduaWarningService],
})
export class OverduaWarningModule {}
