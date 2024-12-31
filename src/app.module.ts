import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsUserModule } from './cms-user/cms-user.module';
import { IamModule } from './iam/iam.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [CmsUserModule, IamModule, GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
