import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CmsLoginDto, EndUserLoginDto } from './dto/auth.dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { HashingService } from '../hashing/hashing.service';
import { firebaseVerifyToken } from 'src/lib/myHelper';

@Injectable()
export class AuthenticationService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
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

    const isEqual = await this.hashingService.compare(
      password,
      cmsUser.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Credential does not match!');
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

  async enduserLogin(loginDto: EndUserLoginDto) {
    // console.log('token', loginDto.token);
    const getVerifyUser = await firebaseVerifyToken(loginDto.token);
    // console.log('verify', getVerifyUser);

    let user = await this.prismaService.user.findFirst({
      where: { firebaseId: getVerifyUser['uid'] },
    });

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          name: getVerifyUser['displayName'],
          firebaseId: getVerifyUser['uid'],
          email: getVerifyUser['email'],
          image: getVerifyUser['photoURL'],
        },
      });
      console.log('New User', user);
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      phone: user.phone,
      points: user.points,
    };
  }
}
