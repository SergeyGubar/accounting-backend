import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigController } from './config/config.controller';
import { SourcesController } from './sources/source.controller';

@Module({
  imports: [],
  controllers: [AppController, ConfigController, SourcesController],
  providers: [AppService],
})
export class AppModule {}
