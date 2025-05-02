import { Test, TestingModule } from '@nestjs/testing';
import { AuthenResolver } from './authen.resolver';

describe('AuthenResolver', () => {
  let resolver: AuthenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenResolver],
    }).compile();

    resolver = module.get<AuthenResolver>(AuthenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
