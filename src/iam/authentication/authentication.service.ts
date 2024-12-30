import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CmsLoginDto } from './dto/auth.dto/auth.dto';

@Injectable()
export class AuthenticationService {
  constructor(private prismaService: PrismaService) {}

  async cmsLogIn(cmsLoginDto: CmsLoginDto) {
    const { email, password } = cmsLoginDto;

    const cmsUser = await this.prismaService.cmsUser.findUnique({
      where: { email },
    });

    if (!cmsUser) {
      throw new UnauthorizedException('User Not Found!');
    }

    return cmsUser;
  }
}
