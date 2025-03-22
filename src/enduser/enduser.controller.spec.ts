import { Test, TestingModule } from '@nestjs/testing';
import { EnduserController } from './enduser.controller';

describe('EnduserController', () => {
  let controller: EnduserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnduserController],
    }).compile();

    controller = module.get<EnduserController>(EnduserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
