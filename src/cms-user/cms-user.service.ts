import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { UpdateCmsUserDto } from './dto/update-cms-user.dto';
import { PrismaService } from '../prisma.service';
import { HashingService } from '../iam/hashing/hashing.service';

@Injectable()
export class CmsUserService {
  constructor(
    private prisma: PrismaService,
    private hasingService: HashingService,
  ) {}

  async create(createCmsUserDto: CreateCmsUserDto) {
    const { name, email, role, password } = createCmsUserDto;
    try {
      const cmsUser = await this.prisma.cmsUser.findUnique({
        where: { email },
      });

      if (cmsUser) {
        throw new BadRequestException('Duplicate User Account!');
      }

      const hashPassword = await this.hasingService.hash(password);
      const save = await this.prisma.cmsUser.create({
        data: {
          name,
          email,
          role,
          password: hashPassword,
        },
      });

      return save;
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code == pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
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
