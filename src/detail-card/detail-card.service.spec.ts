import { Test, TestingModule } from '@nestjs/testing';
import { DetailCardService } from './detail-card.service';

describe('DetailCardService', () => {
  let service: DetailCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCardService],
    }).compile();

    service = module.get<DetailCardService>(DetailCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
