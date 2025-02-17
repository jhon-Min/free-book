import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('dashboard/books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  index(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.bookService.index(+page, +perPage);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('book_profile', {
      // Set the file size limit to 15MB
      limits: { fileSize: 15 * 1024 * 1024 },
      // Define a file filter to check the MIME type
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, and PNG files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() book_profile: Express.Multer.File,
  ) {
    return this.bookService.createBook(createBookDto);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.bookService.detail(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.updateBook(id, createBookDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.bookService.destroy(id);
  }
}
