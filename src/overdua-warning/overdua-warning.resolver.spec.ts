import { Test, TestingModule } from '@nestjs/testing';
import { OverduaWarningResolver } from './overdua-warning.resolver';
import { OverduaWarningService } from './overdua-warning.service';

describe('OverduaWarningResolver', () => {
  let resolver: OverduaWarningResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverduaWarningResolver, OverduaWarningService],
    }).compile();

    resolver = module.get<OverduaWarningResolver>(OverduaWarningResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
