import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmsUserModule } from './cms-user/cms-user.module';

@Module({
  imports: [CmsUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
