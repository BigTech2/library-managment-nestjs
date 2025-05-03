import { Test, TestingModule } from '@nestjs/testing';
import { DetailTopicsService } from './detail-topics.service';

describe('DetailTopicsService', () => {
  let service: DetailTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailTopicsService],
    }).compile();

    service = module.get<DetailTopicsService>(DetailTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
