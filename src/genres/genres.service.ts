import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGenreDto } from './dto/genres.dto';

@Injectable()
export class GenresService {
  constructor(private prismaService: PrismaService) {}

  async index(page: number, perPage: number) {
    const skip = (page - 1) * perPage;

    const [genres, total] = await this.prismaService.$transaction([
      this.prismaService.genre.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.genre.count(),
    ]);

    return {
      data: genres,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / perPage),
        itemsPerPage: perPage,
      },
    };
  }

  async create(createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;
    return await this.prismaService.genre.create({ data: { name } });
  }

  async update(id: string, createGenreDto: CreateGenreDto) {
    const { name } = createGenreDto;
    const genre = await this.prismaService.genre.findUnique({ where: { id } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID "${id}" not found`);
    }
    return await this.prismaService.genre.update({
      where: { id },
      data: { name },
    });
  }

  delete(id: string) {
    const genre = this.prismaService.genre.findUnique({ where: { id } });

    if (!genre) {
      throw new NotFoundException(`Genre with ID "${id}" not found`);
    }

    return this.prismaService.genre.delete({ where: { id } });
  }
}
