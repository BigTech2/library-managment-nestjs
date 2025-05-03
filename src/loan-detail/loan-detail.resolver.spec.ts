import { Test, TestingModule } from '@nestjs/testing';
import { LoanDetailResolver } from './loan-detail.resolver';
import { LoanDetailService } from './loan-detail.service';

describe('LoanDetailResolver', () => {
  let resolver: LoanDetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanDetailResolver, LoanDetailService],
    }).compile();

    resolver = module.get<LoanDetailResolver>(LoanDetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
