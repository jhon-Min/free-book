import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsUserModule } from './cms-user/cms-user.module';
import { IamModule } from './iam/iam.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { CmsUserSeeder } from './seeds/cmsuser.seeder';
import { HomeModule } from './home/home.module';
import { FileuploadController } from './fileupload/fileupload.controller';
import { FileuploadService } from './fileupload/fileupload.service';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [CmsUserModule, IamModule, GenresModule, BooksModule, HomeModule, ChapterModule],
  controllers: [AppController, FileuploadController],
  providers: [AppService, FileuploadService],
})
export class AppModule {}
