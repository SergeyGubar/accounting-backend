import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../mongo/account.schema';
import { CreateAccountDto } from './dto/createAccount.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private accountModel: Model<Account>) {
  }

  async create(createAccountDto: CreateAccountDto, ownerId: string): Promise<Account> {
    const data = {
      ...createAccountDto,
      ownerId,
    };
    return this.accountModel.create(data);
  }

  async delete(id: string): Promise<Account | null> {
    return new Promise((resolve, reject) => {
      this.accountModel.findByIdAndDelete(id, (err, res) => {
        if (err || res == null) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async getAll(ownerId: string): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      console.log(ownerId)
      this.accountModel.find({ ownerId }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
