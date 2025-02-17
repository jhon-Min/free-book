import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/chapter.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('dashboard/chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  index(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.chapterService.index(+page, +perPage);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.chapterService.detail(id);
  }

  @Get(':bookId/book')
  chaptersWithBookId(@Param('bookId') bookId: string) {
    return this.chapterService.chaptersWithBookId(bookId);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 100, {
      // Allow up to 100 images
      limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 15 MB
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
        callback(null, true); // Accept file
      },
    }),
  )
  create(
    @Body() createChapterDto: CreateChapterDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.chapterService.create(createChapterDto, images);
  }

  @Put(':id')
  update(@Body() createChapterDto: CreateChapterDto, @Param('id') id: string) {
    return this.chapterService.update(id, createChapterDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.chapterService.destroy(id);
  }
}
