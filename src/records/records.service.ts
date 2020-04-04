import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordDto } from './dto/createRecord.dto';
import { Record } from './record.schema';

@Injectable()
export class RecordsService {
  constructor(@InjectModel('Record') private readonly recordModel: Model<Record>) {
  }

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const record: Partial<Record> = {
      accountId: createRecordDto.accountId,
      amount: createRecordDto.amount,
    };
    const createdRecord = new this.recordModel(record);
    return createdRecord.save();
  }

  async findAll(): Promise<Record[]> {
    return this.recordModel.find().exec();
  }
}
