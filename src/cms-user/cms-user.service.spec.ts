import { Test, TestingModule } from '@nestjs/testing';
import { CmsUserService } from './cms-user.service';

describe('CmsUserService', () => {
  let service: CmsUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmsUserService],
    }).compile();

    service = module.get<CmsUserService>(CmsUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
