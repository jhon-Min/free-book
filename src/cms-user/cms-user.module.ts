import { Module } from '@nestjs/common';
import { CmsUserService } from './cms-user.service';
import { CmsUserController } from './cms-user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CmsUserController],
  providers: [CmsUserService, PrismaService],
})
export class CmsUserModule {}
