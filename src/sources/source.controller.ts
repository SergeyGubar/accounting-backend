import { Controller, Get } from '@nestjs/common';
import { Source } from './dto/source';

@Controller('sources')
export class SourcesController {
  @Get()
  getSources(): Source[] {
    return [
      {
        number: '123',
        amount: 40,
        description: 'Some desc',
        historyId: 'some history id',
        id: 'uuid',
      },
      {
        number: '456',
        amount: 46,
        description: 'Some desc 2',
        historyId: 'some history id 2',
        id: 'uuid 2',
      },
    ];
  }
}
