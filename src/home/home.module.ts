import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { PrismaService } from 'src/prisma.service';
import { GenresService } from 'src/genres/genres.service';
import { BooksService } from 'src/books/books.service';
import { ChapterService } from 'src/chapter/chapter.service';

@Module({
  controllers: [HomeController],
  providers: [
    HomeService,
    PrismaService,
    GenresService,
    BooksService,
    ChapterService,
  ],
})
export class HomeModule {}
