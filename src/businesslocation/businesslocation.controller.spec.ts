import { Test, TestingModule } from '@nestjs/testing';
import { BusinesslocationController } from './businesslocation.controller';

describe('Businesslocation Controller', () => {
  let controller: BusinesslocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinesslocationController],
    }).compile();

    controller = module.get<BusinesslocationController>(BusinesslocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
