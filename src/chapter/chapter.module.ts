import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { PrismaService } from 'src/prisma.service';
import { FileuploadService } from 'src/fileupload/fileupload.service';

@Module({
  providers: [ChapterService, PrismaService, FileuploadService],
  controllers: [ChapterController],
})
export class ChapterModule {}
