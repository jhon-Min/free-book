import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsUserModule } from './cms-user/cms-user.module';
import { IamModule } from './iam/iam.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { CmsUserSeeder } from './seeds/cmsuser.seeder';
import { HomeModule } from './home/home.module';

@Module({
  imports: [CmsUserModule, IamModule, GenresModule, BooksModule, HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
