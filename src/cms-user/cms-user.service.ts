import { Injectable } from '@nestjs/common';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { UpdateCmsUserDto } from './dto/update-cms-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CmsUserService {
  constructor(private prisma: PrismaService) {}

  create(createCmsUserDto: CreateCmsUserDto) {
    return 'This action adds a new cmsUser';
  }

  findAll() {
    return `This action returns all cmsUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cmsUser`;
  }

  update(id: number, updateCmsUserDto: UpdateCmsUserDto) {
    return `This action updates a #${id} cmsUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} cmsUser`;
  }
}
