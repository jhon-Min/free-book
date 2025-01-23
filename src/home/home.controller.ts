import { Controller, Get, UseGuards } from '@nestjs/common';
import { GenresService } from '../genres/genres.service';
import { AuthType } from 'src/iam/authentication/enum/enum-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { BooksService } from 'src/books/books.service';

@Controller('api/v1')
export class HomeController {
  constructor(
    private readonly genreService: GenresService,
    private readonly bookService: BooksService,
  ) {}

  @Auth(AuthType.None)
  @Get('genres')
  genreLists() {
    return this.genreService.index(1, 200);
  }

  @Auth(AuthType.None)
  @Get('books')
  books() {
    return this.bookService.index(1, 100);
  }
}
