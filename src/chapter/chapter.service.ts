import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChapterDto } from './dto/chapter.dto';
import { deleteImage, imageUpload } from 'src/lib/myHelper';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaService: PrismaService) {}

  async index(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const data = await this.prismaService.chapter.findMany({
      skip,
      take: +perPage,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prismaService.chapter.count();

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

  async detail(id: string) {
    const chapter = await this.prismaService.chapter.findUnique({
      where: { id },
    });

    if (!chapter) {
      throw new NotFoundException('Chapter not found!');
    }

    return chapter;
  }

  async chaptersWithBookId(bookId: string) {
    const chapters = await this.prismaService.chapter.findMany({
      where: { bookId: bookId },
      select: {
        id: true,
        name: true,
        isPremium: true,
        coin: true,
        no: true,
        bookId: true,
      },
      orderBy: { no: 'asc' },
    });

    if (!chapters) {
      throw new NotFoundException('Chapter not found!');
    }

    return chapters;
  }

  async create(
    createChapterDto: CreateChapterDto,
    images: Express.Multer.File[],
  ) {
    const { name, no, bookId, seasonId, isPremium, coin } = createChapterDto;

    const imageUrls = await Promise.all(
      images.map((image) => imageUpload(image, 'image/chapter')),
    );

    const changeToBool = isPremium == 'yes' ? true : false;

    // console.log(imageUrls);
    return this.prismaService.chapter.create({
      data: {
        name,
        no: +no,
        bookId,
        seasonId,
        isPremium: changeToBool,
        coin: +coin,
        images: imageUrls,
      },
    });
  }

  async update(id: string, createChapterDto: CreateChapterDto) {
    const { name, no, bookId, seasonId, isPremium, coin } = createChapterDto;
    const chapter = this.prismaService.chapter.findUnique({ where: { id } });

    if (!chapter) {
      throw new NotFoundException(` ID "${id}" not found`);
    }

    return this.prismaService.chapter.update({
      where: { id },
      data: {
        name,
        no,
        bookId,
        seasonId,
        isPremium,
        coin,
      },
    });
  }

  async destroy(id: string) {
    const chapter = await this.prismaService.chapter.findUnique({
      where: { id },
    });

    if (!chapter) {
      throw new NotFoundException(` ID "${id}" not found`);
    }

    if (chapter.images.length) {
      chapter.images.map((x) => deleteImage(x));
    }

    const save = await this.prismaService.chapter.delete({ where: { id } });
    return {
      message: 'success',
      data: save,
    };
  }
}
