import { Module } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService], // Export the service so it can be used by other modules
})
export class GeminiModule {}
