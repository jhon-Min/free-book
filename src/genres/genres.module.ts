import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [GenresService, PrismaService],
  controllers: [GenresController],
})
export class GenresModule {}
