import { Controller, Get } from '@nestjs/common';
import { Config } from './dto/config';

@Controller('config')
export class ConfigController {
  @Get()
  getConfig(): Config {
    return {
      env: process.env.NODE_ENV,
      branch: 'master',
      commit: 'commit',
    };
  }
}
