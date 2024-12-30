import { Test, TestingModule } from '@nestjs/testing';
import { CmsUserController } from './cms-user.controller';
import { CmsUserService } from './cms-user.service';

describe('CmsUserController', () => {
  let controller: CmsUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmsUserController],
      providers: [CmsUserService],
    }).compile();

    controller = module.get<CmsUserController>(CmsUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
