import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CmsLoginDto } from './dto/auth.dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async cmsLogIn(cmsLoginDto: CmsLoginDto) {
    const { email, password } = cmsLoginDto;

    const cmsUser = await this.prismaService.cmsUser.findUnique({
      where: { email },
    });

    if (!cmsUser) {
      throw new UnauthorizedException('Unauthorized User');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: cmsUser.id,
        email: cmsUser.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { id: cmsUser.id, email: cmsUser.email, accessToken };
  }
}
