import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigController } from './config/config.controller';
import { CardsController } from './cards/cards.controller';

@Module({
  imports: [],
  controllers: [AppController, ConfigController, CardsController],
  providers: [AppService],
})
export class AppModule {}
