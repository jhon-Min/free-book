import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/book.dto';
import { imageUpload } from 'src/lib/myHelper';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async index(page: number, perPage: number) {
    const skip = (page - 1) * perPage;

    const [data, total] = await Promise.all([
      this.prismaService.book.findMany({
        skip,
        take: +perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          genres: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prismaService.book.count(),
    ]);

    return {
      data,
      paginations: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / +perPage),
        itemsPerPage: perPage,
      },
    };
  }

  async createBook(createBookDto: CreateBookDto) {
    const { name, status, is_hot, is_new, description, genres, book_profile } =
      createBookDto;

    const book = await this.prismaService.book.create({
      data: {
        name,
        description,
        isHot: is_hot,
        isNew: is_new,
        status,
        bookProfile: book_profile,
        genres: {
          connect: genres.map((x) => ({
            id: x,
          })),
        },
      },
    });

    return book;
  }

  async detail(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
        chapter: {
          select: {
            id: true,
            name: true,
            no: true,
            isPremium: true,
            coin: true,
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found!');
    }

    return book;
  }

  async updateBook(id, updateBookDto: CreateBookDto) {
    const { name, status, is_hot, is_new, genres, description, book_profile } =
      updateBookDto;

    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(` ID "${id}" not found`);
    }

    if (book.bookProfile) {
      try {
        const relativePath = book.bookProfile.replace(process.env.APP_URL, '');
        const oldImgPath = path.join(__dirname, `../../`, relativePath);

        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }
      } catch (error) {
        throw new BadRequestException(error);
      }
    }

    const currentGenres = await this.prismaService.book.findUnique({
      where: { id },
      select: {
        genres: {
          select: {
            id: true,
          },
        },
      },
    });

    return this.prismaService.book.update({
      where: { id },
      data: {
        name,
        description,
        isHot: is_hot,
        isNew: is_new,
        status,
        bookProfile: book_profile,
        genres: {
          disconnect: currentGenres.genres.map((genre) => ({
            id: genre.id,
          })),
          connect: genres.map((x) => ({
            id: x,
          })),
        },
      },
    });
  }

  async destroy(id: string) {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(` ID "${id}" not found`);
    }

    if (book.bookProfile) {
      const relativePath = book.bookProfile.replace(process.env.APP_URL, '');
      const imgPath = path.join(__dirname, `../../`, relativePath);

      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    const save = await this.prismaService.book.delete({ where: { id } });
    return {
      message: 'success',
      data: save,
    };
  }
}
