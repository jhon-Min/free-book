import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/book.dto';
import { imageUpload } from 'src/lib/myHelper';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

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
}
