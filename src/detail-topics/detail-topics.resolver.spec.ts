import { Test, TestingModule } from '@nestjs/testing';
import { DetailTopicsResolver } from './detail-topics.resolver';
import { DetailTopicsService } from './detail-topics.service';

describe('DetailTopicsResolver', () => {
  let resolver: DetailTopicsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailTopicsResolver, DetailTopicsService],
    }).compile();

    resolver = module.get<DetailTopicsResolver>(DetailTopicsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
