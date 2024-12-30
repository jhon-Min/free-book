import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsUserModule } from './cms-user/cms-user.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [CmsUserModule, IamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
