import { Test, TestingModule } from '@nestjs/testing';
import { DetailCardResolver } from './detail-card.resolver';
import { DetailCardService } from './detail-card.service';

describe('DetailCardResolver', () => {
  let resolver: DetailCardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCardResolver, DetailCardService],
    }).compile();

    resolver = module.get<DetailCardResolver>(DetailCardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
