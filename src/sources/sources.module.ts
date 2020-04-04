import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';

@Module({
  providers: [SourcesService],
  exports: [SourcesService],
  controllers: [SourcesController],
})
export class SourcesModule {
}
