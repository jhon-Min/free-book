import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GenresService } from '../genres/genres.service';
import { AuthType } from 'src/iam/authentication/enum/enum-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { BooksService } from 'src/books/books.service';
import { ChapterService } from 'src/chapter/chapter.service';

@Controller('api/v1')
export class HomeController {
  constructor(
    private readonly genreService: GenresService,
    private readonly bookService: BooksService,
    private readonly chapterService: ChapterService,
  ) {}

  @Auth(AuthType.None)
  @Get('genres')
  genreLists() {
    return this.genreService.index(1, 200);
  }

  @Auth(AuthType.None)
  @Get('books')
  books() {
    return this.bookService.index(1, 100, '');
  }

  @Auth(AuthType.None)
  @Get('books/:id')
  bookDetail(@Param('id') id: string) {
    return this.bookService.detail(id);
  }

  // @Auth(AuthType.None)
  @Get('chapters/:id')
  chapterDetail(@Param('id') id: string) {
    return this.chapterService.detail(id);
  }

  @Auth(AuthType.None)
  @Get('chapters/:id/book')
  chaptersWithBookId(@Param('id') id: string) {
    return this.chapterService.chaptersWithBookId(id);
  }
}
