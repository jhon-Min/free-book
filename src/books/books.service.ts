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

    const data = await this.prismaService.book.findMany({
      skip,
      take: +perPage,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prismaService.book.count();

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

  async createBook(createBookDto: CreateBookDto, image: Express.Multer.File) {
    const { name, status, is_hot, is_new, description } = createBookDto;

    const imgPath = await imageUpload(image, 'image/book-pf');

    return await this.prismaService.book.create({
      data: {
        name,
        description,
        isHot: is_hot,
        isNew: is_new,
        status,
        bookProfile: imgPath,
      },
    });
  }

  async updateBook(
    id,
    updateBookDto: CreateBookDto,
    image: Express.Multer.File,
  ) {
    const { name, status, is_hot, is_new, description } = updateBookDto;

    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(` ID "${id}" not found`);
    }

    let imgPath = book.bookProfile;
    if (image) {
      try {
        const relativePath = book.bookProfile.replace(process.env.APP_URL, '');
        const oldImgPath = path.join(__dirname, `../../`, relativePath);

        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }

        imgPath = await imageUpload(image, 'image/book-pf');
      } catch (error) {
        throw new BadRequestException(error);
      }
    }

    return this.prismaService.book.update({
      where: { id },
      data: {
        name,
        description,
        isHot: is_hot,
        isNew: is_new,
        status,
        bookProfile: imgPath,
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
