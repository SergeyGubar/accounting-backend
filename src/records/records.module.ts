import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordSchema } from './record.schema';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {
}
