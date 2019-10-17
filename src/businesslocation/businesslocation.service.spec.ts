import { Test, TestingModule } from '@nestjs/testing';
import { BusinesslocationService } from './businesslocation.service';

describe('BusinesslocationService', () => {
  let service: BusinesslocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinesslocationService],
    }).compile();

    service = module.get<BusinesslocationService>(BusinesslocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
