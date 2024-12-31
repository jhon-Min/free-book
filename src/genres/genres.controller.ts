import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/genres.dto';

@Controller('dashboard/genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Get()
  async index(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Math.min(Number(perPage) || 10, 50); // Max 50 items per page

    return this.genreService.index(pageNumber, perPageNumber);
  }

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    return await this.genreService.create(createGenreDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('') createGenreDto: CreateGenreDto,
  ) {
    return await this.genreService.update(id, createGenreDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.genreService.delete(id);
  }
}
