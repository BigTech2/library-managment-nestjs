import { Test, TestingModule } from '@nestjs/testing';
import { OverduaWarningService } from './overdua-warning.service';

describe('OverduaWarningService', () => {
  let service: OverduaWarningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverduaWarningService],
    }).compile();

    service = module.get<OverduaWarningService>(OverduaWarningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
