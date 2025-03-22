import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnduserService {
  constructor(private prismaService: PrismaService) {}

  async index(page: number, perPage: number, search: string) {
    const skip = (page - 1) * perPage;

    const searchFilter = search
      ? {
          email: { contains: search, mode: Prisma.QueryMode.insensitive },
        }
      : {};

    const [data, total] = await Promise.all([
      this.prismaService.user.findMany({
        skip,
        take: +perPage,
        where: searchFilter,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.user.count({ where: searchFilter }),
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

  async detail(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Book not found!');
    }

    return user;
  }
}
