import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Record } from './record.schema';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/createRecord.dto';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
  ) {
  }

  private readonly logger = new Logger(RecordsController.name);

  @Post()
  addRecord(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    this.logger.debug(`addRecord: dto ${JSON.stringify(createRecordDto)}`);
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  findAll(): Promise<Record[]> {
    return this.recordsService.findAll();
  }
}
