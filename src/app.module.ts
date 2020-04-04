import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigController } from './config/config.controller';
import { SourcesController } from './sources/sources.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RecordsModule } from './records/records.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    UsersModule,
    SourcesController,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING, { useNewUrlParser: true }),
    RecordsModule,
    AccountsModule,
  ],
  controllers: [AppController, ConfigController],
  providers: [AppService],
})
export class AppModule {
}
