import { Module } from '@nestjs/common';
import { EnduserService } from './enduser.service';
import { EnduserController } from './enduser.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [EnduserService, PrismaService],
  controllers: [EnduserController],
})
export class EnduserModule {}
