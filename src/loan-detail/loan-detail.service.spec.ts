import { Test, TestingModule } from '@nestjs/testing';
import { LoanDetailService } from './loan-detail.service';

describe('LoanDetailService', () => {
  let service: LoanDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanDetailService],
    }).compile();

    service = module.get<LoanDetailService>(LoanDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
