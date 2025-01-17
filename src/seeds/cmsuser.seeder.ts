import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class CmsUserSeeder {
  constructor(private readonly prismaService: PrismaService) {}

  async seed() {
    console.log('start seeding cmsuser .........');

    const cmsUsers = [
      {
        name: 'ok',
        email: 'admin@gmail.com',
        password: 'password',
        role: 'NORMAL',
      },
    ];

    for (const user of cmsUsers) {
      const passwordHash = await hash(user.password, 10); // Hash the password
      await this.prismaService.cmsUser.create({
        data: {
          email: user.email,
          name: user.name,
          password: passwordHash,
          role: user.role,
        },
      });
    }

    console.log('end seeding for cmsuser');
  }
}
