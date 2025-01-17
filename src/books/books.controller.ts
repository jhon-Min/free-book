import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('dashboard/books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('book_profile', {
      // Set the file size limit to 15MB
      limits: { fileSize: 15 * 1024 * 1024 },
      // Define a file filter to check the MIME type
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
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
    console.log(book_profile);
    return this.bookService.createBook(createBookDto, book_profile);
  }
}
